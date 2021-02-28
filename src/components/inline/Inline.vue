<template>
    <span>
        <v-btn outlined text small :href="model.entity + '/' + object.id" class="mr-1 mt-1">
            <v-icon left>{{ object._icon }}</v-icon>
            {{ object.name }}
        </v-btn>
    </span>
</template>

<script>
    import Component from "../Component"
    import ModelFactory from "../../store/models/ModelFactory"

    export default {
        extends: Component,

        data () {
            return {
                model: null //defined on children
            }
        },

        computed: {
            object () {
                return this.model.find(this.id)
            }
        },

        methods: {
            refresh () {
                ModelFactory.refresh(this.model, this.object.id)
            }
        }
    }
</script>
