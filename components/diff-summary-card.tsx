import type { DiffSummary } from "@/lib/types";

export function DiffSummaryCard({ summary }: { summary: DiffSummary }) {
  return (
    <div className="panel space-y-2 text-sm">
      <h3 className="font-semibold">Difference Summary</h3>
      <p>Status: {summary.same ? "Same" : "Different"}</p>
      <p>Glyph delta: {summary.glyphCountDelta}</p>
      <p>Obligation delta: {summary.obligationCountDelta}</p>
      <p>Sequence presence delta: {summary.sequencePresenceDelta ? "Yes" : "No"}</p>
      <p>Source hash equal: {summary.sourceHashEqual ? "Yes" : "No"}</p>
      <div className="flex flex-wrap gap-2">
        {summary.categories.map((category) => (
          <span key={category} className="rounded-full border border-line px-2 py-0.5 text-xs">{category}</span>
        ))}
      </div>
    </div>
  );
}
