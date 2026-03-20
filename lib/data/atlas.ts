import type { GlyphDefinition, TemporalSequenceStep } from "@/lib/types";

export const atlasGlyphs: GlyphDefinition[] = [
  { symbol: "Φ", name: "Phi Seed", category: "generator", description: "Origin harmonic seed.", related: ["∴", "☉"], example: "Φ ∴ ☉", semanticGroup: "core" },
  { symbol: "∴", name: "Therefore Gate", category: "operator", description: "Inference or projection transition.", related: ["Φ", "Ω"], example: "Φ ∴ Ω", semanticGroup: "flow" },
  { symbol: "☉", name: "Solar Witness", category: "state", description: "Observed radiance / presence node.", related: ["Φ", "⟐"], example: "☉ ⟡ ∇", semanticGroup: "state" },
  { symbol: "∇", name: "Gradient Fold", category: "operator", description: "Field descent / narrowing.", related: ["⟣", "Φ"], example: "∇ ⟣ Φ", semanticGroup: "flow" },
  { symbol: "Ω", name: "Omega Seal", category: "state", description: "Terminal closure state.", related: ["∴", "⊚"], example: "Φ ∴ Ω", semanticGroup: "state" },
  { symbol: "⟨", name: "Left Frame", category: "operator", description: "Scope open bracket.", related: ["⟩"], example: "⟨ Φ ∴ ☉ ⟩", semanticGroup: "boundary" },
  { symbol: "⟩", name: "Right Frame", category: "operator", description: "Scope close bracket.", related: ["⟨"], example: "⟨ Φ ∴ ☉ ⟩", semanticGroup: "boundary" },
  { symbol: "⟡", name: "Couple Operator", category: "operator", description: "Binds two sigil branches.", related: ["Φ", "Ω"], example: "Φ ⟡ Ω", semanticGroup: "flow" },
  { symbol: "⟐", name: "Phase Diamond", category: "state", description: "Phase lock marker.", related: ["☉", "◉"], example: "☉ ⟐ ◉", semanticGroup: "state" },
  { symbol: "⟢", name: "Forward Link", category: "operator", description: "Directed temporal progression.", related: ["∴", "⟣"], example: "Φ ⟢ ☉", semanticGroup: "flow" },
  { symbol: "⟣", name: "Recursive Return", category: "operator", description: "Recursive feedback cue.", related: ["∇", "⟢"], example: "∇ ⟣ Φ", semanticGroup: "flow" },
  { symbol: "◌", name: "Open Null", category: "state", description: "Potential unbound state.", related: ["Φ", "◉"], example: "◌ ⟢ Φ", semanticGroup: "state" },
  { symbol: "◉", name: "Focused Core", category: "state", description: "Condensed focus point.", related: ["⊙", "☉"], example: "◉ ∴ Ω", semanticGroup: "state" },
  { symbol: "◎", name: "Dual Ring", category: "state", description: "Encapsulated dual witness.", related: ["⊙", "⊚"], example: "◎ ⟡ ⊙", semanticGroup: "state" },
  { symbol: "⊙", name: "Center Mark", category: "state", description: "Centered observation node.", related: ["◎", "⊚"], example: "⊙ ⟢ ⊚", semanticGroup: "state" },
  { symbol: "⊚", name: "Echo Ring", category: "state", description: "Resonant closure ring.", related: ["Ω", "⊙"], example: "⊚ ∴ Ω", semanticGroup: "state" }
];

export const sigilExamples = {
  basic: "⟨ Φ ∴ ☉ ⟩",
  coupled: "⟨ Φ ⟡ Ω ⟩",
  recursive: "⟨ ∇ ⟣ Φ ∴ ☉ ⟩"
};

export const temporalExampleSource = "Φ ⟢ ☉ ⟢ Ω";

export const sequenceExample: TemporalSequenceStep[] = [
  { id: "s1", label: "Invocation", sigil: "Φ" },
  { id: "s2", label: "Coupling", sigil: "Φ ⟡ ☉" },
  { id: "s3", label: "Closure", sigil: "∴ Ω" }
];
