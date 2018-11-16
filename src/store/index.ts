import Vue from "vue";
import Vuex from "vuex";
import { firebaseMutations } from "vuexfire";

import thread from "./modules/thread";
import category from "./modules/category";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  strict: debug,
  modules: {
    thread,
    category
  },
  mutations: firebaseMutations
});
