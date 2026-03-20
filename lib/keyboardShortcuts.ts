export interface GlyphShortcut {
  key: string;
  glyph: string;
  label: string;
}

export const glyphShortcuts: GlyphShortcut[] = [
  { key: "1", glyph: "Φ", label: "Phi Seed" },
  { key: "2", glyph: "∴", label: "Therefore Gate" },
  { key: "3", glyph: "☉", label: "Solar Witness" },
  { key: "4", glyph: "∇", label: "Gradient Fold" },
  { key: "5", glyph: "Ω", label: "Omega Seal" },
  { key: "6", glyph: "⟨", label: "Left Frame" },
  { key: "7", glyph: "⟩", label: "Right Frame" },
  { key: "8", glyph: "⟡", label: "Couple" },
  { key: "9", glyph: "⟐", label: "Phase Diamond" },
  { key: "0", glyph: "⟢", label: "Forward Link" },
  { key: "-", glyph: "⟣", label: "Recursive Return" },
  { key: "q", glyph: "◌", label: "Open Null" },
  { key: "w", glyph: "◉", label: "Focused Core" },
  { key: "e", glyph: "◎", label: "Dual Ring" },
  { key: "r", glyph: "⊙", label: "Center Mark" },
  { key: "t", glyph: "⊚", label: "Echo Ring" }
];

export function insertAtCursor(value: string, insert: string, start: number, end: number): { next: string; caret: number } {
  const before = value.slice(0, start);
  const after = value.slice(end);
  const spacerBefore = before.endsWith(" ") || before.length === 0 ? "" : " ";
  const spacerAfter = after.startsWith(" ") || after.length === 0 ? "" : " ";
  const chunk = `${spacerBefore}${insert}${spacerAfter}`;
  const next = `${before}${chunk}${after}`;
  return { next, caret: before.length + chunk.length };
}

export function glyphForShortcut(event: KeyboardEvent): string | null {
  if (!event.altKey || event.metaKey || event.ctrlKey) return null;
  const match = glyphShortcuts.find((item) => item.key === event.key.toLowerCase());
  return match?.glyph ?? null;
}
