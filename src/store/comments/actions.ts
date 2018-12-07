import { ActionTree } from "vuex";
import { comments } from "@/api/firebase";
import { State } from "../getInitialState";

const actions: ActionTree<State, {}> = {
  fetchComments({ commit, state }, { board, threadId }) {
    const unsubscribe = comments.fetch(threadId, comments => {
      commit("setComments", { board, threadId, comments });
    });

    // commit("setUnsubscribe", unsubscribe);
  },

  createComment({ commit, state }, { threadId, ...data }) {
    comments.create(threadId, data);
  }
};

export default actions;
