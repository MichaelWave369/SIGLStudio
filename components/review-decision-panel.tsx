"use client";

import type { ReviewFlow, ReviewStatus } from "@/lib/types";
import { ReviewStatusBadge } from "@/components/review-status-badge";

const statuses: ReviewStatus[] = ["draft", "in-review", "approved", "revise", "archived"];

export function ReviewDecisionPanel({ flow, onChange }: { flow: ReviewFlow; onChange: (flow: ReviewFlow) => void }) {
  return (
    <div className="panel space-y-2 text-sm">
      <div className="flex items-center gap-2">
        <p className="font-semibold">Decision</p>
        <ReviewStatusBadge status={flow.status} />
      </div>
      <select value={flow.status} onChange={(e) => onChange({ ...flow, status: e.target.value as ReviewStatus })} className="rounded border border-line bg-slate-950/50 p-2">
        {statuses.map((status) => <option key={status} value={status}>{status}</option>)}
      </select>
      <textarea value={flow.decision_notes} onChange={(e) => onChange({ ...flow, decision_notes: e.target.value })} placeholder="Decision notes" className="w-full rounded border border-line bg-slate-950/50 p-2" />
      <textarea value={flow.reviewer_notes} onChange={(e) => onChange({ ...flow, reviewer_notes: e.target.value })} placeholder="Reviewer notes" className="w-full rounded border border-line bg-slate-950/50 p-2" />
    </div>
  );
}
