<template>
    <v-tooltip top>
        <template v-slot:activator="{ on }">
            <v-icon v-on="on" small color="red" class="inline pulse pulse-round pulse-red ml-1 mr-1">mdi-alert-circle-outline</v-icon>
        </template>
        <span>{{ error }}</span>
    </v-tooltip>
</template>

<script>
    export default {
        props: {
            error: String|Boolean,
            xSmall: Boolean
        }
    }
</script>
