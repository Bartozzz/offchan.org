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
      console.debug(`[Vuex] Threads counter updated`, data);
      commit("setThreadsCounter", data);
    });
  },

  /**
   * Marks the entire board as seen.
   */
  markBoardAsSeen({ commit, state }, payload: { board: Board }) {
    console.debug(`[Vuex] Marking entire ${payload.board} board as seen`);

    commit("setBoardSeenThreadsCounter", {
      amount: state.counters.threads.server[payload.board],
      board: payload.board
    });
  },

  /**
   * Marks a specific thread from board as seen.
   */
  markBoardThreadAsSeen(
    { commit, state },
    payload: { board: Board; threadId: string }
  ) {
    console.debug(`[Vuex] Marking thread ${payload.threadId} as seen`);
    // TODO: save in local storage
    // TODO: check if already seen

    commit("setBoardSeenThreadsCounter", {
      amount: state.counters.threads.client[payload.board] + 1,
      board: payload.board
    });
  }
};

export default actions;
