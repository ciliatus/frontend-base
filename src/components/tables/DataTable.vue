<script>
    import PaginatedComponent from "../PaginatedComponent";

    export default {

        extends: PaginatedComponent,

        props: {
            hideColumns: Boolean
        },

        data () {
            return {
                headers_default: {}
            }
        },

        computed: {
            headers () {
                if (!this.hideColumns) return this.headers_default
                return this.headers_default.filter((header) => this.hideColumns.indexOf(header.value) === -1)
            }
        }

    }
</script>