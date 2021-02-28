<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="290">
            <v-card>
                <v-card-title class="headline">Could not submit form</v-card-title>
                <v-card-text>
                    <v-alert v-for="error in errors" dense type="error">
                        {{ error }}
                    </v-alert>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" text @click="dialog = false">OK</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
    export default {

        props: {
            errors: Array
        },

        data () {
            return {
                dialog: false,
            }
        },
    }
</script>