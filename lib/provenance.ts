import type { ProvenanceMeta } from "@/lib/types";

export function buildProvenance(meta: Partial<ProvenanceMeta> & Pick<ProvenanceMeta, "engine_mode" | "mode_reason">): ProvenanceMeta {
  return {
    engine_mode: meta.engine_mode,
    mode_reason: meta.mode_reason,
    export_version: meta.export_version ?? "0.4",
    created_at: meta.created_at ?? new Date().toISOString(),
    source_hash: meta.source_hash,
    item_hash: meta.item_hash,
    pack_hash: meta.pack_hash,
    obligation_count: meta.obligation_count ?? 0,
    issue_count: meta.issue_count ?? 0,
    normalized_shape_version: meta.normalized_shape_version ?? "siglstudio-local-v1"
  };
}
