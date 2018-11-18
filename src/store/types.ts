export type BoardNames = "cyb" | "psy" | "art" | "cult" | "tech" | "λ" | "Δ" | "φ";

export interface State {
  boards: {
    [BoardName in BoardNames]: Board 
  };
}

export interface Board {
  name: string;
  description: string;
  threads: Thread[];
}

export interface Thread {
  guid: string;
  author: string;
  content: string;
  comments: Comment[];
}

export interface Comment {
  guid: string;
  author: string;
  content: string;
}

export interface Category {
  board: string;
  name: string;
  description: string;
}