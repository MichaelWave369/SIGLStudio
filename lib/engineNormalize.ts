import type { InspectResult, ValidationObligation, ValidationResult } from "@/lib/types";

function normalizeObligations(input: unknown): ValidationObligation[] {
  if (!Array.isArray(input)) return [];
  return input.map((item, i) => {
    const row = (item ?? {}) as Record<string, unknown>;
    const status = row.status === "pass" || row.status === "warn" || row.status === "fail" ? row.status : "warn";
    return {
      id: String(row.id ?? `obl-${i + 1}`),
      label: String(row.label ?? "Unnamed obligation"),
      status,
      detail: String(row.detail ?? "No detail provided.")
    };
  });
}

export function normalizeValidationResult(input: unknown, fallback: ValidationResult): ValidationResult {
  const raw = (input ?? {}) as Record<string, unknown>;
  if (typeof raw.valid !== "boolean") return fallback;
  return {
    valid: raw.valid,
    bridgeScore: typeof raw.bridgeScore === "number" ? raw.bridgeScore : fallback.bridgeScore,
    issues: Array.isArray(raw.issues) ? raw.issues.map(String) : [],
    warnings: Array.isArray(raw.warnings) ? raw.warnings.map(String) : [],
    obligations: normalizeObligations(raw.obligations),
    mode: raw.mode === "vibe" ? "vibe" : raw.mode === "mock" ? "mock" : fallback.mode,
    modeReason: String(raw.modeReason ?? fallback.modeReason)
  };
}

export function normalizeInspectResult(input: unknown, fallback: InspectResult): InspectResult {
  const raw = (input ?? {}) as Record<string, unknown>;
  const graph = (raw.graph ?? {}) as Record<string, unknown>;
  const parsedSummary = (raw.parsedSummary ?? {}) as Record<string, unknown>;

  return {
    canonical: typeof raw.canonical === "object" && raw.canonical ? (raw.canonical as Record<string, unknown>) : fallback.canonical,
    parsedSummary: {
      inferredForm: String(parsedSummary.inferredForm ?? fallback.parsedSummary.inferredForm),
      tokenCount: typeof parsedSummary.tokenCount === "number" ? parsedSummary.tokenCount : fallback.parsedSummary.tokenCount
    },
    tokenTree: Array.isArray(raw.tokenTree) ? (raw.tokenTree as InspectResult["tokenTree"]) : fallback.tokenTree,
    renderHints: Array.isArray(raw.renderHints) ? raw.renderHints.map(String) : fallback.renderHints,
    obligationsTrace: normalizeObligations(raw.obligationsTrace),
    issues: Array.isArray(raw.issues) ? raw.issues.map(String) : fallback.issues,
    warnings: Array.isArray(raw.warnings) ? raw.warnings.map(String) : fallback.warnings,
    graph: {
      nodes: Array.isArray(graph.nodes) ? (graph.nodes as InspectResult["graph"]["nodes"]) : fallback.graph.nodes,
      edges: Array.isArray(graph.edges) ? (graph.edges as InspectResult["graph"]["edges"]) : fallback.graph.edges
    },
    mode: raw.mode === "vibe" ? "vibe" : "mock",
    modeReason: String(raw.modeReason ?? fallback.modeReason)
  };
}
