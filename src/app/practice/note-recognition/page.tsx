"use client";

import { useCallback, useEffect, useState } from "react";
import { SheetMusicRenderer } from "@/components/music/sheet-music-renderer";
import { MultipleChoiceAnswers } from "@/components/practice/multiple-choice-answers";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DIFFICULTY_CONFIGS } from "@/config/difficulty";
import { generateMultipleChoiceOptions, generateRandomNote, notesEqual } from "@/lib/music-utils";
import type { Clef, DifficultyLevel, Note, Question } from "@/types/music";

export default function NoteRecognitionPage() {
  const [difficulty, setDifficulty] = useState<DifficultyLevel>("beginner");
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<Note | null>(null);
  const [_sessionStartTime] = useState<Date>(new Date());

  const generateQuestion = useCallback(() => {
    const config = DIFFICULTY_CONFIGS[difficulty];
    const clef: Clef = config.clef[Math.floor(Math.random() * config.clef.length)];

    const note = generateRandomNote(
      config.noteRange.min,
      config.noteRange.max,
      config.includeAccidentals
    );

    const options = generateMultipleChoiceOptions(note, 4);

    const question: Question = {
      id: crypto.randomUUID(),
      note,
      clef,
      options,
      correctAnswer: note,
    };

    setCurrentQuestion(question);
    setShowFeedback(false);
    setSelectedAnswer(null);
  }, [difficulty]);

  useEffect(() => {
    generateQuestion();
  }, [generateQuestion]);

  const handleAnswer = (answer: Note) => {
    if (!currentQuestion || showFeedback) return;

    setSelectedAnswer(answer);
    const isCorrect = notesEqual(answer, currentQuestion.correctAnswer);

    setScore((prev) => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1,
    }));

    setShowFeedback(true);

    // Auto-advance after 1.5 seconds
    setTimeout(() => {
      generateQuestion();
    }, 1500);
  };

  const handleDifficultyChange = (newDifficulty: DifficultyLevel) => {
    setDifficulty(newDifficulty);
    setScore({ correct: 0, total: 0 });
  };

  if (!currentQuestion) return null;

  const accuracy = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold">Note Recognition</h1>
          <p className="text-muted-foreground">Identify the note shown on the staff</p>
        </div>

        {/* Difficulty Selector */}
        <Card>
          <CardHeader>
            <CardTitle>Difficulty Level</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              {(["beginner", "intermediate", "advanced"] as DifficultyLevel[]).map((level) => (
                <Button
                  key={level}
                  variant={difficulty === level ? "default" : "outline"}
                  onClick={() => handleDifficultyChange(level)}
                  className="capitalize"
                >
                  {level}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Score Display */}
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-600">{score.correct}</div>
                <div className="text-sm text-muted-foreground">Correct</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{score.total}</div>
                <div className="text-sm text-muted-foreground">Total</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">{accuracy}%</div>
                <div className="text-sm text-muted-foreground">Accuracy</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sheet Music Display */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-center">
              <SheetMusicRenderer note={currentQuestion.note} clef={currentQuestion.clef} />
            </div>
          </CardContent>
        </Card>

        {/* Answer Options */}
        <Card>
          <CardHeader>
            <CardTitle>Select the correct note:</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <MultipleChoiceAnswers
              options={currentQuestion.options || []}
              onAnswer={handleAnswer}
              selectedAnswer={selectedAnswer || undefined}
              correctAnswer={showFeedback ? currentQuestion.correctAnswer : undefined}
              disabled={showFeedback}
            />
          </CardContent>
        </Card>

        {/* Feedback */}
        {showFeedback && selectedAnswer && (
          <Card
            className={
              notesEqual(selectedAnswer, currentQuestion.correctAnswer)
                ? "border-green-500"
                : "border-red-500"
            }
          >
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-xl font-semibold">
                  {notesEqual(selectedAnswer, currentQuestion.correctAnswer)
                    ? "✅ Correct!"
                    : "❌ Incorrect"}
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
