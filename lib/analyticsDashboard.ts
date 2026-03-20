import type { AnalyticsDashboardFilter, AnalyticsSummary } from "@/lib/types";

export function filterAnalyticsSummaries(summaries: AnalyticsSummary[], filter: AnalyticsDashboardFilter) {
  return summaries.filter((summary) => {
    const sourceOk = filter.source === "all" || summary.source === filter.source;
    const issueCount = Object.values(summary.issue_by_severity).reduce((a, b) => a + b, 0);
    return sourceOk && issueCount >= filter.min_issue_count;
  });
}

export function buildDashboardMetrics(summaries: AnalyticsSummary[]) {
  return {
    summary_count: summaries.length,
    total_issues: summaries.reduce((acc, summary) => acc + (summary.issue_by_severity.issue ?? 0), 0),
    total_warnings: summaries.reduce((acc, summary) => acc + (summary.issue_by_severity.warning ?? 0), 0)
  };
}
