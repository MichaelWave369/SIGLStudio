"use client";

import { useState } from "react";
import type { InspectResult } from "@/lib/types";
import { EngineStatusBadge } from "@/components/EngineStatusBadge";
import { TokenTreeView } from "@/components/token-tree-view";
import { GraphNodeTable } from "@/components/graph-node-table";
import { GraphEdgeTable } from "@/components/graph-edge-table";
import { ObligationTracePanel } from "@/components/obligation-trace-panel";
import { IssueList } from "@/components/issue-list";
import { ProvenanceCard } from "@/components/provenance-card";
import { buildProvenance } from "@/lib/provenance";
import { ProvenanceDetailPanel } from "@/components/provenance-detail-panel";

const tabs = ["canonical", "summary", "token-tree", "graph", "obligations", "issues", "hints", "provenance"] as const;

type Tab = (typeof tabs)[number];

export function InspectPaneTabs({ inspect }: { inspect: InspectResult | null }) {
  const [tab, setTab] = useState<Tab>("canonical");

  if (!inspect) return <div className="panel text-sm text-muted">Run inspect to populate panes.</div>;

  return (
    <div className="panel space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-lg font-semibold">Inspect Workspace</h3>
        <EngineStatusBadge mode={inspect.mode} reason={inspect.modeReason} />
      </div>
      <div className="flex flex-wrap gap-2">
        {tabs.map((key) => (
          <button key={key} onClick={() => setTab(key)} className={`rounded-lg border px-3 py-1 text-xs ${tab === key ? "border-accent/50 text-accent" : "border-line text-muted"}`}>
            {key}
          </button>
        ))}
      </div>
      {tab === "canonical" ? <pre className="overflow-auto rounded-lg border border-line bg-slate-950/60 p-3 text-xs">{JSON.stringify(inspect.canonical, null, 2)}</pre> : null}
      {tab === "summary" ? <div className="rounded-lg border border-line bg-slate-950/40 p-3 text-sm">Form: {inspect.parsedSummary.inferredForm} · Tokens: {inspect.parsedSummary.tokenCount}</div> : null}
      {tab === "token-tree" ? <TokenTreeView tree={inspect.tokenTree} /> : null}
      {tab === "graph" ? <div className="grid gap-3 md:grid-cols-2"><GraphNodeTable nodes={inspect.graph.nodes} /><GraphEdgeTable edges={inspect.graph.edges} /></div> : null}
      {tab === "obligations" ? <ObligationTracePanel obligations={inspect.obligationsTrace} /> : null}
      {tab === "issues" ? <IssueList issues={inspect.issues} warnings={inspect.warnings} /> : null}
      {tab === "hints" ? <ul className="space-y-2 text-sm">{inspect.renderHints.map((hint, i) => <li key={i} className="rounded-lg border border-line bg-slate-950/40 p-2">{hint}</li>)}</ul> : null}
      {tab === "provenance" ? <div className="space-y-3"><ProvenanceCard meta={buildProvenance({ engine_mode: inspect.mode, mode_reason: inspect.modeReason, source_hash: String(inspect.canonical.source ?? ""), obligation_count: inspect.obligationsTrace.length, issue_count: inspect.issues.length })} /><ProvenanceDetailPanel local={buildProvenance({ engine_mode: inspect.mode, mode_reason: inspect.modeReason, source_hash: String(inspect.canonical.source ?? ""), obligation_count: inspect.obligationsTrace.length, issue_count: inspect.issues.length })} /></div> : null}
    </div>
  );
}
