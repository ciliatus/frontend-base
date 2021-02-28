<template>

</template>

<script>
    import Model from "../store/models/Model"

    export default {

        data () {
            return {
                model: Model,
                loading: false,
                error: false
            }
        },

        methods: {
            setTitle (title) {
                this.$route.meta.current_title = title
                this.$root.$emit('RecomputeBreadcrumbs')
            },

            onInitialDone () {
                this.$root.$emit('ResetLoading', 0)
            }
        },

        mounted () {
            this.$root.$emit('ResetLoading')
            this.$root.$emit('RecomputeBreadcrumbs')
        }

    }
</script>
