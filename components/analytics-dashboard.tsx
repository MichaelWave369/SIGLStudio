"use client";

import { useMemo, useState } from "react";
import { AnalyticsMetricGrid } from "@/components/analytics-metric-grid";
import { AnalyticsFilterPanel } from "@/components/analytics-filter-panel";
import { buildDashboardMetrics, filterAnalyticsSummaries } from "@/lib/analyticsDashboard";
import { buildAnalyticsSummary } from "@/lib/analyticsNormalize";
import type { AnalyticsDashboardFilter } from "@/lib/types";

export function AnalyticsDashboard() {
  const [filter, setFilter] = useState<AnalyticsDashboardFilter>({ source: "all", min_issue_count: 0 });
  const samples = useMemo(() => [
    buildAnalyticsSummary({ source: "validate", proof: { obligations: [{ type: "bridge", status: "pass" }] }, report: { issues: [1], warnings: [1], graph: { nodes: [1], edges: [1] } } }),
    buildAnalyticsSummary({ source: "review-pack", proof: { obligations: [{ type: "typing", status: "warn" }] }, report: { issues: [], warnings: [1], graph: { nodes: [1, 2], edges: [1] } } })
  ], []);
  const filtered = filterAnalyticsSummaries(samples, filter);
  const metrics = buildDashboardMetrics(filtered);

  return (
    <div className="space-y-3">
      <AnalyticsFilterPanel value={filter} onChange={setFilter} />
      <AnalyticsMetricGrid metrics={metrics} />
      <div className="panel text-xs">Filtered rows: {filtered.length}</div>
    </div>
  );
}
