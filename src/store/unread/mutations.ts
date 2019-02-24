import { MutationTree } from "vuex";
import { State } from "@/store/getInitialState";
import { Board } from "@/api/types";
import { ThreadsCounter } from "@/api/firebase/document/counter";

const mutations: MutationTree<State> = {
  setThreadsCounter(state, payload: ThreadsCounter) {
    state.counters.threads.server = payload;
  },

  setBoardSeenThreadsCounter(state, payload: { board: Board; amount: number }) {
    state.counters.threads.client[payload.board] = payload.amount;
  }
};

export default mutations;
