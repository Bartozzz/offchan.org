import { Boards } from "@/api/types";

export interface Category {
  board: Boards;
  name: string;
  description: string;
}

export const categories: Category[] = [
  {
    board: "cyb",
    name: "Cyberia",
    description: "Random. Low life. High tech. Anonymity."
  },

  {
    board: "psy",
    name: "Psychology",
    description: "Dreams. Drugs. Consciousness. Feelings."
  },

  {
    board: "art",
    name: "Art & Design",
    description: "Art. Design. Photography. Writing."
  },

  {
    board: "cult",
    name: "Culture & Media",
    description: "Films. Games. Lifestyle. Literature. Music."
  },

  {
    board: "tech",
    name: "Technology & Science",
    description: "Tech. Science. Engineering. Mathematics."
  },

  {
    board: "λ",
    name: "Programming",
    description: "Structure and interpretation of systems."
  },

  {
    board: "Δ",
    name: "Projects",
    description: "Hardware. Software. Community Projects."
  },

  {
    board: "φ",
    name: "Philosophy",
    description: "Philosophy. Share your thoughts."
  }
];
