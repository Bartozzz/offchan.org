import Vue from "vue";
import Vuex from "vuex";
import { State, getInitialState } from "./getInitialState";
import { commentMutations, commentActions } from "./comments";
import { threadMutations, threadActions } from "./threads";

Vue.use(Vuex);

export default new Vuex.Store<State>({
  state: getInitialState(),

  mutations: {
    ...threadMutations,
    ...commentMutations,

    unsubscribe(state, newUnsubscribe) {
      if (state.unsubscribe) {
        state.unsubscribe();
      }

      state.unsubscribe = newUnsubscribe;
    }
  },

  actions: {
    ...threadActions,
    ...commentActions
  }
});
