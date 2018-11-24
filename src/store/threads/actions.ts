import { threadsCollection } from "@/api/firebase";
import { firestore } from "firebase";
import { ActionTree, Commit } from "vuex";
import { State, BoardNames } from "@/store/types";

const commitThreads = (
  { commit, state }: { commit: Commit, state: State },
  board: BoardNames
) => (snapshot: firestore.QuerySnapshot) => {

  if (snapshot.size === state.threads[board].length) {
    return;
  }
  const threads = snapshot.docs.map(doc => ({
    guid: doc.id,
    ...doc.data(),
    comments: []
  }));
  commit("setThreads", { board, threads });
};

interface createThreadDto {
  content: string;
  author?: string;
  file?: string;
  board: string;
  createdAt: firestore.FieldValue;
}

export const threadActions: ActionTree<State, {}> = {
  fetchThreads({ commit, state }, { board }: { board: BoardNames }) {
    const unsubscribe = threadsCollection
      .where("board", "==", board)
      .orderBy("createdAt", "desc")
      .onSnapshot(
        commitThreads({ commit, state }, board),
        error => {
          console.error("fetchThreads error: ", error);
        }
      );
    commit('unsubscribe', unsubscribe);
  },
  fetchThreadsOnce({ commit, state }, { board }: { board: BoardNames }) {
    return threadsCollection
      .where("board", "==", board)
      .orderBy("createdAt", "desc")
      .get()
      .then(
        commitThreads({ commit, state }, board),
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
