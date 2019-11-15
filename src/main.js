import Vue from "vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import App from "./App.vue";

import "vuetify/dist/vuetify.min.css";

new Vue({
  el: "#app",

  data: {
    currentUser: null
  },

  router,
  vuetify,
  render: h => h(App)
});
