<script>

    import axios from "axios";
    import JSONBigInt from "json-bigint";
    import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from "vee-validate"
    import { required, min, email } from 'vee-validate/dist/rules'
    import config from "../../config"
    import ErrorParser from "../../util/ErrorParser"
    import Link from "../../util/Link";

    setInteractionMode('eager')

    extend('required', {...required})
    extend('min', {...min})
    extend('email', {...email})

    export default {

        components: {
            ValidationProvider,
            ValidationObserver
        },

        data () {
            return {
                component_id: '',
                redirect: {
                    success: null,
                    error: null
                },
                submit: {
                    entity: null,
                    action: null,
                    url_override: null
                },
                event: {
                    submit: this.onSubmit,
                    error: this.onError
                },
                validation: {
                    ref: '_form'
                },
                package: 'core',
                valid: false,
                form: {}
            }
        },

        computed: {
            url () {
                return this.submit.url_override ? this.submit.url_override : config.api.basePath + config.api.prefix + this.package + '/' + this.submit.entity
            }
        },

        methods: {
            async onSubmit () {
                axios[this.submit.action](this.url, this.form, {
                    transformResponse: [data => data]
                }).then((response) => {
                    if (this.redirect.success != null) {
                        if (typeof this.redirect.success === "function") this.redirect.success()
                        else window.location.href = this.redirect.success
                    }

                    let resp = JSONBigInt.parse(response.data)
                    if (resp.data.length > 0) {
                        window.location.href = Link.link(resp.data[0]._entity + '/' + resp.data[0].id)
                    }
                }).catch((error) => {
                    this.event.error(ErrorParser.parse(error))
                })
            },

            onError (errors) {
                if (this.redirect.error != null) {
                    if (typeof this.redirect.error === "function") this.redirect.error()
                    else window.location.href = this.redirect.error
                }

                this.$root.$emit('ErrorsFlashed', errors)
            }
        },

        created () {
            this.component_id = 'c-' + Math.random().toString(36).substring(7);
        },

    }

</script>
