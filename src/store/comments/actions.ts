import { threadsCollection } from "@/api/firebase";
import { ActionTree } from "vuex";
import { State, BoardNames } from "@/store/types";

export const commentsActions: ActionTree<State, {}> = {
  fetchComments(
    { commit, state },
    { board, threadId }: { board: BoardNames, threadId: string }
  ) {
    const unsubscribe = threadsCollection
      .doc(threadId)
      .collection('comments')
      .onSnapshot(snapshot => {
        const comments = snapshot.docs.map(doc => ({
          guid: doc.id,
          ...doc.data(),
        }));
        commit('setComments', { board, threadId, comments });
      });
    commit('unsubscribe', unsubscribe);
  }
}