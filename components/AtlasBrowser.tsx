import { atlasGlyphs } from "@/lib/data/atlas";

export function AtlasBrowser({ onLoad }: { onLoad: (example: string) => void }) {
  return (
    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
      {atlasGlyphs.map((glyph) => (
        <button key={glyph.symbol} onClick={() => onLoad(glyph.example)} className="panel text-left transition hover:border-accent/40">
          <div className="flex items-center justify-between">
            <span className="text-2xl">{glyph.symbol}</span>
            <span className="text-xs text-muted">{glyph.category}</span>
          </div>
          <h4 className="mt-2 font-medium">{glyph.name}</h4>
          <p className="mt-1 text-sm text-muted">{glyph.description}</p>
          <p className="mt-3 rounded-md border border-line bg-slate-950/40 p-2 font-mono text-xs">{glyph.example}</p>
        </button>
      ))}
    </div>
  );
}
