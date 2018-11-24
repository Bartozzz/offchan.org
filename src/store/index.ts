import Vue from "vue";
import Vuex from "vuex";
import { State } from "./types";
import { getInitialState } from "./getInitialState";
import { threadMutations } from "./threads/mutations";
import { threadActions } from "./threads/actions";
import { commentsMutations } from './comments/mutations';
import { commentsActions } from './comments/actions';

Vue.use(Vuex);

export default new Vuex.Store<State>({
  state: getInitialState(),
  mutations: {
    ...threadMutations,
    ...commentsMutations,
    unsubscribe(state, newUnsubscribe) {
      if (state.unsubscribe) {
        state.unsubscribe();
      }
      state.unsubscribe = newUnsubscribe;
    }
  },
  actions: {
    ...threadActions,
    ...commentsActions
  }
});
