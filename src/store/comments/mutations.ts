import { BoardNames, Thread, State, Comment } from "../types";
import { MutationTree } from "vuex";

export const commentsMutations: MutationTree<State> = {
  setComments(
    state,
    { board, threadId, comments }: { board: BoardNames; threadId: string, comments: Comment[] }
  ) {
    const thread = state.threads[board].find(thread => thread.guid === threadId) as Thread;
    thread.comments = comments;
  }
};
