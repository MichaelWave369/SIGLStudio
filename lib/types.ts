export type EngineMode = "mock" | "vibe";

export type GlyphCategory = "primordial" | "operator" | "state";

export interface GlyphDefinition {
  symbol: string;
  name: string;
  category: GlyphCategory;
  description: string;
  example: string;
}

export interface SigilGraphNode {
  id: string;
  label: string;
  x: number;
  y: number;
}

export interface SigilGraphEdge {
  from: string;
  to: string;
  label?: string;
}

export interface ValidationObligation {
  id: string;
  label: string;
  status: "pass" | "warn" | "fail";
  detail: string;
}

export interface ValidationResult {
  valid: boolean;
  bridgeScore: number;
  issues: string[];
  warnings: string[];
  obligations: ValidationObligation[];
  mode: EngineMode;
}

export interface InspectResult {
  canonical: Record<string, unknown>;
  graph: {
    nodes: SigilGraphNode[];
    edges: SigilGraphEdge[];
  };
  mode: EngineMode;
}

export interface TemporalSequenceStep {
  id: string;
  label: string;
  sigil: string;
}

export interface ExportPayload {
  source: string;
  json: Record<string, unknown>;
  vibeSnippet: string;
  svg: string;
}
