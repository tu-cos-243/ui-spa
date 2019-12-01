import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentAccount: null
  },
  getters: {
    isLoggedIn(state) {
      return state.currentAccount !== null;
    }
  },
  mutations: {
    logIn(state, account) {
      state.currentAccount = account;
    },
    logOut(state) {
      state.currentAccount = null;
    }
  }
});
