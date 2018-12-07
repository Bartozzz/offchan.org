import { firestore } from "firebase/app";
import { database } from "../app";
import { Comment } from "./comment";
import { Boards } from "../../types";

export interface ThreadDocument {
  board: Boards;
  content: string;
  createdAt: firestore.FieldValue;
  image?: string;
  author?: string;
  comments?: Comment[];
}

export type Thread = ThreadDocument & {
  guid: string;
};

export const threads = database.collection("threads");

/**
 * Creates a new thread in a given board.
 *
 * @param thread  Board GUID
 * @param data    Thread data
 */
export function create(board: Boards, data: ThreadDocument) {
  const thread: ThreadDocument = {
    board: board,
    content: data.content,
    createdAt: firestore.FieldValue.serverTimestamp()
  };

  if (data.author) {
    thread.author = data.author;
  }

  if (data.image) {
    thread.image = data.image;
  }

  return threads.add(thread);
}

/**
 * Fetches all the threads from a given board.
 *
 * @param board       Board id
 * @param onSnapshot  Callback
 */
export function fetch(
  board: Boards,
  onSnapshot: (data: Readonly<Thread>[]) => void
) {
  const threadsQuery = threads
    .where("board", "==", board)
    .orderBy("createdAt", "desc");

  const unsubscribe = threadsQuery.onSnapshot(snapshot => {
    const threads: Readonly<Thread>[] = snapshot.docs.map(doc => ({
      guid: doc.id,
      comments: [],
      ...(doc.data() as ThreadDocument)
    }));

    onSnapshot(threads);
  });

  return unsubscribe;
}

/**
 * Fetches threads for a board only once (without listening for changes).
 *
 * @param board     Board GUID
 */
export function fetchOnce(board: Boards) {
  return threads
    .where("board", "==", board)
    .orderBy("createdAt", "desc")
    .get()
    .then(snapshot => {
      return snapshot.docs.map(doc => ({
        guid: doc.id,
        comments: [],
        ...(doc.data() as ThreadDocument)
      })) as Readonly<Thread>[];
    });
}

/**
 * Updates a given thread from a board.
 *
 * @param board     Board GUID
 * @param data      New thread data
 */
export function update(board: Boards, data: ThreadDocument) {
  throw new Error("Not implemented");
}

/**
 * Removes a given thread.
 *
 * @param thread    Thread GUID
 */
export function remove(thread: string) {
  throw new Error("Not implemented");
}
