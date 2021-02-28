<template>
    <div>
        <v-list-item>
            <v-list-item-avatar>
                <v-icon><slot name="icon"> </slot></v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
                <v-list-item-title class="title">
                    <template v-if="link">
                        <router-link :to="link">
                            <slot name="title"> </slot>
                        </router-link>
                    </template>
                    <template v-else>
                        <slot name="title"> </slot>
                    </template>
                </v-list-item-title>
                <v-list-item-subtitle>
                    <slot name="subtitle"> </slot>
                </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-avatar right>
                <span class="float-right"><slot name="error"> </slot></span>
            </v-list-item-avatar>
        </v-list-item>

        <v-divider v-if="!noSeparator"> </v-divider>
    </div>
</template>

<script>
    export default {
        props: {
            noSeparator: Boolean,
            link: null
        }
    }
</script>
