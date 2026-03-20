"use client";

import { useMemo, useState } from "react";
import { buildAnalyticsSummary } from "@/lib/analyticsNormalize";
import { ObligationBreakdownChart } from "@/components/obligation-breakdown-chart";
import { IssueBreakdownChart } from "@/components/issue-breakdown-chart";

export function AnalyticsSummaryPanel({ source }: { source: string }) {
  const [proofText, setProofText] = useState('{"obligations":[]}');
  const [reportText, setReportText] = useState('{"issues":[],"warnings":[],"graph":{"nodes":[],"edges":[]}}');

  const summary = useMemo(() => {
    const proof = safeParse(proofText);
    const report = safeParse(reportText);
    return buildAnalyticsSummary({ source, proof, report });
  }, [proofText, reportText, source]);

  return (
    <div className="panel space-y-3 text-sm">
      <h3 className="font-semibold">Analytics Summary</h3>
      <div className="grid gap-2 lg:grid-cols-2">
        <textarea value={proofText} onChange={(e) => setProofText(e.target.value)} className="min-h-24 rounded border border-line bg-slate-950/50 p-2 font-mono text-xs" />
        <textarea value={reportText} onChange={(e) => setReportText(e.target.value)} className="min-h-24 rounded border border-line bg-slate-950/50 p-2 font-mono text-xs" />
      </div>
      <div className="grid gap-3 lg:grid-cols-2">
        <ObligationBreakdownChart data={summary.obligations_by_status} />
        <IssueBreakdownChart data={summary.issue_by_severity} />
      </div>
      <p className="text-xs text-muted">Graph metrics: nodes {summary.graph_metrics.node_count} / edges {summary.graph_metrics.edge_count}</p>
    </div>
  );
}

function safeParse(input: string): unknown {
  try {
    return JSON.parse(input);
  } catch {
    return {};
  }
}
