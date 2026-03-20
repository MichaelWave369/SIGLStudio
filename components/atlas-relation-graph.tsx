"use client";

import { useMemo, useState } from "react";
import { atlasGlyphs, atlasRelations } from "@/lib/data/atlas";
import { GlyphDetailPanel } from "@/components/glyph-detail-panel";
import { shapeRelationGraph } from "@/lib/relationGraph";

const centerX = 320;
const centerY = 220;
const radius = 160;

export function AtlasRelationGraph() {
  const [selected, setSelected] = useState<string | null>(null);
  const points = useMemo(
    () => atlasGlyphs.map((glyph, i) => ({ glyph, x: centerX + Math.cos((i / atlasGlyphs.length) * Math.PI * 2) * radius, y: centerY + Math.sin((i / atlasGlyphs.length) * Math.PI * 2) * radius })),
    []
  );

  const graph = shapeRelationGraph(atlasGlyphs, atlasRelations);

  const edges = graph.edges.map((edge) => {
    const from = points.find((p) => p.glyph.symbol === edge.from);
    const to = points.find((p) => p.glyph.symbol === edge.to);
    return { edge, from, to };
  });

  const selectedGlyph = atlasGlyphs.find((glyph) => glyph.symbol === selected) ?? null;

  return (
    <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
      <div className="panel">
        <svg viewBox="0 0 640 460" className="h-[420px] w-full rounded-xl border border-line bg-slate-950/50">
          {edges.map(({ edge, from, to }, idx) => {
            if (!from || !to) return null;
            const active = selected ? edge.from === selected || edge.to === selected : true;
            return <line key={idx} x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke={active ? "#7dd3fc" : "#334155"} strokeWidth="1.5" />;
          })}
          {points.map((p) => (
            <g key={p.glyph.symbol} onClick={() => setSelected(p.glyph.symbol)} className="cursor-pointer">
              <circle cx={p.x} cy={p.y} r="20" fill={selected === p.glyph.symbol ? "#134e4a" : "#172033"} stroke="#475569" />
              <text x={p.x} y={p.y + 5} fill="#e2e8f0" textAnchor="middle" fontSize="16">{p.glyph.symbol}</text>
            </g>
          ))}
        </svg>
      </div>
      <div className="space-y-4">
        <div className="panel text-xs">
          <h4 className="mb-2 font-semibold">Selected Neighborhood</h4>
          <p>{selectedGlyph ? selectedGlyph.related.join(", ") : "Pick a glyph"}</p>
        </div>
        <GlyphDetailPanel glyph={selectedGlyph} />
      </div>
    </div>
  );
}
