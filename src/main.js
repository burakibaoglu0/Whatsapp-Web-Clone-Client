import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import io from "socket.io-client";
import vuetify from "./plugins/vuetify";
import "@babel/polyfill";
/* eslint-disable */

Vue.config.productionTip = false;

const socket = io("http://localhost:8081");

Vue.prototype.$socket = socket;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
