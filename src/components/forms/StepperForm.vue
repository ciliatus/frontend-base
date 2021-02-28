<script>

    import Form from "./Form";

    export default {

        extends: Form,

        data () {
            return {
                stepper: 1,
                steps: null,
                event: {
                    submit: this.onStepperSubmit
                }
            }
        },

        methods: {
            async onStepperSubmit () {
                let valid = this.stepper != null ? true : await this.$refs[this.validation._ref].validate()
                if (!valid) return

                await this.onSubmit();
            },
            onGoBack () {
                this.stepper--
            },
            onSkipToEnd () {
                this.stepper = this.steps
            },
            async onSubmitStep (ref) {
                if (await ref.validate()) this.stepper++
            }
        }

    }

</script>
