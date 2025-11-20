/**
 * Core music types for sheet music training
 */

export type NoteName = "C" | "D" | "E" | "F" | "G" | "A" | "B";
export type Accidental = "" | "#" | "b";
export type Octave = 2 | 3 | 4 | 5 | 6;

export interface Note {
  name: NoteName;
  accidental: Accidental;
  octave: Octave;
}

export type Clef = "treble" | "bass";

export type DifficultyLevel = "beginner" | "intermediate" | "advanced";

export interface DifficultyConfig {
  level: DifficultyLevel;
  clef: Clef[];
  noteRange: {
    min: Note;
    max: Note;
  };
  includeAccidentals: boolean;
  ledgerLines: number; // Maximum number of ledger lines
  timeLimit?: number; // Time limit in seconds (optional)
}

export type PracticeMode =
  | "note-recognition"
  | "interval-training"
  | "chord-recognition"
  | "rhythm-reading";

export type InputMethod = "multiple-choice" | "virtual-keyboard" | "midi" | "text";

export interface PracticeSession {
  mode: PracticeMode;
  difficulty: DifficultyLevel;
  inputMethod: InputMethod;
  questionsCount: number;
  correctAnswers: number;
  incorrectAnswers: number;
  averageResponseTime: number;
  startTime: Date;
  endTime?: Date;
}

export interface Question {
  id: string;
  note: Note;
  clef: Clef;
  options?: Note[]; // For multiple choice
  correctAnswer: Note;
  userAnswer?: Note;
  responseTime?: number;
  isCorrect?: boolean;
}
