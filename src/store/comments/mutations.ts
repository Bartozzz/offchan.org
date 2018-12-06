import { MutationTree } from "vuex";
import { Boards } from "@/api/types";
import { Thread } from "@/api/firebase/document/thread";
import { Comment } from "@/api/firebase/document/comment";
import { State } from "../getInitialState";

const mutations: MutationTree<State> = {
  setComments(
    state,
    payload: { board: Boards; threadId: string; comments: Comment[] }
  ) {
    const { board, threadId, comments } = payload;

    const thread = state.threads[board].find(
      thread => thread.guid === threadId
    ) as Thread;

    thread.comments = comments;
  }
};

export default mutations;
