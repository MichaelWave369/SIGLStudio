import type { GlyphDefinition } from "@/lib/types";

export function GlyphDetailPanel({ glyph }: { glyph: GlyphDefinition | null }) {
  if (!glyph) return <div className="panel text-sm text-muted">Select a glyph node.</div>;
  return (
    <div className="panel space-y-2 text-sm">
      <h3 className="text-lg font-semibold">{glyph.symbol} · {glyph.name}</h3>
      <p className="text-muted">{glyph.description}</p>
      <p>Category: {glyph.category}</p>
      <p>Related: {glyph.related.join(", ")}</p>
      <p className="font-mono text-xs">{glyph.example}</p>
    </div>
  );
}
