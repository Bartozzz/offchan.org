import { MutationTree } from "vuex";
import { Board } from "@/api/types";
import { Thread } from "@/api/firebase/document/thread";
import { Comment } from "@/api/firebase/document/comment";
import { State, Unsubscribe } from "@/store/getInitialState";

const mutations: MutationTree<State> = {
  setComments(
    state,
    payload: { board: Board; threadId: string; comments: Comment[] }
  ) {
    const { board, threadId, comments } = payload;

    const thread = state.threads[board].document.find(
      thread => thread.guid === threadId
    ) as Thread;

    thread.comments = comments;
  },

  setCommentsUnsubscribe(
    state,
    payload: { board: Board; threadId: string; unsubscribe: Unsubscribe }
  ) {
    const { board, threadId, unsubscribe } = payload;

    state.comments.unsubscribe = unsubscribe;
  }
};

export default mutations;
