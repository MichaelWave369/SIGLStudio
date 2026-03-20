import { describe, expect, it } from "vitest";
import { buildDashboardMetrics, filterAnalyticsSummaries } from "@/lib/analyticsDashboard";

describe("analytics dashboard", () => {
  it("filters sparse data", () => {
    const rows = [{ source: "board", obligations_by_type: {}, obligations_by_status: {}, issue_by_severity: { issue: 0, warning: 0 }, graph_metrics: { node_count: 0, edge_count: 0 }, analytics_shape_version: "0.8" }];
    expect(filterAnalyticsSummaries(rows as any, { source: "all", min_issue_count: 1 }).length).toBe(0);
  });

  it("builds aggregate metrics", () => {
    const metrics = buildDashboardMetrics([{ issue_by_severity: { issue: 2, warning: 1 } } as any]);
    expect(metrics.total_issues).toBe(2);
  });
});
