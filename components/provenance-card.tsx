import type { ProvenanceMeta } from "@/lib/types";
import { HashBadge } from "@/components/hash-badge";
import { EngineReasonBadge } from "@/components/engine-reason-badge";

export function ProvenanceCard({ meta }: { meta: ProvenanceMeta }) {
  return (
    <div className="panel space-y-2 text-xs">
      <h4 className="font-semibold">Provenance</h4>
      <p>Mode: {meta.engine_mode}</p>
      <EngineReasonBadge reason={meta.mode_reason} />
      <div className="flex flex-wrap gap-2">
        <HashBadge value={meta.source_hash} />
        <HashBadge value={meta.item_hash} />
        <HashBadge value={meta.pack_hash} />
      </div>
      <p>Export version: {meta.export_version}</p>
      <p>Created at: {meta.created_at}</p>
      <p>Obligations: {meta.obligation_count} · Issues: {meta.issue_count}</p>
      <p>Shape: {meta.normalized_shape_version}</p>
    </div>
  );
}
