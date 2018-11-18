import { State } from "./types";

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
    }
  };
}
