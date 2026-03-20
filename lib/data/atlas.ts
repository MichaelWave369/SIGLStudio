import type { GlyphDefinition, TemporalSequenceStep } from "@/lib/types";

export const atlasGlyphs: GlyphDefinition[] = [
  { symbol: "Φ", name: "Phi Seed", category: "primordial", description: "Origin harmonic seed.", example: "Φ ∴ ☉" },
  { symbol: "∴", name: "Therefore Gate", category: "operator", description: "Inference or projection transition.", example: "Φ ∴ Ω" },
  { symbol: "☉", name: "Solar Witness", category: "state", description: "Observed radiance / presence node.", example: "☉ ⟡ ∇" },
  { symbol: "∇", name: "Gradient Fold", category: "operator", description: "Field descent / narrowing.", example: "∇ ⟣ Φ" },
  { symbol: "Ω", name: "Omega Seal", category: "state", description: "Terminal closure state.", example: "Φ ∴ Ω" },
  { symbol: "⟨ ⟩", name: "Frame Bracket", category: "operator", description: "Symbolic scope framing.", example: "⟨ Φ ∴ ☉ ⟩" },
  { symbol: "⟡", name: "Couple Operator", category: "operator", description: "Binds two sigil branches.", example: "Φ ⟡ Ω" },
  { symbol: "⟐", name: "Phase Diamond", category: "state", description: "Phase lock marker.", example: "☉ ⟐ ◉" },
  { symbol: "⟢", name: "Forward Link", category: "operator", description: "Directed temporal progression.", example: "Φ ⟢ ☉" },
  { symbol: "⟣", name: "Recursive Return", category: "operator", description: "Recursive feedback cue.", example: "∇ ⟣ Φ" },
  { symbol: "◌", name: "Open Null", category: "state", description: "Potential unbound state.", example: "◌ ⟢ Φ" },
  { symbol: "◉", name: "Focused Core", category: "state", description: "Condensed focus point.", example: "◉ ∴ Ω" },
  { symbol: "◎", name: "Dual Ring", category: "state", description: "Encapsulated dual witness.", example: "◎ ⟡ ⊙" },
  { symbol: "⊙", name: "Center Mark", category: "state", description: "Centered observation node.", example: "⊙ ⟢ ⊚" },
  { symbol: "⊚", name: "Echo Ring", category: "state", description: "Resonant closure ring.", example: "⊚ ∴ Ω" }
];

export const sigilExamples = {
  basic: "⟨ Φ ∴ ☉ ⟩",
  coupled: "⟨ Φ ⟡ Ω ⟩",
  recursive: "⟨ ∇ ⟣ Φ ∴ ☉ ⟩"
};

export const sequenceExample: TemporalSequenceStep[] = [
  { id: "s1", label: "Invocation", sigil: "Φ" },
  { id: "s2", label: "Coupling", sigil: "Φ ⟡ ☉" },
  { id: "s3", label: "Closure", sigil: "∴ Ω" }
];
