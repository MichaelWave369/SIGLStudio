import type { CompositionPipelineManifest } from "@/lib/types";

export function PipelineSummaryCard({ manifest }: { manifest: CompositionPipelineManifest }) {
  return (
    <div className="rounded border border-line bg-slate-950/40 p-3 text-xs">
      <p className="font-semibold">{manifest.source_type} → {manifest.target_type}</p>
      <p className="text-muted">Included: {manifest.included_ids.length}</p>
      <p className="text-muted">Source hash: {manifest.source_hash}</p>
      <p className="text-muted">Theme: {manifest.theme_id}</p>
    </div>
  );
}
