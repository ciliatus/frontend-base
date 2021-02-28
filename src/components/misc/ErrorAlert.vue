<template>
    <v-alert outlined type="error">
        {{ error }}
    </v-alert>
</template>

<script>
    export default {
        props: {
            error: String|Boolean
        }
    }
</script>
