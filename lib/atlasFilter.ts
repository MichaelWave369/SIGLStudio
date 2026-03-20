import type { GlyphCategory, GlyphDefinition } from "@/lib/types";

export function filterAtlasGlyphs(glyphs: GlyphDefinition[], category: GlyphCategory | "all", query: string): GlyphDefinition[] {
  const normalized = query.toLowerCase();
  return glyphs.filter((glyph) => {
    const byCategory = category === "all" || glyph.category === category;
    const byQuery =
      glyph.name.toLowerCase().includes(normalized) ||
      glyph.symbol.includes(query) ||
      glyph.description.toLowerCase().includes(normalized) ||
      glyph.related.some((item) => item.includes(query));
    return byCategory && byQuery;
  });
}
