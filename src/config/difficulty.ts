import type { DifficultyConfig, } from "@/types/music";

/**
 * Difficulty configurations for different practice levels
 */
export const DIFFICULTY_CONFIGS: Record<string, DifficultyConfig> = {
  beginner: {
    level: "beginner",
    clef: ["treble"],
    noteRange: {
      min: { name: "C", accidental: "", octave: 4 },
      max: { name: "C", accidental: "", octave: 5 },
    },
    includeAccidentals: false,
    ledgerLines: 0,
    timeLimit: 10,
  },
  intermediate: {
    level: "intermediate",
    clef: ["treble", "bass"],
    noteRange: {
      min: { name: "C", accidental: "", octave: 3 },
      max: { name: "C", accidental: "", octave: 6 },
    },
    includeAccidentals: true,
    ledgerLines: 2,
    timeLimit: 7,
  },
  advanced: {
    level: "advanced",
    clef: ["treble", "bass"],
    noteRange: {
      min: { name: "C", accidental: "", octave: 2 },
      max: { name: "G", accidental: "", octave: 6 },
    },
    includeAccidentals: true,
    ledgerLines: 4,
    timeLimit: 5,
  },
};
