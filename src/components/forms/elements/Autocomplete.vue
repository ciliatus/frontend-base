<script>

    import PaginatedComponent from "../../PaginatedComponent";

    export default {

        extends: PaginatedComponent,

        props: {
            storeModel: Object|Function
        },

        data () {
            return {
                search_model: null,
                search_str: null,
                search_filter: '',
                search_field: 'name'
            }
        },

        computed: {
            items () {
                if (!this.objects) return []
                return this.objects//.map((o) => { return o[this.search_field] })
            }
        },

        watch: {
            search_str (val) {
                this.updateFilter(val)
                //this.loadPage()
            },
            search_model () {
                this.$emit('input', this.search_model)
            }
        },

        methods: {
            updateFilter (val) {
                this.pagination.filter = this.filter ? this.filter : {}
                this.pagination.filter[this.search_field] = 'like:*' + val + '*'
            }
        },

        created () {
            this.model = this.storeModel
            this.pagination.per_page = 15

            if (this.default) {
                this.pagination.filter.id = Array.isArray(this.default) ? 'in:' + this.default.join(',') : this.default
            }

            this.pushUpdateCallback(() => {
                if (this.default && this.initial) {
                    delete this.pagination.filter.id
                    this.loadPage()
                }

                this.addCurrentPageItemIds(this.search_model)
            })
        }

    }

</script>
