"use client";

import { Button } from "@/components/ui/button";
import { getNoteDisplayName, notesEqual } from "@/lib/music-utils";
import { cn } from "@/lib/utils";
import type { Note } from "@/types/music";

interface MultipleChoiceAnswersProps {
  options: Note[];
  onAnswer: (note: Note) => void;
  selectedAnswer?: Note;
  correctAnswer?: Note;
  disabled?: boolean;
}

export function MultipleChoiceAnswers({
  options,
  onAnswer,
  selectedAnswer,
  correctAnswer,
  disabled = false,
}: MultipleChoiceAnswersProps) {
  const getButtonVariant = (option: Note) => {
    if (!selectedAnswer) return "outline";

    if (notesEqual(option, selectedAnswer)) {
      return correctAnswer && notesEqual(selectedAnswer, correctAnswer) ? "default" : "destructive";
    }

    if (correctAnswer && notesEqual(option, correctAnswer)) {
      return "default";
    }

    return "outline";
  };

  return (
    <div className="grid grid-cols-2 gap-4 w-full max-w-md">
      {options.map((option) => (
        <Button
          key={getNoteDisplayName(option)}
          variant={getButtonVariant(option)}
          size="lg"
          onClick={() => onAnswer(option)}
          disabled={disabled}
          className={cn(
            "text-2xl font-bold h-20",
            selectedAnswer &&
              correctAnswer &&
              notesEqual(option, correctAnswer) &&
              "ring-2 ring-green-500"
          )}
        >
          {getNoteDisplayName(option)}
        </Button>
      ))}
    </div>
  );
}
