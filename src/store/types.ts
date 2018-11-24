export type BoardNames = "cyb" | "psy" | "art" | "cult" | "tech" | "λ" | "Δ" | "φ";

export interface State {
  threads: {
    [BoardName in BoardNames]: Thread[]
  };
  unsubscribe: (() => any) | null;
}

export interface Thread {
  guid: string;
  author?: string;
  content: string;
  file?: string;
  comments: Comment[];
}

export interface Comment {
  guid: string;
  author?: string;
  content: string;
  file?: string;
}
