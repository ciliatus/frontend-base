<script>
    import View from "../View"

    export default {
        extends: View,

        data () {
            return {
                id: null
            }
        },

        computed: {
            object () {
                return null //Implemented on children
            }
        },

        watch: {
            object (value) {
                this.setTitle(this.object.name)
            }
        },

        mounted () {
            if (this.object) this.setTitle(this.object.name)
            else this.setTitle('...')
        },

        created () {
            this.id = parseInt(this.$route.params.id)
        }

    }
</script>
