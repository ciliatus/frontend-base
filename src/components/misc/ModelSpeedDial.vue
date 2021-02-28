<template>
    <v-speed-dial v-model="fab" bottom right fixed
                  direction="top" transition="slide-y-reverse-transition">
        <template v-slot:activator>
            <v-btn v-model="fab" fab :color="fab ? 'normal' : 'primary'">
                <v-icon v-if="fab">mdi-close</v-icon>
                <v-icon v-else>mdi-cog</v-icon>
            </v-btn>
        </template>
        <v-btn v-if="object && del" fab small color="error" :to="model.view('del', object)">
            <v-icon>mdi-delete</v-icon>
        </v-btn>
        <v-btn v-if="object && edit" fab small color="warning" :to="model.view('edit', object)">
            <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn v-if="create" fab small color="success" :to="model.view('create')">
            <v-icon>mdi-plus</v-icon>
        </v-btn>
    </v-speed-dial>
</template>

<script>
    export default {

        props: {
            create: Boolean,
            edit: Boolean,
            del: Boolean,
            model: Function,
            object: Object,
            id: Number
        },

        data () {
            return {
                fab: false
            }
        }

    }
</script>
