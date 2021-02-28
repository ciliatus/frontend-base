<template>
    <v-app id="app">
        <v-app-bar app clipped-left color="primary">
            <v-app-bar-nav-icon @click="drawer = !drawer"/>
            <!--<v-img src="/img/logo.svg" max-height="30" max-width="30" contain />-->
            <span class="title ml-3 mr-5">Test</span>

            <v-spacer/>

            <v-text-field solo-inverted flat hide-details label="Search" prepend-inner-icon="mdi-magnify"/>

            <v-spacer/>

            <v-menu left bottom offset-y>
                <template v-slot:activator="{ on }">
                    <v-btn text v-on="on">
                        <template v-if="user">{{ user.name }}</template>
                        <v-icon class="ml-2">mdi-account</v-icon>
                    </v-btn>
                </template>

                <v-list>
                    <template v-if="user">
                        <v-list-item>
                            <v-list-item-action>
                                <v-icon>mdi-account</v-icon>
                            </v-list-item-action>
                            <v-list-item-title>{{ user.name }}</v-list-item-title>
                        </v-list-item>

                        <v-list-item :to="user_model.view('show', user)">
                            <v-list-item-action>
                                <v-icon>info</v-icon>
                            </v-list-item-action>
                            <v-list-item-title>Settings</v-list-item-title>
                        </v-list-item>

                        <v-list-item @click="$router.push('logout')">
                            <v-list-item-action>
                                <v-icon>info</v-icon>
                            </v-list-item-action>
                            <v-list-item-title>Logout</v-list-item-title>
                        </v-list-item>
                    </template>

                    <v-divider></v-divider>

                    <v-list-item @click="toggleNightMode">
                        <v-list-item-action>
                            <v-icon>help</v-icon>
                        </v-list-item-action>
                        <v-list-item-title>Toggle Dark Mode</v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-action>
                            <v-icon>help</v-icon>
                        </v-list-item-action>
                        <v-list-item-title>Help</v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-action>
                            <v-icon>info</v-icon>
                        </v-list-item-action>
                        <v-list-item-title>About</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-app-bar>

        <v-navigation-drawer v-model="drawer" app clipped>
            <v-list dense>
                <template v-for="(item, i) in items">
                    <v-list-item :key="i" :to="{path: item.to}">
                        <v-list-item-action>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title class="grey--text">
                                {{ item.text }}
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </template>
            </v-list>
        </v-navigation-drawer>

        <v-main>
            <loader></loader>
            <v-dialog v-model="error_dialog" width="unset">
                <v-card>
                    <v-card-title>Something went wrong</v-card-title>
                    <v-card-text>
                        <v-alert v-for="error in active_errors" :key="error" border="left" colored-border :color="error.severity">
                            {{ error.message }}
                        </v-alert>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" ext @click="error_dialog = false">
                            OK
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <v-container fluid>
                <breadcrumbs></breadcrumbs>
                <router-view></router-view>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
    import scss from "./assets/custom.scss"
    import routes from "./router/routes"
    import Breadcrumbs from "./components/misc/Breadcrumbs"
    import Loader from "./components/misc/Loader"
    import axios from "axios";
    import Link from "./util/Link";
    import router from "./router";
    import JSONBigInt from "json-bigint";
    import UserModel from "./store/models/Common/UserModel";
    import ModelFactory from "./store/models/ModelFactory";
    import models from "@/store/models";

    export default {
        props: {
            source: String,
        },

        components: {
            Breadcrumbs, Loader
        },

        data() {
            return {
                error_dialog: false,
                active_errors: [],
                route: {
                    prev: null
                },
                user_model: UserModel,
                user_id: null,
                drawer: null,
                items: routes.filter(item => item.menu)
                    .map((r) => {
                        return {to: r.path, icon: r.icon, text: r.meta.title}
                    }),
                echo: null
            }
        },

        computed: {
            user() {
                return UserModel.getQueryWithAllRelations().find(this.user_id)
            }
        },

        methods: {
            toggleNightMode() {
                this.$vuetify.theme.dark = !this.$vuetify.theme.dark
            },
            goPrev(fallback = '/') {
                if (this.route.prev) this.$router.push(this.route.prev)
                this.$router.push(fallback)
            },
            async checkAuth() {
                axios.get(Link.api('auth/check'), {
                    transformResponse: [data => data]
                }).then((response) => {
                    this.user_id = JSONBigInt.parse(response.data).data.id
                    ModelFactory.fetch(UserModel, this.user_id)
                }, (error) => {
                    if (!error.response) return
                    if (error.response.status === 401 && router.currentRoute.name !== 'login') {
                        router.push('/web/login')
                    }
                })
            }
        },

        created() {
            this.checkAuth()
            this.echo = window.echo

            this.$router.beforeEach((to, from, next) => {
                //this.checkAuth()
                this.route.prev = from

                ModelFactory.disableAllListeners()

                next()
            })

            this.$root.$on('ErrorsFlashed', (errors, popup = true) => {
                this.active_errors = errors
                this.error_dialog = popup
            })

            this.$root.$on('BackendModelUpdateRequested', (model, id) => {
                ModelFactory.fetch(models[model + 'Model'], id)
            })

            this.echo.private('frontend-update-requests').listen('.Common.FrontendModelUpdateRequest', (e) => {
                ModelFactory.refreshFromListener(models[e.model_name + 'Model'], e.id)
            })
        }

    }
</script>
