<script>

    import Form from "./Form";
    import ModelFactory from "../../store/models/ModelFactory";

    export default {

        extends: Form,

        props: {
            id: Number
        },

        data () {
            return {
                submit: {
                    method: 'put'
                },
                model: null
            }
        },

        computed: {
            object () {
                return this.model.getQueryWithAllRelations().find(this.id)
            }
        },

        mounted () {
            ModelFactory.fetch(this.model, this.id)
        }

    }

</script>