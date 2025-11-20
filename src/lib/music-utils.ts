import type { Accidental, Clef, Note, NoteName } from "@/types/music";

/**
 * Utility functions for music note operations
 */

const _NOTE_NAMES: NoteName[] = ["C", "D", "E", "F", "G", "A", "B"];

/**
 * Convert a note to a MIDI number for comparison
 */
export function noteToMidi(note: Note): number {
  const noteValues: Record<NoteName, number> = {
    C: 0,
    D: 2,
    E: 4,
    F: 5,
    G: 7,
    A: 9,
    B: 11,
  };

  const accidentalOffset: Record<Accidental, number> = {
    "": 0,
    "#": 1,
    b: -1,
  };

  return (note.octave + 1) * 12 + noteValues[note.name] + accidentalOffset[note.accidental];
}

/**
 * Check if two notes are equal
 */
export function notesEqual(note1: Note, note2: Note): boolean {
  return noteToMidi(note1) === noteToMidi(note2);
}

/**
 * Get note display name
 */
export function getNoteDisplayName(note: Note): string {
  return `${note.name}${note.accidental}${note.octave}`;
}

/**
 * Generate a random note within a given range
 */
export function generateRandomNote(
  minNote: Note,
  maxNote: Note,
  includeAccidentals: boolean
): Note {
  const minMidi = noteToMidi(minNote);
  const maxMidi = noteToMidi(maxNote);

  // Generate random MIDI number in range
  const midiNumber = Math.floor(Math.random() * (maxMidi - minMidi + 1)) + minMidi;

  // Convert back to note
  const octave = Math.floor(midiNumber / 12) - 1;
  const noteValue = midiNumber % 12;

  // Find the note name
  const noteMap: Record<number, { name: NoteName; accidental: Accidental }> = {
    0: { name: "C", accidental: "" },
    1: { name: "C", accidental: "#" },
    2: { name: "D", accidental: "" },
    3: { name: "D", accidental: "#" },
    4: { name: "E", accidental: "" },
    5: { name: "F", accidental: "" },
    6: { name: "F", accidental: "#" },
    7: { name: "G", accidental: "" },
    8: { name: "G", accidental: "#" },
    9: { name: "A", accidental: "" },
    10: { name: "A", accidental: "#" },
    11: { name: "B", accidental: "" },
  };

  let noteInfo = noteMap[noteValue];

  // If accidentals not allowed and we got one, use flat notation instead
  if (!includeAccidentals && noteInfo.accidental === "#") {
    const flatMap: Record<number, { name: NoteName; accidental: Accidental }> = {
      1: { name: "D", accidental: "b" },
      3: { name: "E", accidental: "b" },
      6: { name: "G", accidental: "b" },
      8: { name: "A", accidental: "b" },
      10: { name: "B", accidental: "b" },
    };
    noteInfo = flatMap[noteValue] || noteInfo;
  }

  // If still has accidental and not allowed, round to nearest natural note
  if (!includeAccidentals && noteInfo.accidental !== "") {
    noteInfo = { name: noteInfo.name, accidental: "" };
  }

  return {
    name: noteInfo.name,
    accidental: noteInfo.accidental,
    octave: octave as Note["octave"],
  };
}

/**
 * Generate multiple choice options for a note
 */
export function generateMultipleChoiceOptions(correctNote: Note, count = 4): Note[] {
  const options: Note[] = [correctNote];

  while (options.length < count) {
    // Generate nearby notes
    const offset = (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 5) + 1);
    const newMidi = noteToMidi(correctNote) + offset;

    // Skip if out of reasonable range
    if (newMidi < 24 || newMidi > 96) continue;

    const octave = Math.floor(newMidi / 12) - 1;
    const noteValue = newMidi % 12;

    const noteMap: Record<number, { name: NoteName; accidental: Accidental }> = {
      0: { name: "C", accidental: "" },
      1: { name: "C", accidental: "#" },
      2: { name: "D", accidental: "" },
      3: { name: "E", accidental: "b" },
      4: { name: "E", accidental: "" },
      5: { name: "F", accidental: "" },
      6: { name: "F", accidental: "#" },
      7: { name: "G", accidental: "" },
      8: { name: "G", accidental: "#" },
      9: { name: "A", accidental: "" },
      10: { name: "B", accidental: "b" },
      11: { name: "B", accidental: "" },
    };

    const noteInfo = noteMap[noteValue];
    const newNote: Note = {
      name: noteInfo.name,
      accidental: noteInfo.accidental,
      octave: octave as Note["octave"],
    };

    // Check if this option already exists
    if (!options.some((opt) => notesEqual(opt, newNote))) {
      options.push(newNote);
    }
  }

  // Shuffle options
  return options.sort(() => Math.random() - 0.5);
}

/**
 * Get VexFlow clef string
 */
export function getVexFlowClef(clef: Clef): string {
  return clef;
}

/**
 * Convert note to VexFlow key notation
 */
export function noteToVexFlowKey(note: Note, _clef: Clef): string {
  // VexFlow format: "c/4" for middle C
  const accidentalMap: Record<Accidental, string> = {
    "": "",
    "#": "#",
    b: "b",
  };

  return `${note.name.toLowerCase()}${accidentalMap[note.accidental]}/${note.octave}`;
}
