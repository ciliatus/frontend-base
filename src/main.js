import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import vuetify from "./plugins/vuetify"
import {VueMasonryPlugin} from 'vue-masonry'
import Masonry from "./components/misc/Masonry"
import MasonryTile from "./components/misc/MasonryTile"
import axios from "axios"
import '@mdi/font/css/materialdesignicons.css'
import 'typeface-roboto/index.css'

Vue.use(VueMasonryPlugin)

Vue.component('v-masonry', Masonry)
Vue.component('v-masonry-tile', MasonryTile)

Vue.config.productionTip = false

axios.defaults.withCredentials = true
axios.defaults.headers.common = {
    "Accept": "application/json",
    "X-Requested-With": "XMLHttpRequest"
}

import proto from "@/util/proto";
import Echo from "laravel-echo";
import config from "./config";
proto.load()

window.Pusher = require('pusher-js');
window.echo = new Echo({
    broadcaster: 'pusher',
    key: config.pusherKey,
    cluster: 'mt1',
    wsHost: window.location.hostname,
    wsPort: 6001,
    enabledTransports: ['ws', 'wss'],
    forceTLS: false,
    authorizer: (channel, options) => {
        return {
            authorize: (socketId, callback) => {
                axios.post('/api/v1/common/broadcast/authenticate', {
                    socket_id: socketId,
                    channel_name: channel.name
                })
                    .then(response => {
                        callback(false, response.data);
                    })
                    .catch(error => {
                        callback(true, error);
                    });
            }
        };
    },
});

window.vueApp = new Vue({
    router,
    store,
    vuetify,
    iconfont: 'mdi',
    render: h => h(App)
}).$mount('#app')