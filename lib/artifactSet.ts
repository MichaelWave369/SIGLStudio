import { stableHash } from "@/lib/hash";
import type { ArtifactSetItem, ArtifactSetManifest, ArtifactSetPreset } from "@/lib/types";

const presetToTypes: Record<ArtifactSetPreset, Array<ArtifactSetItem["artifact_type"]>> = {
  "review-pack": ["review-summary-card", "project-overview", "diff-card"],
  "presentation-summary": ["poster", "symbol-card", "sequence-card"],
  "project-overview": ["project-overview", "board-summary-card"],
  "diff-package": ["diff-card", "review-summary-card"],
  "board-snapshot": ["board-summary-card", "poster"]
};

export function buildArtifactSetManifest(input: { preset: ArtifactSetPreset; source_ref: string; theme_id: string }): ArtifactSetManifest {
  const created_at = new Date().toISOString();
  const items: ArtifactSetItem[] = presetToTypes[input.preset].map((artifact_type, idx) => ({
    id: `${artifact_type}-${idx + 1}`,
    artifact_type,
    title: `${artifact_type.replaceAll("-", " ")} ${idx + 1}`,
    source_ref: input.source_ref,
    file_name: `${idx + 1}-${artifact_type}.svg`
  }));

  const manifest_hash = stableHash(JSON.stringify({ preset: input.preset, source_ref: input.source_ref, theme_id: input.theme_id, items }));

  return {
    id: crypto.randomUUID(),
    preset: input.preset,
    theme_id: input.theme_id,
    export_version: "0.6",
    created_at,
    item_count: items.length,
    manifest_hash,
    items
  };
}
