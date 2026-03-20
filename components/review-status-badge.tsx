import type { ReviewStatus } from "@/lib/types";

const color: Record<ReviewStatus, string> = {
  draft: "border-slate-500 text-slate-300",
  "in-review": "border-sky-400 text-sky-300",
  approved: "border-emerald-400 text-emerald-300",
  revise: "border-amber-400 text-amber-300",
  archived: "border-zinc-500 text-zinc-400"
};

export function ReviewStatusBadge({ status }: { status: ReviewStatus }) {
  return <span className={`rounded border px-2 py-0.5 text-xs ${color[status]}`}>{status}</span>;
}
