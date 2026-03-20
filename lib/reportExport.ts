import { stableHash } from "@/lib/hash";
import type { BatchItemResult, DiffSummary, EngineMode, ProjectPack } from "@/lib/types";

export function buildDiffReport(input: { leftHash: string; rightHash: string; engineMode: EngineMode; summary: DiffSummary }) {
  const created_at = new Date().toISOString();
  return {
    export_version: "0.3",
    created_at,
    engine_mode: input.engineMode,
    source_hash: stableHash(`${input.leftHash}:${input.rightHash}`),
    ...input.summary
  };
}

export function buildBatchReport(input: { results: BatchItemResult[]; engineMode: EngineMode }) {
  const created_at = new Date().toISOString();
  const sequence_count = input.results.filter((r) => r.item.sequence).length;
  const passCount = input.results.filter((r) => r.validation?.valid).length;
  return {
    export_version: "0.3",
    created_at,
    engine_mode: input.engineMode,
    item_count: input.results.length,
    sequence_count,
    validation_summary: { pass: passCount, fail: input.results.length - passCount },
    source_hash: stableHash(input.results.map((r) => r.sourceHash).join("|")),
    items: input.results
  };
}

export function buildProjectIntegritySummary(project: ProjectPack) {
  return {
    export_version: "0.3",
    created_at: new Date().toISOString(),
    engine_mode: project.engine_mode_last_used,
    pack_hash: project.pack_hash,
    item_count: project.items.length,
    sequence_count: project.items.filter((i) => i.type === "sequence").length
  };
}
