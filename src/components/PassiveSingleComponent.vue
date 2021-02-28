<script>
    import Component from "./Component"

    export default {

        extends: Component,

        props: {
            id: Number
        },

        computed: {
            object () {
                if (this.linkedObject)
                    return this.linkedObject

                if(this.ready_to_load)
                    return this.model.query().withAllRecursive(this.recursionDepth).find(this.id)

                return null
            }
        },

        mounted () {
            this.initial = false
        },

    }
</script>
