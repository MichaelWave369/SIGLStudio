"use client";

import { useState } from "react";
import { getProjects } from "@/lib/projectStorage";
import { createReviewPack, type ReviewPack } from "@/lib/reviewPack";
import { getReviewPacks, saveReviewPacks } from "@/lib/reviewPackStorage";
import { ReviewPackSectionEditor } from "@/components/review-pack-section-editor";
import { ReviewPackSummary } from "@/components/review-pack-summary";
import { ThemePicker } from "@/components/theme-picker";
import { downloadTextFile } from "@/lib/utils";

export function ReviewPackBuilder() {
  const projects = getProjects();
  const [, setPacksRefresh] = useState(0);
  const packs = getReviewPacks();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = packs.find((p) => p.id === selectedId) ?? packs[0] ?? null;

  if (projects.length === 0) return <div className="panel text-sm text-muted">No projects available. Create one in Projects first.</div>;

  if (!selected) {
    return (
      <div className="panel">
        <button className="rounded border border-line px-3 py-1 text-sm" onClick={() => { const p = projects[0]; const pack = createReviewPack({ project_id: p.id, title: `${p.name} Review`, notes: "", included_items: p.items.map((i) => i.id) }); saveReviewPacks([pack, ...packs]); setSelectedId(pack.id); setPacksRefresh((v) => v + 1); }}>Create Review Pack</button>
      </div>
    );
  }

  const persist = (next: ReviewPack) => {
    saveReviewPacks(packs.map((p) => (p.id === next.id ? next : p)));
    setPacksRefresh((v) => v + 1);
    setSelectedId(next.id);
  };

  return (
    <div className="space-y-4">
      <div className="panel flex flex-wrap items-center gap-2 text-sm">
        <select value={selected.id} onChange={(e) => setSelectedId(e.target.value)} className="rounded border border-line bg-slate-950/50 p-2">
          {packs.map((p) => <option key={p.id} value={p.id}>{p.title}</option>)}
        </select>
        <ThemePicker value={selected.theme_id} onChange={(theme_id) => persist({ ...selected, theme_id })} />
        <button className="rounded border border-line px-3 py-1" onClick={() => downloadTextFile(`${selected.title}.siglreview.json`, JSON.stringify(selected, null, 2))}>Export Pack Config</button>
        <button className="rounded border border-line px-3 py-1" onClick={() => downloadTextFile(`${selected.title}.review-summary.json`, JSON.stringify({ export_version: "0.5", created_at: new Date().toISOString(), included_item_count: selected.included_items.length, theme_id: selected.theme_id, pack_hash: selected.pack_hash }, null, 2))}>Export Review Summary</button>
      </div>
      <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
        <ReviewPackSectionEditor pack={selected} onChange={persist} />
        <ReviewPackSummary pack={selected} />
      </div>
    </div>
  );
}
