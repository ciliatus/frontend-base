import axios from "axios"
import JSONBigInt from "json-bigint"
import models from "../models"
import config from "../../config";

export default class ModelFactory {

    static getRelationUrlArtifact (model, relations = null) {
        let url = ''

        if (relations) {
            relations.forEach((r) => url += '&with[]=' + r)
        } else {
            model.getRelationNames().forEach((relation) => {
                url += '&with[]=' + relation
            })
        }

        return url
    }

    static getFilterUrlArtifact (filter) {
        let url = ''
        Object.keys(filter).forEach((key) => {
            url += '&filter[' + key + ']='
            if (!filter[key].exact) url += 'like:*'
            url += filter[key].value
            if (!filter[key].exact) url += '*'
        })

        return url
    }

    static getWhereInUrlArtifact (field, ids) {
        let filter = '';
        if (!Array.isArray(ids)) ids = [ids]
        ids.forEach((id) => filter += '&filter[' + field + ']=' + id)

        return filter
    }

    static getOrderUrlArtifact (sort_by, sort_direction) {
        return '&order[' + sort_by + ']=' + sort_direction
    }

    static getDebugUrlArtifact () {
        if (config.api.xDebug) return '&XDEBUG_SESSION_START=PHPSTORM'
        return ''
    }

    static getFetchUrl (model, id) {
        return model.endpoint('fetch') + '/' + id + '?relations=separate'
            + this.getDebugUrlArtifact()
            + this.getRelationUrlArtifact(model)
    }

    static getFetchMultipleUrl (model, ids) {
        return model.endpoint('fetch') + '?relations=separate'
            + this.getWhereInUrlArtifact('id', ids)
            + this.getDebugUrlArtifact()
            + this.getRelationUrlArtifact(model)
    }

    static getPaginatedFetchUrl (model, pagination, relations = null) {
        let url = model.endpoint('fetch') + '?relations=separate'
            + this.getDebugUrlArtifact()
            + '&page=' + pagination.current_page
            + '&per_page=' + pagination.per_page

        if (pagination.filter) url += this.getFilterUrlArtifact(pagination.filter)
        if (pagination.sort_by) url += this.getOrderUrlArtifact(pagination.sort_by, pagination.sort_direction)
        url += this.getRelationUrlArtifact(model, relations)

        return url
    }

    static fetchIfNecessary (model, id, callback = null, error_callback = null) {
        if (model.find(id) == null) {
            this.fetch(model, id, callback, error_callback)
        }
    }

    static fetch (model, id, callback = null, error_callback = null) {
        axios.get(this.getFetchUrl(model, id), {
            transformResponse: [data => data]
        }).then((response) => {
            this.ingestApiResponse(JSONBigInt.parse(response.data), model, callback)
        }, (error) => {
            if (error_callback) error_callback(error)
            window.console.log(error)
        })
    }

    static fetchMultiple (model, ids, callback = null, error_callback = null) {
        axios.get(this.getFetchMultipleUrl(model, ids), {
            transformResponse: [data => data]
        }).then((response) => {
            this.ingestApiResponse(JSONBigInt.parse(response.data), model, callback)
        }, (error) => {
            if (error_callback) error_callback(error)
            window.console.log(error)
        })
    }

    static fetchWithPagination (model, pagination, callback = null, error_callback = null, relations = null) {
        axios.get(this.getPaginatedFetchUrl(model, pagination, relations), {
                transformResponse: [data => data]
            }).then((response) => {
                this.ingestApiResponse(JSONBigInt.parse(response.data), model, callback)
            }, (error) => {
                if (error_callback) error_callback(error)
                window.console.log(error)
            })
    }

    static ingestApiResponse (response, requested_model, callback = null) {
        let ids = [], model_name = ''
        response.data.forEach((model) => {
            model_name = model._model + 'Model'
            models[model_name].insert({ data: [model] })
            models[model_name].announce(model.id)
            if (model._model === requested_model.name) {
                ids.push(model.id)
                models[model_name].enableListener(model.id)
            }
        })

        if (callback) callback(response, ids)
    }

    static refresh (model, id, relations, recursive = false) {
        if (model.find(id) == null) return

        model.fetchById(id)

        if (relations != null && recursive) {
            let m = model.find(id)
            if (m != null) {
                if (!Array.isArray(relations)) relations = [relations]

                let query = model.query()
                relations.forEach((r) => {
                    query = query.with(r)
                })
                let object = query.find(id)

                relations.forEach((r) => {
                    if (object[r] != null) {
                        if (Array.isArray(object[r])) {
                            object[r].forEach((ro) => {
                                this.refresh(models[ro._model + 'Model'], ro.id)
                            })
                        }
                        else {
                            this.refresh(models[object[r]._model + 'Model'], object[r].id)
                        }
                    }
                })
            }
        }
    }

    static refreshFromListener (model, id) {
        if (model.find(id) && model.find(id)._listen) {
            this.refresh(model, id)
        }
    }


    static disableAllListeners() {
        Object.keys(models).forEach((name) => {
            models[name].query().where('_listen', true).get().forEach((model) => {
                models[name].disableListener(model.id)
            })
        })
    }

}
