<script>
    import View from "../View"

    export default {
        extends: View,

        data () {
            return {
                id: null
            }
        },

        watch: {
            object (value) {
                this.setTitle("Delete " + this.object.name)
            }
        },

        mounted () {
            this.setTitle('Delete')
        },

        created () {
            this.id = parseInt(this.$route.params.id)
        }

    }
</script>
