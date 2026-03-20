import type { CompositionPipelineManifest } from "@/lib/types";
import { buildPipelineManifest } from "@/lib/pipelineManifests";

export function createPipelinePreview(input: {
  source_type: CompositionPipelineManifest["source_type"];
  source_id: string;
  target_type: CompositionPipelineManifest["target_type"];
  selected_ids: string[];
  theme_id: string;
}) {
  return buildPipelineManifest({
    source_type: input.source_type,
    source_id: input.source_id,
    target_type: input.target_type,
    included_ids: input.selected_ids,
    theme_id: input.theme_id
  });
}

export function summarizePipeline(manifest: CompositionPipelineManifest) {
  return {
    title: `${manifest.source_type} → ${manifest.target_type}`,
    included_count: manifest.included_ids.length,
    hash: manifest.source_hash
  };
}
