import { atlasGlyphs } from "@/lib/data/atlas";

export function GlyphPicker({ onInsert }: { onInsert: (glyph: string) => void }) {
  return (
    <div className="panel">
      <h3 className="mb-3 text-lg font-semibold">Glyph Picker</h3>
      <div className="grid grid-cols-5 gap-2">
        {atlasGlyphs.map((g) => (
          <button key={g.symbol} onClick={() => onInsert(g.symbol)} className="rounded-lg border border-line bg-slate-900/60 p-2 text-xl hover:border-accent/50">
            {g.symbol}
          </button>
        ))}
      </div>
    </div>
  );
}
