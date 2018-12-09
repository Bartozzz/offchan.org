import { ActionTree } from "vuex";
import { State } from "@/store/getInitialState";
import { Board } from "@/api/types";
import { counters } from "@/api/firebase";
import {
  ThreadsCounter,
  COUNTER_THREADS
} from "@/api/firebase/document/counter";

const actions: ActionTree<State, {}> = {
  /**
   * Subscribes to threads counter and fetches data in real-time.
   */
  fetchThreadsCounter({ commit, state }) {
    console.debug(`[Vuex] Subscribing to threads counter`);

    // NOTE: no need to unsubscribe from this counter:
    counters.fetch<ThreadsCounter>(COUNTER_THREADS, data => {
      console.debug(`[Vuex] Threads counter updated`);
      commit("setThreadsCounter", { data });
    });
  },

  markAsReaded({ commit, state }, payload: { board: Board }) {
    // …
  }
};

export default actions;
