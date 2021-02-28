<template>
    <v-row justify="center">
        <v-alert v-if="login_failed">Login failed</v-alert>
        <v-dialog v-model="dialog" persistent max-width="600px" overlay-opacity="1" overlay-color="#e65100">
            <v-card>
                <v-form v-model="valid" @submit.prevent="event.submit">
                    <v-card-text>
                        <div class="title text-center text-uppercase pa-5">Sign in</div>
                    </v-card-text>
                    <v-card-text v-show="login_failed">
                        <v-container>
                            <v-alert outlined type="error">Login failed.</v-alert>
                        </v-container>
                    </v-card-text>
                    <v-card-text>
                        <v-container>
                            <ValidationObserver :ref="validation._ref" v-slot="{ validate, reset }">
                                <v-row>
                                    <v-col cols="12" sm="12">
                                        <ValidationProvider v-slot="{ errors }" name="E-Mail" :rules="validation.email">
                                            <v-text-field v-model="form.email" label="E-Mail" :error-messages="errors"> </v-text-field>
                                        </ValidationProvider>
                                    </v-col>
                                </v-row>

                                <v-row>
                                    <v-col cols="12" sm="12">
                                        <ValidationProvider v-slot="{ errors }" name="Password" :rules="validation.password">
                                            <v-text-field v-model="form.password" label="Password" type="password" :error-messages="errors"> </v-text-field>
                                        </ValidationProvider>
                                    </v-col>
                                </v-row>
                            </ValidationObserver>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" type="submit">Login</v-btn>
                    </v-card-actions>
                </v-form>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
    import Form from "../../components/forms/Form";
    import FormActionEnum from "../../components/forms/FormActionEnum";
    import axios from "axios";
    import Link from "@/util/Link";
    import ErrorParser from "@/util/ErrorParser";

    export default {

        extends: Form,

        data () {
            return {
                login_failed: false,
                dialog: false,
                redirect: {
                    success: () => this.$router.back()
                },
                submit: {
                    action: FormActionEnum.AUTH,
                    url_override: Link.base('login')
                },
                event: {
                    submit: () => {
                        axios.get(Link.base('sanctum/csrf-cookie')).then(() => {
                            axios.post(Link.base('login'), this.form).then(() => {
                                this.redirect.success()
                            }).catch((error) => {
                                this.event.error(ErrorParser.parse(error))
                            })
                        })
                    }
                },
                form: {
                    email: null,
                    password: null,
                },
                validation: {
                    _ref: 'login-observer',
                    email: 'required|email',
                    password: 'required'
                }
            }
        },

        mounted () {
            this.dialog = true
        },

        methods: {
            onError (e) {
                this.login_failed = true
            },

            onSuccess () {
                this.login_failed = false
                parent.onSubmit()
            }
        }

    }
</script>
