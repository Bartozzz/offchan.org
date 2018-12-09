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
  counters: {
    threads: {
      user: { [BoardName in Board]: number };
      server: { [BoardName in Board]: number };
    };
  };
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
    },
    counters: {
      threads: {
        user: {
          cyb: 0,
          psy: 0,
          art: 0,
          cult: 0,
          tech: 0,
          λ: 0,
          Δ: 0,
          φ: 0
        },
        server: {
          cyb: 0,
          psy: 0,
          art: 0,
          cult: 0,
          tech: 0,
          λ: 0,
          Δ: 0,
          φ: 0
        }
      }
    }
  };
}
