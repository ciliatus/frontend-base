<template>
    <div>
        <v-progress-linear indeterminate v-if="loading" :height="height"> </v-progress-linear>
        <div v-else :style="'height:' + height + 'px'"> </div>
    </div>
</template>

<script>
    export default {

        data () {
            return {
                height: 5,
                loading: 0
            }
        },

        computed: {
            dialog () {
                return this.loading > 0
            }
        },

        mounted () {
            this.$root.$on('ResetLoading', (count = 0) => {
                this.loading = count;
            })

            this.$root.$on('LoadingStarted', () => {
                this.loading++;
            })

            this.$root.$on('LoadingEnded', () => {
                this.loading--;
            })
        }

    }
</script>
