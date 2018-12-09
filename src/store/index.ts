import Vue from "vue";
import Vuex from "vuex";
import { State, getInitialState } from "@/store/getInitialState";
import { commentMutations, commentActions } from "@/store/comments";
import { threadMutations, threadActions } from "@/store/threads";

Vue.use(Vuex);

export default new Vuex.Store<State>({
  state: getInitialState(),

  mutations: {
    ...threadMutations,
    ...commentMutations
  },

  actions: {
    ...threadActions,
    ...commentActions
  }
});
