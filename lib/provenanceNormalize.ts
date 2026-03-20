import type { ProvenanceMeta } from "@/lib/types";

export interface EngineProvenanceInput {
  engine_source?: string;
  engine_version?: string;
  proof_report_version?: string;
  issue_counts?: Record<string, number>;
  obligation_counts?: Record<string, number>;
  verification_timestamp?: string;
  source_origin?: string;
  trace_references?: string[];
}

export function normalizeProvenance(meta: ProvenanceMeta, engine?: EngineProvenanceInput) {
  return {
    local: meta,
    engine: {
      engine_source: engine?.engine_source ?? null,
      engine_version: engine?.engine_version ?? null,
      proof_report_version: engine?.proof_report_version ?? null,
      issue_counts: engine?.issue_counts ?? {},
      obligation_counts: engine?.obligation_counts ?? {},
      verification_timestamp: engine?.verification_timestamp ?? null,
      source_origin: engine?.source_origin ?? "local",
      trace_references: engine?.trace_references ?? []
    }
  };
}
