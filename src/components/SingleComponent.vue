<script>
    import Component from "./Component"
    import ModelFactory from "../store/models/ModelFactory"

    export default {

        extends: Component,

        computed: {
            identity () {
                return this.identityOf(this.model.name, this.id)
            },
            object () {
                if (this.linkedObject)
                    return this.linkedObject

                if(this.ready_to_load)
                    return this.model.query().withAllRecursive(this.recursionDepth).find(this.id)

                return null
            }
        },

        methods: {
            references(model, id) {
                return this.identity === this.identityOf(model, id)
            },
            loadPage () {
                ModelFactory.fetch(this.model, this.id)
            },
            refresh () {
                ModelFactory.refresh(this.model, this.id, this.model.getRelationNames())
            },
        },

        mounted () {
            if ((this.object != null && this.object._model != null) || this.linkedObject)
                this.initialDone()

            if (!this.noInitialLoad && !this.linkedObject) {
                setTimeout(() => {
                    this.loadPage()
                }, 1) // Make sure we don't lock up main thead on load
            }
        },

        created () {
            window.vueApp.$on('ModelUpdateStarted', (model, id) => {
                if (this.object == null) return
                if (this.references(model, id)) {
                    this.loading = true
                    this.error = false
                }
            })

            window.vueApp.$on('ModelUpdateFinished', (model, id) => {
                if (this.object == null) return
                if (this.references(model, id)) {
                    this.loading = false
                    this.error = false
                }
            })

            window.vueApp.$on('ModelUpdateFailed', (model, id, error) => {
                if (this.object == null) return
                if (this.references(model, id)) {
                    this.loading = false
                    this.error = error
                }
            })

            window.vueApp.$on('ModelDeleted', (model, id, callback) => {
                if (this.object == null) return
                if (this.references(model, id)) {
                    this.$toast.info(this.model.name + ' ' + this.object.name + ' deleted')
                    callback()
                }
            })

            window.vueApp.$on('ModelLoaded', (model, id) => {
                if (this.references(model, id)) {
                    this.initialDone()
                }
            })
        },

    }
</script>
