"use client";

import { sigilExamples } from "@/lib/data/atlas";
import { getDrafts } from "@/lib/studioStorage";
import { getProjects } from "@/lib/projectStorage";

export function DiffSourcePane({
  label,
  source,
  onChange
}: {
  label: string;
  source: string;
  onChange: (source: string) => void;
}) {
  const drafts = typeof window === "undefined" ? [] : getDrafts();
  const projectItems = typeof window === "undefined" ? [] : getProjects().flatMap((p) => p.items);

  return (
    <div className="panel space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">{label}</h3>
        <select className="rounded border border-line bg-slate-950/60 p-1 text-xs" onChange={(e) => {
          const val = e.target.value;
          const examples = sigilExamples as Record<string, string>;
          const fromDraft = drafts.find((d) => d.id === val)?.source;
          const fromProject = projectItems.find((item) => item.id === val)?.source;
          onChange(examples[val] ?? fromDraft ?? fromProject ?? source);
        }}>
          <option value="">Load example</option>
          <option value="basic">Basic</option>
          <option value="coupled">Coupled</option>
          <option value="recursive">Recursive</option>
          {drafts.length > 0 ? <option disabled>─ Drafts ─</option> : null}
          {drafts.map((draft) => <option key={draft.id} value={draft.id}>{draft.name}</option>)}
          {projectItems.length > 0 ? <option disabled>─ Project Items ─</option> : null}
          {projectItems.map((item) => <option key={item.id} value={item.id}>{item.title}</option>)}
        </select>
      </div>
      <textarea value={source} onChange={(e) => onChange(e.target.value)} className="min-h-36 w-full rounded border border-line bg-slate-950/60 p-2 text-sm" />
    </div>
  );
}
