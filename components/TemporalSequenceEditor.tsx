"use client";

import { useMemo, useState } from "react";
import type { TemporalSequenceStep } from "@/lib/types";
import { sequenceExample } from "@/lib/data/atlas";
import { Button } from "@/components/ui/button";
import { glyphForShortcut, insertAtCursor } from "@/lib/keyboardShortcuts";
import { getSettings, storageKeys } from "@/lib/studioStorage";

export function TemporalSequenceEditor() {
  const initial = typeof window === "undefined" ? sequenceExample : (JSON.parse(localStorage.getItem(storageKeys.sequence) ?? "null") as TemporalSequenceStep[] | null) ?? sequenceExample;
  const [steps, setSteps] = useState<TemporalSequenceStep[]>(initial);
  const coherence = useMemo(() => steps.every((s) => s.sigil.trim().length > 0), [steps]);

  const persist = (next: TemporalSequenceStep[]) => {
    setSteps(next);
    localStorage.setItem(storageKeys.sequence, JSON.stringify(next));
  };

  const update = (id: string, key: "label" | "sigil", value: string) => {
    persist(steps.map((s) => (s.id === id ? { ...s, [key]: value } : s)));
  };

  const addStep = () => {
    persist([...steps, { id: crypto.randomUUID(), label: `Step ${steps.length + 1}`, sigil: "" }]);
  };

  const exportSequence = () => {
    const blob = new Blob([JSON.stringify(steps, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sigl-sequence.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="panel space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Temporal Sequence Builder</h3>
        <span className={`text-xs ${coherence ? "text-emerald-300" : "text-rose-300"}`}>{coherence ? "Coherent" : "Missing step sigils"}</span>
      </div>
      <div className="space-y-3">
        {steps.map((step, i) => (
          <div key={step.id} className="rounded-xl border border-line bg-slate-950/40 p-3">
            <div className="mb-2 text-xs text-muted">Step {i + 1}</div>
            <input value={step.label} onChange={(e) => update(step.id, "label", e.target.value)} className="mb-2 w-full rounded border border-line bg-transparent p-2 text-sm" />
            <input
              value={step.sigil}
              onKeyDown={(e) => {
                const settings = getSettings();
                if (!settings.shortcutsEnabled) return;
                const glyph = glyphForShortcut(e.nativeEvent);
                if (!glyph) return;
                e.preventDefault();
                const target = e.currentTarget;
                const { next, caret } = insertAtCursor(target.value, glyph, target.selectionStart ?? 0, target.selectionEnd ?? 0);
                update(step.id, "sigil", next);
                requestAnimationFrame(() => target.setSelectionRange(caret, caret));
              }}
              onChange={(e) => update(step.id, "sigil", e.target.value)}
              className="w-full rounded border border-line bg-transparent p-2 text-sm"
            />
          </div>
        ))}
      </div>
      <svg viewBox="0 0 700 80" className="h-20 w-full rounded-xl border border-line bg-slate-950/40">
        {steps.map((s, i) => {
          const x = 40 + i * (620 / Math.max(1, steps.length - 1));
          return (
            <g key={s.id}>
              {i < steps.length - 1 && <line x1={x} y1={40} x2={x + 620 / Math.max(1, steps.length - 1)} y2={40} stroke="#32425f" strokeWidth="2" />}
              <circle cx={x} cy={40} r={10} fill="#13233f" stroke="#4f6388" />
              <text x={x} y={65} textAnchor="middle" fill="#c7d2fe" fontSize="10">{i + 1}</text>
            </g>
          );
        })}
      </svg>
      <div className="flex gap-2">
        <Button onClick={addStep}>Add Step</Button>
        <Button onClick={exportSequence}>Export Sequence JSON</Button>
      </div>
    </div>
  );
}
