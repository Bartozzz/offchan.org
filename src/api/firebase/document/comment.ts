import { firestore } from "firebase/app";
import { database } from "../app";

export interface CommentDocument {
  content: string;
  createdAt: firestore.FieldValue;
  image?: string;
  author?: string;
}

export type Comment = CommentDocument & {
  guid: string;
};

export const threads = database.collection("threads");

/**
 * Creates a new comment in a given thread.
 *
 * @param thread  Thread GUID
 * @param data    Comment data
 */
export function create(thread: string, data: CommentDocument) {
  const comments = threads.doc(thread).collection("comments");

  // Comment to create:
  const comment: CommentDocument = {
    content: data.content,
    createdAt: firestore.FieldValue.serverTimestamp()
  };

  if (data.author) {
    comment.author = data.author;
  }

  if (data.image) {
    comment.image = data.image;
  }

  return comments.add(comment);
}

/**
 * Fetches all the comments from a given thread.
 *
 * @param thread      Thread GUID
 * @param onSnapshot  Callback
 */
export function fetch(
  thread: string,
  onSnapshot: (data: Readonly<Comment>[]) => void
) {
  const commentsQuery = threads
    .doc(thread)
    .collection("comments")
    .orderBy("createdAt", "asc");

  const unsubscribe = commentsQuery.onSnapshot(snapshot => {
    const comments: Readonly<Comment>[] = snapshot.docs.map(doc => ({
      guid: doc.id,
      ...(doc.data() as CommentDocument)
    }));

    onSnapshot(comments);
  });

  return unsubscribe;
}

/**
 * Fetches comments for a thread only once (without listening for changes).
 *
 * @param thread    Thread GUID
 */
export function fetchOnce(thread: string) {
  throw new Error("Not implemented");
}

/**
 * Updates a given comment from a thread.
 *
 * @param thread    Thread GUID
 * @param comment   Comment GUID
 * @param data      New comment data
 */
export function update(thread: string, comment: string, data: CommentDocument) {
  throw new Error("Not implemented");
}

/**
 * Removes a given comment from a thread.
 *
 * @param thread    Thread GUID
 * @param comment   Comment GUID
 */
export function remove(thread: string, comment: string) {
  throw new Error("Not implemented");
}
