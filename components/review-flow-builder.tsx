"use client";

import { useState } from "react";
import { createReviewFlow, sortReviewSections } from "@/lib/reviewFlow";
import { getReviewFlows, saveReviewFlows } from "@/lib/reviewFlowStorage";
import { ReviewDecisionPanel } from "@/components/review-decision-panel";
import { downloadTextFile } from "@/lib/utils";

export function ReviewFlowBuilder() {
  const [, setRefresh] = useState(0);
  const flows = getReviewFlows();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = flows.find((f) => f.id === selectedId) ?? flows[0] ?? null;

  if (!selected) {
    return (
      <div className="panel">
        <button className="rounded border border-line px-3 py-1 text-sm" onClick={() => {
          const flow = createReviewFlow({ title: "Review Flow 1" });
          saveReviewFlows([flow]);
          setSelectedId(flow.id);
          setRefresh((v) => v + 1);
        }}>Create Review Flow</button>
      </div>
    );
  }

  const persist = (next: typeof selected) => {
    saveReviewFlows(flows.map((flow) => (flow.id === next.id ? { ...next, updated_at: new Date().toISOString() } : flow)));
    setRefresh((v) => v + 1);
  };

  return (
    <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
      <div className="panel space-y-2 text-sm">
        <div className="flex gap-2">
          <select value={selected.id} onChange={(e) => setSelectedId(e.target.value)} className="rounded border border-line bg-slate-950/50 p-2">
            {flows.map((flow) => <option key={flow.id} value={flow.id}>{flow.title}</option>)}
          </select>
          <button className="rounded border border-line px-2 py-1" onClick={() => downloadTextFile(`${selected.title}.review-flow.json`, JSON.stringify(selected, null, 2))}>Export</button>
        </div>
        <input value={selected.title} onChange={(e) => persist({ ...selected, title: e.target.value })} className="w-full rounded border border-line bg-slate-950/50 p-2" />
        {sortReviewSections(selected.sections).map((section) => (
          <div key={section.id} className="rounded border border-line p-2">
            <p className="text-xs text-muted">{section.title}</p>
            <textarea value={section.content} onChange={(e) => persist({ ...selected, sections: selected.sections.map((s) => (s.id === section.id ? { ...s, content: e.target.value } : s)) })} className="mt-1 w-full rounded border border-line bg-slate-950/50 p-2" />
          </div>
        ))}
      </div>
      <ReviewDecisionPanel flow={selected} onChange={persist} />
    </div>
  );
}
