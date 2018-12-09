import { MutationTree } from "vuex";
import { Board } from "@/api/types";
import { Thread } from "@/api/firebase/document/thread";
import { State } from "../getInitialState";

const mutations: MutationTree<State> = {
  setThreads(state, payload: { board: Board; threads: Thread[] }) {
    const { board, threads } = payload;

    state.threads[board].document = threads;
  },

  setThreadsUnsubscribe(
    state,
    payload: { board: Board; unsubscribe: () => void }
  ) {
    const { board, unsubscribe } = payload;

    state.threads[board].listener = unsubscribe;
  }
};

export default mutations;
