import { MutationTree } from "vuex";
import { Boards } from "@/api/types";
import { Thread } from "@/api/firebase/document/thread";
import { State } from "../getInitialState";

const mutations: MutationTree<State> = {
  setThreads(state, payload: { board: Boards; threads: Thread[] }) {
    const { board, threads } = payload;

    state.threads[board] = threads;
  }
};

export default mutations;
