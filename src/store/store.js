// Guide: https://jasonwatmore.com/post/2018/07/14/vue-vuex-user-registration-and-login-tutorial-example
// Documentation: https://vuex.vuejs.org/guide/modules.html
import Vue from "vue";
import Vuex from "vuex";

import state from "./state";
import { mutations } from "./mutations";
import { actions } from "./actions";
import { getters } from "./getters";

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions
});
