import type { DiffInspectionSnapshot } from "@/lib/types";

export function DiffInspectionPane({ snapshot }: { snapshot: DiffInspectionSnapshot | null }) {
  if (!snapshot) return <div className="panel text-sm text-muted">No inspect data yet.</div>;
  return (
    <div className="panel space-y-2 text-sm">
      <p>Engine: {snapshot.validation?.mode ?? "-"}</p>
      <p>Mode reason: {snapshot.validation?.modeReason ?? "-"}</p>
      <p>Form: {snapshot.inspect?.parsedSummary.inferredForm ?? "-"}</p>
      <p>Nodes/Edges: {snapshot.inspect?.graph.nodes.length ?? 0}/{snapshot.inspect?.graph.edges.length ?? 0}</p>
      <p>Obligations: {snapshot.validation?.obligations.length ?? 0}</p>
      <p>Issues/Warnings: {snapshot.validation?.issues.length ?? 0}/{snapshot.validation?.warnings.length ?? 0}</p>
      <p>Render hints: {snapshot.inspect?.renderHints.length ?? 0}</p>
      <p>Hash: {snapshot.sourceHash}</p>
    </div>
  );
}
