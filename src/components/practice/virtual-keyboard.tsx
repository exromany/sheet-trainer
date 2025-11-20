"use client";

import { cn } from "@/lib/utils";
import type { Note } from "@/types/music";

interface VirtualKeyboardProps {
  onNoteSelect: (note: Note) => void;
  selectedNote?: Note;
  disabled?: boolean;
  octaveRange?: [number, number];
}

interface PianoKey {
  note: Note;
  isBlack: boolean;
  label: string;
}

export function VirtualKeyboard({
  onNoteSelect,
  selectedNote,
  disabled = false,
  octaveRange = [3, 5],
}: VirtualKeyboardProps) {
  const [startOctave, endOctave] = octaveRange;

  // Generate piano keys for the octave range
  const generateKeys = (): PianoKey[] => {
    const keys: PianoKey[] = [];
    const notePattern = [
      { name: "C", isBlack: false },
      { name: "C#", isBlack: true },
      { name: "D", isBlack: false },
      { name: "D#", isBlack: true },
      { name: "E", isBlack: false },
      { name: "F", isBlack: false },
      { name: "F#", isBlack: true },
      { name: "G", isBlack: false },
      { name: "G#", isBlack: true },
      { name: "A", isBlack: false },
      { name: "A#", isBlack: true },
      { name: "B", isBlack: false },
    ];

    for (let octave = startOctave; octave <= endOctave; octave++) {
      for (const { name, isBlack } of notePattern) {
        const [noteName, accidental] = name.includes("#") ? [name[0], "#"] : [name, ""];

        keys.push({
          note: {
            name: noteName as Note["name"],
            accidental: accidental as Note["accidental"],
            octave: octave as Note["octave"],
          },
          isBlack,
          label: `${name}${octave}`,
        });
      }
    }

    return keys;
  };

  const keys = generateKeys();
  const whiteKeys = keys.filter((k) => !k.isBlack);
  const blackKeys = keys.filter((k) => k.isBlack);

  const isSelected = (key: PianoKey): boolean => {
    if (!selectedNote) return false;
    return (
      key.note.name === selectedNote.name &&
      key.note.accidental === selectedNote.accidental &&
      key.note.octave === selectedNote.octave
    );
  };

  return (
    <div className="relative inline-block">
      {/* White keys */}
      <div className="flex">
        {whiteKeys.map((key) => (
          <button
            key={key.label}
            type="button"
            onClick={() => !disabled && onNoteSelect(key.note)}
            disabled={disabled}
            className={cn(
              "relative w-12 h-40 border-2 border-gray-800 bg-white",
              "hover:bg-gray-100 active:bg-gray-200",
              "transition-colors",
              "first:rounded-l-lg last:rounded-r-lg",
              isSelected(key) && "bg-blue-200 hover:bg-blue-300",
              disabled && "opacity-50 cursor-not-allowed"
            )}
          >
            <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs text-gray-600">
              {key.label}
            </span>
          </button>
        ))}
      </div>

      {/* Black keys */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="relative h-full flex">
          {whiteKeys.map((whiteKey) => {
            // Find if there's a black key after this white key
            const blackKey = blackKeys.find((bk) => {
              const whiteKeyIndex = keys.findIndex(
                (k) =>
                  k.note.name === whiteKey.note.name &&
                  k.note.octave === whiteKey.note.octave &&
                  k.note.accidental === ""
              );
              const currentBlackIndex = keys.findIndex(
                (k) =>
                  k.note.name === bk.note.name &&
                  k.note.octave === bk.note.octave &&
                  k.note.accidental === bk.note.accidental
              );
              return currentBlackIndex === whiteKeyIndex + 1;
            });

            if (!blackKey) return <div key={`spacer-${whiteKey.label}`} className="w-12" />;

            return (
              <div key={`black-${whiteKey.label}`} className="relative w-12">
                <button
                  type="button"
                  onClick={() => !disabled && onNoteSelect(blackKey.note)}
                  disabled={disabled}
                  className={cn(
                    "absolute right-0 translate-x-1/2 w-8 h-24 pointer-events-auto",
                    "bg-gray-900 border-2 border-gray-950 rounded-b-md",
                    "hover:bg-gray-800 active:bg-gray-700",
                    "transition-colors z-10",
                    isSelected(blackKey) && "bg-blue-600 hover:bg-blue-500",
                    disabled && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[10px] text-white">
                    {blackKey.label}
                  </span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
