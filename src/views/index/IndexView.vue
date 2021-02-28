<script>
    import View from "../View"

    export default {
        extends: View,

        mounted () {
            this.$root.$emit('ResetLoading', 1)
            this.setTitle(this.$route.meta.title)
        }

    }
</script>
