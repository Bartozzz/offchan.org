import Vue from "vue";
import Vuex from "vuex";

import initialState from "./initialState";
import { State } from "./types";

Vue.use(Vuex);

export default new Vuex.Store<State>({
  state: initialState,
  getters: {
    categories(state) {
      return Object.entries(state.boards).map(
        ([board, { name, description }]) => ({ board, name, description })
      )
    }
  },
  mutations: {},
  actions: {}
});
