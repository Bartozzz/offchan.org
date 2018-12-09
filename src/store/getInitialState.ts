import { Board } from "@/api/types";
import { Thread } from "@/api/firebase/document/thread";

export interface BoardState {
  lastFetch: number;
  listener: null | Function;
  document: Thread[];
}

export interface State {
  commentsListener: null | (() => void);
  threads: { [BoardName in Board]: BoardState };
}

export function createStateForBoard(name: Board): BoardState {
  return {
    lastFetch: +new Date(),
    listener: null,
    document: []
  };
}

export function getInitialState(): State {
  return {
    commentsListener: null,
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
