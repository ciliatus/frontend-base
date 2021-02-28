<template>
</template>

<script>
    import Link from "../util/Link";

    export default {
        props: {
            id: Number,
            noInitialLoad: Boolean,
            noActions: Boolean,
            linkedObject: Object|Array,
            onInitialLoadDone: Function
        },

        data () {
            return {
                component_id: null,
                initial: true,
                loading: false,
                error: false,
                model: null,
                relations: null,
                recursionDepth: 3,
                ready_to_load: false
            }
        },

        methods: {
            identityOf (model, id) {
                return model + '/' + id
            },

            loadingError (error) {
                if (error.response && error.response.status) {
                    this.error = "Could not retrieve data from server (" + error.response.status + ")"
                } else {
                    this.error = error
                }

                this.$toast.error("Loading failed: " + error)

                this.initialFailed()
                this.loading = false
            },

            clearLoadingError () {
                this.error = false
            },

            initialDone () {
                this.initial = false
                if (this.onInitialLoadDone) this.onInitialLoadDone()
            },

            initialFailed () {
                this.initial = false
                if (this.onInitialLoadDone) this.onInitialLoadDone()
            },

            link (...args) {
                return Link.link(...args)
            }
        },

        created () {
            this.component_id = 'c-' + Math.random().toString(36).substring(7);
        },

        mounted () {
            setTimeout(() => {
                this.ready_to_load = true
                if (this.linkedObject) this.initialDone()
            }, 1) // Make sure we don't lock up main thead on load
        },
    }
</script>
