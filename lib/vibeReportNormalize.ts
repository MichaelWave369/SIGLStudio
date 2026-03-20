import { asArray, asRecord, asString } from "@/lib/ingestionGuards";

export interface NormalizedReportPayload {
  engine_metadata: {
    engine_version?: string;
    report_version?: string;
    generated_at?: string;
  };
  summary: {
    valid?: boolean;
    issue_count: number;
    warning_count: number;
  };
  graph_summary: {
    node_count: number;
    edge_count: number;
  };
  ingestion_health: { complete: boolean; warnings: string[] };
}

export function normalizeVibeReport(input: unknown): NormalizedReportPayload {
  const raw = asRecord(input);
  const warnings: string[] = [];
  if (!raw) {
    return {
      engine_metadata: {},
      summary: { issue_count: 0, warning_count: 0 },
      graph_summary: { node_count: 0, edge_count: 0 },
      ingestion_health: { complete: false, warnings: ["Report payload is not an object."] }
    };
  }

  const issues = asArray(raw.issues);
  const warningsList = asArray(raw.warnings);
  const graph = asRecord(raw.graph);
  if (!graph) warnings.push("Graph summary missing.");

  return {
    engine_metadata: {
      engine_version: asString(raw.engine_version),
      report_version: asString(raw.report_version),
      generated_at: asString(raw.generated_at)
    },
    summary: {
      valid: typeof raw.valid === "boolean" ? raw.valid : undefined,
      issue_count: issues.length,
      warning_count: warningsList.length
    },
    graph_summary: {
      node_count: asArray(graph?.nodes).length,
      edge_count: asArray(graph?.edges).length
    },
    ingestion_health: { complete: warnings.length === 0, warnings }
  };
}
