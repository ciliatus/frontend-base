<template>
    <v-menu>
        <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
        </template>

        <v-list>
            <v-list-item dense @click="$router.push(model.view('show', object))" v-if="show">
                <v-list-item-icon>
                    <v-icon small>mdi-eye</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title>Show</v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-list-item dense @click="$router.push(model.view('edit', object))" v-if="edit">
                <v-list-item-icon>
                    <v-icon small>mdi-pencil</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title>Edit</v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-list-item dense @click="$router.push(model.view('del', object))" v-if="del">
                <v-list-item-icon>
                    <v-icon small>mdi-delete</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title>Delete</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-menu>
</template>

<script>

    export default {

        props: {
            model: Function,
            object: Object,
            show: Boolean,
            edit: Boolean,
            del: Boolean
        }

    }

</script>
