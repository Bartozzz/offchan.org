import { threadsCollection } from "@/api/firebase";
import { ActionTree } from "vuex";
import { State, BoardNames } from "@/store/types";
import { firestore } from 'firebase';

interface createCommentDto {
  content: string;
  author?: string;
  image?: string;
  createdAt: firestore.FieldValue;
}

export const commentsActions: ActionTree<State, {}> = {
  fetchComments(
    { commit, state },
    { board, threadId }: { board: BoardNames, threadId: string }
  ) {
    const unsubscribe = threadsCollection
      .doc(threadId)
      .collection('comments')
      .orderBy('createdAt', 'asc')
      .onSnapshot(snapshot => {
        const comments = snapshot.docs.map(doc => ({
          guid: doc.id,
          ...doc.data(),
        }));
        commit('setComments', { board, threadId, comments });
      });
    commit('unsubscribe', unsubscribe);
  },
  createComment({}, { name, content, file, threadId }) {
    // TODO - handle file upload
    const newComment: createCommentDto = {
      content,
      createdAt: firestore.FieldValue.serverTimestamp()
    }
    if (name) {
      newComment.author = name;
    }
    if (file) {
      newComment.image = file;
    }
    threadsCollection
      .doc(threadId)
      .collection('comments')
      .add(newComment)
      .then(doc => {
        // TODO - handle success
      })
      .catch(err => {
        console.error(err);
        // TODO - handle error
      });
  }
}