"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { glyphForShortcut, insertAtCursor } from "@/lib/keyboardShortcuts";
import { getSettings } from "@/lib/studioStorage";

interface Props {
  value: string;
  onChange: (next: string) => void;
  onValidate: () => void;
  onInspect: () => void;
  onExport: () => void;
}

export function SigilInput({ value, onChange, onValidate, onInspect, onExport }: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;

    const onKey = (event: KeyboardEvent) => {
      const settings = getSettings();
      if (!settings.shortcutsEnabled) return;
      const glyph = glyphForShortcut(event);
      if (!glyph) return;
      event.preventDefault();
      const { selectionStart, selectionEnd } = el;
      const { next, caret } = insertAtCursor(el.value, glyph, selectionStart, selectionEnd);
      onChange(next);
      requestAnimationFrame(() => {
        el.focus();
        el.setSelectionRange(caret, caret);
      });
    };

    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
  }, [onChange]);

  return (
    <div className="panel space-y-3">
      <h3 className="text-lg font-semibold">Sigil Source</h3>
      <textarea
        ref={textareaRef}
        className="min-h-40 w-full rounded-xl border border-line bg-slate-950/60 p-3 text-sm outline-none focus:border-accent/40"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <div className="flex flex-wrap gap-2">
        <Button onClick={onValidate}>Validate</Button>
        <Button onClick={onInspect}>Inspect</Button>
        <Button onClick={onExport}>Export</Button>
      </div>
    </div>
  );
}
