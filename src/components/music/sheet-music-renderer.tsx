"use client";

import { useEffect, useRef } from "react";
import { Accidental, Formatter, Renderer, Stave, StaveNote } from "vexflow";
import { noteToVexFlowKey } from "@/lib/music-utils";
import type { Clef, Note } from "@/types/music";

interface SheetMusicRendererProps {
  note: Note;
  clef: Clef;
  width?: number;
  height?: number;
}

export function SheetMusicRenderer({
  note,
  clef,
  width = 400,
  height = 200,
}: SheetMusicRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear previous content
    containerRef.current.innerHTML = "";

    try {
      // Create VexFlow renderer
      const renderer = new Renderer(containerRef.current, Renderer.Backends.SVG);
      renderer.resize(width, height);

      const context = renderer.getContext();
      context.setFont("Arial", 10);

      // Create a stave
      const stave = new Stave(10, 40, width - 20);
      stave.addClef(clef);
      stave.setContext(context).draw();

      // Create the note
      const vexFlowKey = noteToVexFlowKey(note, clef);

      // Create StaveNote
      const staveNote = new StaveNote({
        keys: [vexFlowKey],
        duration: "w", // Whole note
        clef: clef,
      });

      // Add accidental if needed
      if (note.accidental !== "") {
        staveNote.addModifier(new Accidental(note.accidental));
      }

      // Format and draw
      Formatter.FormatAndDraw(context, stave, [staveNote]);
    } catch (_error) {
    }
  }, [note, clef, width, height]);

  return (
    <div
      ref={containerRef}
      className="flex items-center justify-center border rounded-lg bg-white dark:bg-gray-900"
      style={{ minHeight: height }}
    />
  );
}
