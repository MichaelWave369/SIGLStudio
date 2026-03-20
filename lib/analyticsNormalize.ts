import type { AnalyticsSummary } from "@/lib/types";
import { normalizeVibeProof } from "@/lib/vibeProofNormalize";
import { normalizeVibeReport } from "@/lib/vibeReportNormalize";

export function buildAnalyticsSummary(input: { source: string; proof: unknown; report: unknown; bridge_score?: number }): AnalyticsSummary {
  const proof = normalizeVibeProof(input.proof);
  const report = normalizeVibeReport(input.report);

  return {
    source: input.source,
    obligations_by_type: proof.obligations_by_type,
    obligations_by_status: proof.obligations_by_status,
    issue_by_severity: {
      critical: report.summary.valid === false ? 1 : 0,
      warning: report.summary.warning_count,
      issue: report.summary.issue_count
    },
    graph_metrics: report.graph_summary,
    bridge_score: input.bridge_score,
    analytics_shape_version: "0.7"
  };
}
