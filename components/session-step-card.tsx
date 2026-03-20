import type { SessionStep } from "@/lib/types";
import { CheckpointList } from "@/components/checkpoint-list";

export function SessionStepCard({
  step,
  onNote,
  onToggleCheckpoint
}: {
  step: SessionStep;
  onNote: (value: string) => void;
  onToggleCheckpoint: (id: string) => void;
}) {
  return (
    <div className="rounded-xl border border-line bg-slate-950/40 p-3 space-y-2">
      <p className="text-sm font-semibold">{step.title} <span className="text-xs text-muted">({step.type})</span></p>
      <textarea value={step.note} onChange={(e) => onNote(e.target.value)} className="w-full rounded border border-line bg-transparent p-2 text-xs" />
      <CheckpointList checkpoints={step.checkpoints} onToggle={onToggleCheckpoint} />
    </div>
  );
}
