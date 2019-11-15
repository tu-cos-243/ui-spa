import Vue from "vue";
import vuetify from "./plugins/vuetify";
import VueRouter from "vue-router";

import "vuetify/dist/vuetify.min.css";

import Home from "./pages/Home.vue";
import SignIn from "./pages/SignIn.vue";
import SignUp from "./pages/SignUp.vue";
import About from "./pages/About.vue";
import Accounts from "./pages/Accounts.vue";

Vue.use(VueRouter);
const router = new VueRouter({
  mode: "history",
  routes: [
    { name: "home-page", path: "/", component: Home },
    { name: "sign-up", path: "/sign-up", component: SignUp },
    { name: "sign-in", path: "/sign-in", component: SignIn },
    { name: "about-us", path: "/about-us", component: About },
    { name: "accounts", path: "/accounts", component: Accounts }
  ]
});

import App from "./App.vue";

new Vue({
  el: "#app",

  data: {
    currentUser: null
  },

  router,
  vuetify,
  render: h => h(App)
});
