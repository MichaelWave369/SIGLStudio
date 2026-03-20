"use client";

import type { AnalyticsDashboardFilter } from "@/lib/types";

export function AnalyticsFilterPanel({ value, onChange }: { value: AnalyticsDashboardFilter; onChange: (next: AnalyticsDashboardFilter) => void }) {
  return (
    <div className="panel flex flex-wrap gap-2 text-xs">
      <select value={value.source} onChange={(e) => onChange({ ...value, source: e.target.value as AnalyticsDashboardFilter["source"] })} className="rounded border border-line bg-slate-950/50 p-2">
        <option value="all">all</option>
        <option value="board">board</option>
        <option value="review-pack">review-pack</option>
        <option value="review-flow">review-flow</option>
      </select>
      <input type="number" value={value.min_issue_count} onChange={(e) => onChange({ ...value, min_issue_count: Number(e.target.value) })} className="rounded border border-line bg-slate-950/50 p-2" />
    </div>
  );
}
