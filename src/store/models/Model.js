import { Model as VuexModel } from '@vuex-orm/core'
import config from "../../config"
import ModelFactory from "@/store/models/ModelFactory";

export default class Model extends VuexModel {
    static baseUrl = config.api.basePath + config.api.prefix
    static webBaseUrl = config.web.basePath + config.web.prefix
    static icon = 'mdi-help'
    static menu = false

    static apiConfig = {
        actions: {
            fetch: {
                method: 'get',
                url: Model.baseUrl
            }
        }
    }

    static webConfig = {
        actions: {
            index: '/' + config.web.prefix + '%s',
            create: '/' + config.web.prefix + '%s/create',
            show: '/' + config.web.prefix + '%s/%s',
            edit: '/' + config.web.prefix + '%s/%s/edit',
            del: '/' + config.web.prefix + '%s/%s/delete',
        }
    }

    static axiosConfig = {
        dataKey: 'data'
    }

    static fields () {
        return {
            id: this.attr(null),
            timestamps: this.attr({}),
            _fk: this.attr(''),
            _model: this.attr(''),
            _autorefresh: this.attr(false),
            _listen: this.attr(false),
            _icon: this.attr(''),
            _self: this.attr(''),
            _relations: this.attr({})
        }
    }

    static getRelationNames () {
        return []
    }

    static getQueryWithAllRelations () {
        let query = this.query()
        this.getRelationNames().forEach((relation) => { query = query.with(relation); })

        return query
    }

    static fetchById (id) {
        window.vueApp.$emit('ModelUpdateStarted', this.name, id)
        return this.api().get(Model.baseUrl + this.package + '/' + this.entity + '/' + id, this.axiosConfig).then(() => {
            window.vueApp.$emit('ModelUpdateFinished', this.name, id)
        }).catch((error) => {
            window.vueApp.$emit('ModelUpdateFailed', this.name, id, error)
            if (error.response && error.response.status === 404) {
                window.vueApp.$emit('ModelDeleted', this.name, id, () => { this.delete(id) })
            }
        })
    }

    static announce (id) {
        window.vueApp.$emit('ModelLoaded', this.name, id)
    }

    static enableListener (id) {
        this.update({
            where: id,
            data: {
                _listen: true
            }
        })
    }

    static disableListener (id) {
        this.update({
            where: id,
            data: {
                _listen: false
            }
        })
    }

    static endpoint(operation = 'fetch') {
        return Model.apiConfig.actions[operation].url + this.package + '/' + this.entity
    }

    static view(operation = 'index', entity = null) {
        if (entity == null) return String(Model.webConfig.actions[operation]).sprintf(this.entity)
        return String(Model.webConfig.actions[operation]).sprintf(this.entity, entity.id)
    }

}

