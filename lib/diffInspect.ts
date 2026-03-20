import type { DiffInspectionSnapshot, DiffSummary } from "@/lib/types";

export function summarizeDiff(left: DiffInspectionSnapshot | null, right: DiffInspectionSnapshot | null): DiffSummary {
  if (!left || !right) {
    return {
      same: false,
      glyphCountDelta: 0,
      obligationCountDelta: 0,
      sequencePresenceDelta: false,
      sourceHashEqual: false,
      categories: ["structure changed"]
    };
  }

  const leftTokens = left.source.split(/\s+/).filter(Boolean).length;
  const rightTokens = right.source.split(/\s+/).filter(Boolean).length;
  const leftOb = left.validation?.obligations.length ?? 0;
  const rightOb = right.validation?.obligations.length ?? 0;

  const categories: DiffSummary["categories"] = [];
  if ((left.inspect?.parsedSummary.inferredForm ?? "") !== (right.inspect?.parsedSummary.inferredForm ?? "")) categories.push("structure changed");
  if (leftOb !== rightOb) categories.push("obligations changed");
  if ((left.inspect?.issues.length ?? 0) !== (right.inspect?.issues.length ?? 0)) categories.push("issues changed");
  if ((left.inspect?.renderHints.join("|") ?? "") !== (right.inspect?.renderHints.join("|") ?? "")) categories.push("render hints changed");
  if (left.source !== right.source && categories.length === 0) categories.push("source changed only");

  return {
    same: left.sourceHash === right.sourceHash && categories.length === 0,
    glyphCountDelta: leftTokens - rightTokens,
    obligationCountDelta: leftOb - rightOb,
    sequencePresenceDelta: left.sequencePresent !== right.sequencePresent,
    sourceHashEqual: left.sourceHash === right.sourceHash,
    categories
  };
}
