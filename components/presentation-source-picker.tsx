import type { PresentationConfig } from "@/lib/types";

export function PresentationSourcePicker({ value, onChange }: { value: PresentationConfig["sourceType"]; onChange: (v: PresentationConfig["sourceType"]) => void }) {
  return (
    <select className="rounded border border-line bg-slate-950/50 p-2 text-sm" value={value} onChange={(e) => onChange(e.target.value as PresentationConfig["sourceType"])}>
      <option value="compose">Compose item</option>
      <option value="sequence">Sequence</option>
      <option value="diff">Diff report</option>
      <option value="batch">Batch report</option>
      <option value="project">Project item</option>
      <option value="session">Session flow</option>
    </select>
  );
}
