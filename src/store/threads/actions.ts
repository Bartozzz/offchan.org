import { threadsCollection } from "@/api/firebase";
import { firestore } from "firebase";
import { ActionTree } from "vuex";
import { State, BoardNames } from "@/store/types";

interface createThreadDto {
  content: string;
  author?: string;
  file?: string;
  board: string;
  createdAt: firestore.FieldValue;
}

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
  },
  createThread({}, { name, content, file, board }) {
    // TODO - handle file upload
    const newThread: createThreadDto = {
      content,
      board,
      createdAt: firestore.FieldValue.serverTimestamp()
    };
    if (name) {
      newThread.author = name;
    }
    threadsCollection
      .add(newThread)
      .then(doc => {
        // TODO - handle success
      })
      .catch(err => {
        console.error(err);
        // TODO - handle error
      });
  }
};
