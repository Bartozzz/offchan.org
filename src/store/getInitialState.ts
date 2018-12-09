import { Board } from "@/api/types";
import { Thread } from "@/api/firebase/document/thread";

// Firebase unsubscribe function:
export type Unsubscribe = () => void;

export interface BoardState {
  unsubscribe: null | Unsubscribe;
  lastFetch: number;
  document: Thread[];
}

export interface State {
  comments: { unsubscribe: null | Unsubscribe };
  threads: { [BoardName in Board]: BoardState };
}

export function createStateForBoard(name: Board): BoardState {
  return {
    unsubscribe: null,
    lastFetch: +new Date(),
    document: []
  };
}

export function getInitialState(): State {
  return {
    comments: {
      unsubscribe: null
    },
    threads: {
      cyb: createStateForBoard("cyb"),
      psy: createStateForBoard("psy"),
      art: createStateForBoard("art"),
      cult: createStateForBoard("cult"),
      tech: createStateForBoard("tech"),
      λ: createStateForBoard("λ"),
      Δ: createStateForBoard("Δ"),
      φ: createStateForBoard("φ")
    }
  };
}
