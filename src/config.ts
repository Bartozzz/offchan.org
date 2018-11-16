export interface Category {
  board: string;
  name: string;
  description: string;
}

export const categories: Category[] = [
  {
    board: "cyb",
    name: "Cyberia",
    description: "Random. Low life. High tech. Anonymity. Privacy. Security."
  },

  {
    board: "psy",
    name: "Psychology",
    description: "Dreams. Drgs. Consciousness. Feelings and experiences."
  },

  {
    board: "art",
    name: "Art & Design",
    description: "Art. Design. Origami. Photography. Writing."
  },

  {
    board: "cult",
    name: "Culture & Media",
    description: "Anime. Fashion. Films. Games. Lifestyle. Lliterature. Music."
  },

  {
    board: "tech",
    name: "Technology & Science",
    description: "Science. Technology. Engineering. Mathematics."
  },

  {
    board: "λ",
    name: "Programming",
    description: "Structure and interpretation of computer programs."
  },

  {
    board: "Δ",
    name: "Projects",
    description: "Do-it-yourself. Hardware, Software and Community Projects."
  },

  {
    board: "φ",
    name: "Philosophy",
    description: "Philosophy. Share your thoughts."
  }
];
