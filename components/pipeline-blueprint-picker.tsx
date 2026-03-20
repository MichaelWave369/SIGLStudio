import type { PipelineBlueprint } from "@/lib/types";

export function PipelineBlueprintPicker({ blueprints, value, onChange }: { blueprints: PipelineBlueprint[]; value: string; onChange: (id: string) => void }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)} className="rounded border border-line bg-slate-950/50 p-2 text-xs">
      {blueprints.map((bp) => <option key={bp.id} value={bp.id}>{bp.title}</option>)}
    </select>
  );
}
