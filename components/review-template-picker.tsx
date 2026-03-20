"use client";

import type { ReviewTemplateDefinition } from "@/lib/types";

export function ReviewTemplatePicker({ templates, value, onChange }: { templates: ReviewTemplateDefinition[]; value: string; onChange: (id: string) => void }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)} className="rounded border border-line bg-slate-950/50 p-2 text-sm">
      {templates.map((template) => <option key={template.id} value={template.id}>{template.title}</option>)}
    </select>
  );
}
