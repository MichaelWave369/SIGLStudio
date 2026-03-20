import type { InspectResult, TokenTreeNode, ValidationResult } from "@/lib/types";

function buildTokenTree(tokens: string[]): TokenTreeNode[] {
  return tokens.map((token, i) => ({
    id: `t${i + 1}`,
    label: token,
    children: token === "⟡" ? [{ id: `t${i + 1}-a`, label: "left-branch" }, { id: `t${i + 1}-b`, label: "right-branch" }] : undefined
  }));
}

export function mockValidate(source: string, reason = "Vibe CLI unavailable or disabled; using local mock heuristics."): ValidationResult {
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
    mode: "mock",
    modeReason: reason
  };
}

export function mockInspect(source: string, reason = "Vibe inspect unavailable; showing mock structured inspect data."): InspectResult {
  const symbols = source.split(/\s+/).filter(Boolean);
  const obligations = mockValidate(source).obligations;
  const nodes = symbols.map((symbol, i) => ({ id: `n${i + 1}`, label: symbol, x: 80 + i * 90, y: 80 + (symbol === "⟡" ? -25 : symbol === "⟣" ? 25 : 0) }));
  const edges = nodes.slice(1).map((node, i) => ({ from: nodes[i].id, to: node.id, label: i % 2 === 0 ? "flow" : "link" }));

  return {
    canonical: { source, tokens: symbols, inferredForm: source.includes("⟡") ? "coupled" : source.includes("⟣") ? "recursive" : "linear" },
    parsedSummary: {
      inferredForm: source.includes("⟡") ? "coupled" : source.includes("⟣") ? "recursive" : "linear",
      tokenCount: symbols.length
    },
    tokenTree: buildTokenTree(symbols),
    renderHints: [
      source.includes("⟡") ? "Use paired layout anchor for coupled branches." : "Use linear layout spine.",
      source.includes("⟣") ? "Apply recursive accent ring." : "No recursive cue required."
    ],
    obligationsTrace: obligations,
    issues: source.includes("???") ? ["Unknown token segment found."] : [],
    warnings: source.includes("⟣") ? ["Recursive branch may increase visual density."] : [],
    graph: { nodes, edges },
    mode: "mock",
    modeReason: reason
  };
}
