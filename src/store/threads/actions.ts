import { ActionTree } from "vuex";
import { threads } from "@/api/firebase";
import { State } from "../getInitialState";

const actions: ActionTree<State, {}> = {
  fetchThreads({ commit, state }, { board }) {
    const unsubscribe = threads.fetch(board, threads => {
      commit("setThreads", { board, threads });
    });

    commit("unsubscribe", unsubscribe);
  },

  fetchThreadsOnce({ commit, state }, { board }) {
    return threads.fetchOnce(board).then(threads => {
      commit("setThreads", { board, threads });
    });
  },

  createThread({ commit, state }, { board, ...data }) {
    threads.create(board, data);
  }
};

export default actions;
