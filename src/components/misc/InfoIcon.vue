<template>
    <v-tooltip top>
        <template v-slot:activator="{ on }">
            <v-icon v-on="on" small :class="iconClasses">{{ icon }}</v-icon>
        </template>
        <span>{{ tooltip }}</span>
    </v-tooltip>
</template>

<script>
    export default {
        props: {
            icon: String,
            color: String,
            classes: Array,
            tooltip: String|Boolean,
            xSmall: Boolean
        },

        computed: {
            iconClasses () {
                let c = ['inline'].concat(this.classes)
                if (this.color) c.push(this.color + '--text')

                return c
            }
        }
    }
</script>
