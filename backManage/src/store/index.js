import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      displayName: ""
    }
  },
  mutations: {
    isLogin(state, { username }) {
      state.user.displayName = username;
    }
  },
  modules: {}
});
