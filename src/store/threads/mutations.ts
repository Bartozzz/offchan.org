import { MutationTree } from "vuex";
import { Board } from "@/api/types";
import { Thread } from "@/api/firebase/document/thread";
import { State, Unsubscribe } from "@/store/getInitialState";

const mutations: MutationTree<State> = {
  setThreads(state, payload: { board: Board; threads: Thread[] }) {
    const { board, threads } = payload;

    state.threads[board].document = threads;
  },

  setThreadsUnsubscribe(
    state,
    payload: { board: Board; unsubscribe: Unsubscribe }
  ) {
    const { board, unsubscribe } = payload;

    state.threads[board].unsubscribe = unsubscribe;
  }
};

export default mutations;
