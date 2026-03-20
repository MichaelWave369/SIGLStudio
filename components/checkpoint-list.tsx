import type { SessionCheckpoint } from "@/lib/types";

export function CheckpointList({ checkpoints, onToggle }: { checkpoints: SessionCheckpoint[]; onToggle: (id: string) => void }) {
  return (
    <div className="space-y-1">
      {checkpoints.map((cp) => (
        <label key={cp.id} className="flex items-center gap-2 text-xs">
          <input type="checkbox" checked={cp.completed} onChange={() => onToggle(cp.id)} />
          {cp.label}
        </label>
      ))}
    </div>
  );
}
