"use client";

import type { ArtifactType } from "@/lib/types";
import { artifactTypes } from "@/lib/artifactTemplates";

export function ArtifactTemplatePicker({ value, onChange }: { value: ArtifactType; onChange: (v: ArtifactType) => void }) {
  return (
    <select className="rounded border border-line bg-slate-950/50 p-2 text-sm" value={value} onChange={(e) => onChange(e.target.value as ArtifactType)}>
      {artifactTypes.map((type) => (
        <option key={type} value={type}>{type}</option>
      ))}
    </select>
  );
}
