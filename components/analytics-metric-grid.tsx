export function AnalyticsMetricGrid({ metrics }: { metrics: { summary_count: number; total_issues: number; total_warnings: number } }) {
  return (
    <div className="grid gap-2 sm:grid-cols-3">
      <div className="panel text-xs">Summaries: {metrics.summary_count}</div>
      <div className="panel text-xs">Issues: {metrics.total_issues}</div>
      <div className="panel text-xs">Warnings: {metrics.total_warnings}</div>
    </div>
  );
}
