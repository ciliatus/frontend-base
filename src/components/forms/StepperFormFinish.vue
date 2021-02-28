<template>
    <v-stepper-content :step="step">
        <v-card class="mb-12" outlined>
            <v-card-text>
                <slot> </slot>
            </v-card-text>
        </v-card>
        <v-btn color="primary" class="ma-1" type="submit">Save</v-btn>
        <v-btn v-if="onGoBack" class="ma-1" @click="onGoBack">Back</v-btn>
    </v-stepper-content>
</template>

<script>

    export default {

        props: {
            step: Number,
            onGoBack: Function
        }

    }

</script>
