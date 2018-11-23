import { threadsCollection } from '@/api/firebase';
import { ActionTree } from 'vuex';
import { State, BoardNames } from '@/store/types';

export const threadActions: ActionTree<State, {}> = {
  fetchThreads({ commit, state }, { board }: { board: BoardNames }) {
    threadsCollection
      .where("board", "==", board)
      .orderBy("createdAt", "desc")
      .onSnapshot(
        snapshot => {
          console.log("snapshot size: ", snapshot.size);
          if (snapshot.size === state.threads[board].length) {
            return;
          }
          const threads = snapshot.docs.map(doc => ({
            guid: doc.id,
            ...doc.data()
          }));
          commit("setThreads", { board, threads });
        },
        error => {
          console.error("fetchThreads error: ", error);
        }
      );
  }
};
