import { Boards } from "@/api/types";
import { Thread } from "@/api/firebase/document/thread";

export interface State {
  threads: { [BoardName in Boards]: Thread[] };
  unsubscribe: (() => any) | null;
}

export function getInitialState(): State {
  return {
    threads: {
      cyb: [],
      psy: [],
      art: [],
      cult: [],
      tech: [],
      λ: [],
      Δ: [],
      φ: []
    },
    unsubscribe: null
  };
}
