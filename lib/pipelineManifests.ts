import { stableHash } from "@/lib/hash";
import type { CompositionPipelineManifest, PipelineSourceType, PipelineTargetType } from "@/lib/types";

export function buildPipelineManifest(input: {
  source_type: PipelineSourceType;
  source_id: string;
  target_type: PipelineTargetType;
  included_ids: string[];
  theme_id: string;
  source_hash?: string;
  board_hash?: string;
  pack_hash?: string;
}): CompositionPipelineManifest {
  const created_at = new Date().toISOString();
  const included_ids = [...input.included_ids].sort();
  return {
    id: crypto.randomUUID(),
    ...input,
    included_ids,
    created_at,
    export_version: "0.8",
    source_hash: input.source_hash ?? stableHash(`${input.source_type}:${input.source_id}:${included_ids.join("|")}`)
  };
}
