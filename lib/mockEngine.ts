import type { InspectResult, ValidationResult } from "@/lib/types";

export function mockValidate(source: string): ValidationResult {
  const hasContent = source.trim().length > 0;
  const coupled = source.includes("⟡");
  const recursive = source.includes("⟣");
  const valid = hasContent && !source.includes("???");

  return {
    valid,
    bridgeScore: valid ? (recursive ? 0.92 : coupled ? 0.86 : 0.8) : 0.31,
    issues: valid ? [] : ["Malformed symbolic segment detected."],
    warnings: recursive ? ["Recursive pattern present; verify depth intentionally."] : [],
    obligations: [
      { id: "o1", label: "Scope bounded", status: hasContent ? "pass" : "fail", detail: "Sigil includes at least one bounded symbolic atom." },
      { id: "o2", label: "Bridge threshold", status: valid ? "pass" : "fail", detail: "Bridge score should remain above minimal viability threshold." },
      { id: "o3", label: "Temporal coherence", status: recursive ? "warn" : "pass", detail: "Recursive flows require explicit author intent." }
    ],
    mode: "mock"
  };
}

export function mockInspect(source: string): InspectResult {
  const symbols = source.split(/\s+/).filter(Boolean);
  const nodes = symbols.map((symbol, i) => ({ id: `n${i + 1}`, label: symbol, x: 80 + i * 90, y: 80 + (symbol === "⟡" ? -25 : symbol === "⟣" ? 25 : 0) }));
  const edges = nodes.slice(1).map((node, i) => ({ from: nodes[i].id, to: node.id }));

  return {
    canonical: {
      source,
      tokens: symbols,
      inferredForm: source.includes("⟡") ? "coupled" : source.includes("⟣") ? "recursive" : "linear"
    },
    graph: { nodes, edges },
    mode: "mock"
  };
}
