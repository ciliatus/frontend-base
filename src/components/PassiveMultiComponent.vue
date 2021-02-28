<script>
    import Component from "./Component"

    export default {

        extends: Component,

        props: {
            ids: Array
        },

        computed: {
            objects () {
                if (this.linkedObject)
                    return this.linkedObject

                if(this.ready_to_load)
                    return this.model.query().withAllRecursive(this.recursionDepth).whereIdIn(this.ids).get()

                return null
            }
        },

        mounted () {
            this.initial = false
        },

    }
</script>
