<template>
    <div>
        <v-breadcrumbs :items="breadcrumbs" large>
            <template v-slot:item="{ item }">
                <v-breadcrumbs-item :to="item.to" :exact="true" :disabled="item.disabled" :ripple="true">{{ item.text }}</v-breadcrumbs-item>
            </template>
        </v-breadcrumbs>
    </div>
</template>

<script>
    import routes from "../../router/routes"

    export default {

        data () {
            return {
                breadcrumbs: []
            }
        },

        methods: {
            recomputeBreadcrumbs() {
                if (!this.$route || !this.$route.meta || !this.$route.meta.breadcrumbs) return []

                let items = [{
                    text: 'App',
                    disabled: true
                }]

                this.$route.meta.breadcrumbs.forEach((breadcrumb) => {
                    let route = routes.filter((route) => route.name === breadcrumb)
                    if (route.length < 1) return

                    let path = route[0].path
                    let match = path.matchAll(/:([^\/]+)/g)
                    let m = ''
                    while ((m = match.next().value) != null) {
                        path = path.replace(m[0], this.$route.params[m[1]])
                    }

                    let title = route[0].meta.title
                    if (title === null) {
                        let model = route[0].model.find(this.$route.params.id)
                        title = model ? model.name : '...'
                    }

                    items.push({
                        text: title,
                        disabled: false,
                        to: path
                    })
                })

                if (this.$route.meta.current_title) {
                    items.push({
                        text: this.$route.meta.current_title,
                        disabled: true
                    })
                }

                this.breadcrumbs = items
            }
        },

        mounted () {
            this.recomputeBreadcrumbs()

            this.$root.$on('RecomputeBreadcrumbs', () => {
                this.recomputeBreadcrumbs()
            })
        }

    }
</script>
