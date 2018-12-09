import { MutationTree } from "vuex";
import { State } from "@/store/getInitialState";
import { ThreadsCounter } from "@/api/firebase/document/counter";

const mutations: MutationTree<State> = {
  setThreadsCounter(state, payload: ThreadsCounter) {
    state.counters.threads.server = payload;
  }
};

export default mutations;
