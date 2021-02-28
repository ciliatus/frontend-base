<template>
    <v-card>
        <v-card-title v-if="title">{{ title }}</v-card-title>
        <v-card-subtitle v-if="subtitle">{{ subtitle }}</v-card-subtitle>
        <v-card-text v-if="text">{{ text }}</v-card-text>
    </v-card>
</template>

<script>

    export default {

        props: {
            title: String,
            subtitle: String,
            text: String
        }

    }

</script>
