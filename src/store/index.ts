import Vue from "vue";
import Vuex from "vuex";

import initialState from "./initialState";
import { State } from "./types";

Vue.use(Vuex);

export default new Vuex.Store<State>({
  state: initialState,
  getters: {},
  mutations: {},
  actions: {}
});
