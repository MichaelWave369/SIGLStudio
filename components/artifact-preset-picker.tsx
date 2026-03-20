import type { ArtifactSetPreset } from "@/lib/types";

const presets: ArtifactSetPreset[] = ["review-pack", "presentation-summary", "project-overview", "diff-package", "board-snapshot"];

export function ArtifactPresetPicker({ value, onChange }: { value: ArtifactSetPreset; onChange: (value: ArtifactSetPreset) => void }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value as ArtifactSetPreset)} className="rounded border border-line bg-slate-950/50 p-2 text-sm">
      {presets.map((preset) => <option key={preset} value={preset}>{preset}</option>)}
    </select>
  );
}
