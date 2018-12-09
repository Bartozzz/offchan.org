import { database } from "../app";
import { Board } from "../../types";

// Common counter document types:
export type ThreadsCounter = { [BoardName in Board]: number };

// Common counter document names:
export const COUNTER_THREADS = "threads";

export const counters = database.collection("counters");

/**
 * Does nothing right now. Stays here for consistency. Might be used in the
 * future.
 *
 * @param document    Counter document identifier
 * @param data        Counter payload
 * @deprecated
 */
export function create<T = any>(document: string, data: T) {
  throw new Error("Not implemented");
}

/**
 * Fetches all data from a given counter.
 *
 * @param document    Counter document identifier
 * @param onSnapshot  Callback
 */
export function fetch<T = any>(
  document: string,
  onSnapshot: (data: Readonly<T>) => void
) {
  const counterQuery = counters.doc(document);
  const unsubscribe = counterQuery.onSnapshot(snapshot => {
    onSnapshot(snapshot.data() as Readonly<T>);
  });

  return unsubscribe;
}

/**
 * Does nothing right now. Stays here for consistency. Might be used in the
 * future.
 *
 * @param document    Counter document identifier
 * @param data        Counter payload
 * @deprecated
 */
export function update<T = any>(document: string, data: T) {
  throw new Error("Not implemented");
}

/**
 * Does nothing right now. Stays here for consistency. Might be used in the
 * future.
 *
 * @param document    Counter document identifier
 * @deprecated
 */
export function remove(document: string) {
  throw new Error("Not implemented");
}
