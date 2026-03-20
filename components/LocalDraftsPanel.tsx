"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface Props {
  current: string;
  onLoad: (value: string) => void;
}

const storageKey = "siglstudio-drafts";

export function LocalDraftsPanel({ current, onLoad }: Props) {
  const [drafts, setDrafts] = useState<string[]>([]);

  useEffect(() => {
    const read = () => setDrafts(JSON.parse(localStorage.getItem(storageKey) ?? "[]") as string[]);
    read();
    window.addEventListener("storage", read);
    return () => window.removeEventListener("storage", read);
  }, []);

  const saveDraft = () => {
    const next = [current, ...drafts.filter((d) => d !== current)].slice(0, 8);
    localStorage.setItem(storageKey, JSON.stringify(next));
    setDrafts(next);
  };

  return (
    <div className="panel space-y-2">
      <h3 className="text-lg font-semibold">Local Drafts</h3>
      <Button onClick={saveDraft}>Save Current Draft</Button>
      <div className="space-y-2">
        {drafts.length === 0 ? <p className="text-sm text-muted">No drafts yet.</p> : null}
        {drafts.map((draft, i) => (
          <button key={`${draft}-${i}`} onClick={() => onLoad(draft)} className="block w-full rounded-lg border border-line bg-slate-950/40 p-2 text-left text-xs hover:border-accent/40">
            {draft}
          </button>
        ))}
      </div>
    </div>
  );
}
