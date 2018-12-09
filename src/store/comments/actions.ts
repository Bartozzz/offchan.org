import { ActionTree } from "vuex";
import { CommentPayload } from "@/api/firebase/document/comment";
import { comments } from "@/api/firebase";
import { Board } from "@/api/types";
import { State } from "@/store/getInitialState";

const actions: ActionTree<State, {}> = {
  /**
   * Subscribes to comments from a given thread (if there's no subscribtion
   * already) and fetches threads in real-time.
   *
   * @param payload           Action payload
   * @param payload.board     Thread's board
   * @param payload.threadId  Thread's id
   */
  fetchComments(
    { commit, state },
    payload: { board: Board; threadId: string }
  ) {
    const { board, threadId } = payload;

    if (typeof state.commentsListener === "function") {
      console.debug(`[Vuex] Unsubscribing from comments ${board}/${threadId}`);
      console.error(`[Vuex] Unsubscription should not happen in fetchComments`);

      state.commentsListener();
      state.commentsListener = null;
    }

    console.debug(`[Vuex] Subscribing to comments from ${board}/${threadId}`);

    const unsubscribe = comments.fetch(threadId, comments => {
      console.debug(`[Vuex] New comments bulk from ${board}/${threadId}`);
      commit("setComments", { board, threadId, comments });
    });

    commit("setCommentsUnsubscribe", { board, threadId, unsubscribe });
  },

  /**
   * Unsubscribes from the latest comments listener (if there's any).
   */
  unsubscribeComments(
    { commit, state },
    payload: { board: Board; threadId: string }
  ) {
    const { board, threadId } = payload;

    if (typeof state.commentsListener === "function") {
      console.debug(`[Vuex] Unsubscribing from comments ${board}/${threadId}`);

      state.commentsListener();
      state.commentsListener = null;
    }
  },

  /**
   * Creates a new comment with provided payload in a given thread.
   *
   * @param payload           Action payload
   * @param payload.threadId  Thread to create comment in
   * @param payload.<rest>    Comments payload
   */
  createComment(
    { commit, state },
    payload: { threadId: string } & CommentPayload
  ) {
    const { threadId, ...data } = payload;

    console.debug(`[Vuex] Creating new comment in ${threadId}`, data);
    comments.create(threadId, data);
  }
};

export default actions;
