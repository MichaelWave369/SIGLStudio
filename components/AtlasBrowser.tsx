"use client";

import { useMemo, useState } from "react";
import { atlasGlyphs } from "@/lib/data/atlas";
import { filterAtlasGlyphs } from "@/lib/atlasFilter";
import type { GlyphCategory, GlyphDefinition } from "@/lib/types";

export function AtlasBrowser({ onLoad }: { onLoad: (example: string, symbol?: string) => void }) {
  const [category, setCategory] = useState<GlyphCategory | "all">("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<GlyphDefinition | null>(null);

  const filtered = useMemo(() => filterAtlasGlyphs(atlasGlyphs, category, query), [category, query]);

  return (
    <div className="space-y-3">
      <div className="panel flex flex-wrap items-center gap-2">
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search glyphs..." className="rounded-lg border border-line bg-slate-950/50 px-3 py-2 text-sm" />
        {(["all", "generator", "operator", "state"] as const).map((item) => (
          <button key={item} onClick={() => setCategory(item)} className={`rounded-lg border px-3 py-1 text-xs ${category === item ? "border-accent/50 text-accent" : "border-line text-muted"}`}>
            {item}
          </button>
        ))}
      </div>
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((glyph) => (
          <button key={glyph.symbol} onClick={() => setSelected(glyph)} className="panel text-left transition hover:border-accent/40">
            <div className="flex items-center justify-between">
              <span className="text-2xl">{glyph.symbol}</span>
              <span className="text-xs text-muted">{glyph.semanticGroup}</span>
            </div>
            <h4 className="mt-2 font-medium">{glyph.name}</h4>
            <p className="mt-1 text-sm text-muted">{glyph.description}</p>
            <p className="mt-3 rounded-md border border-line bg-slate-950/40 p-2 font-mono text-xs">{glyph.example}</p>
          </button>
        ))}
      </div>
      {selected ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={() => setSelected(null)}>
          <div className="panel w-full max-w-lg space-y-3" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{selected.symbol} · {selected.name}</h3>
              <button className="text-sm text-muted" onClick={() => setSelected(null)}>Close</button>
            </div>
            <p className="text-sm text-muted">{selected.description}</p>
            <p className="text-xs">Category: {selected.category} · Group: {selected.semanticGroup}</p>
            <p className="text-xs">Related: {selected.related.join(", ")}</p>
            <p className="rounded-md border border-line bg-slate-950/40 p-2 font-mono text-xs">{selected.example}</p>
            <div className="flex gap-2">
              <button className="rounded-lg border border-line px-3 py-1 text-xs" onClick={() => onLoad(selected.example, selected.symbol)}>Insert Example</button>
              <button className="rounded-lg border border-line px-3 py-1 text-xs" onClick={() => void navigator.clipboard.writeText(selected.symbol)}>Copy Symbol</button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
