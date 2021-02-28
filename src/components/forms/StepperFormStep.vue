<template>
    <v-stepper-content :step="step">
        <ValidationObserver :ref="ref" v-slot="{ validate, reset }">
            <v-card class="mb-12" flat>
                <v-card-text>
                    <slot> </slot>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" class="ml-2" type="submit" @click.prevent="onSubmitStep($refs[ref])">Continue</v-btn>
                    <v-btn v-if="onGoBack" class="ml-2" @click="onGoBack">Back</v-btn>
                    <v-btn v-if="onSkipToEnd" class="ml-2" @click="onSkipToEnd">Skip to end</v-btn>
                </v-card-actions>
            </v-card>
        </ValidationObserver>
    </v-stepper-content>
</template>

<script>

    import {ValidationObserver} from "vee-validate";

    export default {

        components: {
            ValidationObserver
        },

        props: {
            step: Number,
            observerRef: { default: 'observer-step', type: String },
            onSubmitStep: Function,
            onSkipToEnd: Function,
            onGoBack: Function
        },

        computed: {
            ref () {
                return this.observerRef + '-' + this.step
            }
        }

    }

</script>
