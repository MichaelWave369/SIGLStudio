"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import type { DraftEntry } from "@/lib/types";
import { getDrafts, setDrafts } from "@/lib/studioStorage";
import { createProject, addCurrentDraftToProject } from "@/lib/projectStorage";

interface Props {
  current: string;
  onLoad: (value: string) => void;
  route: string;
}

export function LocalDraftsPanel({ current, onLoad, route }: Props) {
  const [drafts, setLocalDrafts] = useState<DraftEntry[]>([]);

  useEffect(() => {
    setLocalDrafts(getDrafts());
  }, []);

  const persist = (next: DraftEntry[]) => {
    setLocalDrafts(next);
    setDrafts(next);
  };

  const saveDraft = () => {
    const name = `Draft ${drafts.length + 1}`;
    const entry: DraftEntry = { id: crypto.randomUUID(), name, source: current, updatedAt: new Date().toISOString(), route };
    persist([entry, ...drafts].slice(0, 16));
  };

  const renameDraft = (id: string) => {
    const found = drafts.find((d) => d.id === id);
    if (!found) return;
    const name = prompt("Rename draft", found.name);
    if (!name) return;
    persist(drafts.map((d) => (d.id === id ? { ...d, name, updatedAt: new Date().toISOString() } : d)));
  };

  const duplicateDraft = (id: string) => {
    const found = drafts.find((d) => d.id === id);
    if (!found) return;
    persist([{ ...found, id: crypto.randomUUID(), name: `${found.name} Copy`, updatedAt: new Date().toISOString() }, ...drafts]);
  };

  const deleteDraft = (id: string) => {
    persist(drafts.filter((d) => d.id !== id));
  };

  return (
    <div className="panel space-y-2">
      <h3 className="text-lg font-semibold">Local Drafts</h3>
      <div className="flex gap-2">
        <Button onClick={saveDraft}>Save Current Draft</Button>
        <Button onClick={() => { const p = createProject("Draft Project", "Created from drafts"); addCurrentDraftToProject(p.id, "Current Draft"); }}>Create Project from Current</Button>
      </div>
      <div className="space-y-2">
        {drafts.length === 0 ? <p className="text-sm text-muted">No drafts yet.</p> : null}
        {drafts.map((draft) => (
          <div key={draft.id} className="rounded-lg border border-line bg-slate-950/40 p-2 text-xs">
            <button onClick={() => onLoad(draft.source)} className="w-full text-left font-medium hover:text-accent">
              {draft.name}
            </button>
            <p className="text-[11px] text-muted">{new Date(draft.updatedAt).toLocaleString()} · {draft.route}</p>
            <div className="mt-1 flex gap-2">
              <button onClick={() => renameDraft(draft.id)} className="text-muted hover:text-slate-100">Rename</button>
              <button onClick={() => duplicateDraft(draft.id)} className="text-muted hover:text-slate-100">Duplicate</button>
              <button onClick={() => deleteDraft(draft.id)} className="text-rose-300 hover:text-rose-200">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
