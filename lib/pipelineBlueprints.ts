import type { PipelineBlueprint } from "@/lib/types";
import { buildPipelineManifest } from "@/lib/pipelineManifests";

const key = "siglstudio-pipeline-blueprints";

export const builtInBlueprints: PipelineBlueprint[] = [
  { id: "board-review", title: "Board Review Blueprint", source_type: "board", transformation_sequence: ["select", "review-pack", "artifact-set"], outputs: ["review-pack", "artifact-set"], theme_default: "observatory", schema_version: "1.0", origin: "built-in" },
  { id: "project-readout", title: "Project Readout Blueprint", source_type: "project", transformation_sequence: ["review-pack", "presentation"], outputs: ["review-pack", "presentation"], theme_default: "observatory", schema_version: "1.0", origin: "built-in" },
  { id: "diff-investigation", title: "Diff Investigation Blueprint", source_type: "diff", transformation_sequence: ["review-pack", "handoff"], outputs: ["review-pack", "handoff"], theme_default: "monolith", schema_version: "1.0", origin: "built-in" }
];

export function getLocalBlueprints(): PipelineBlueprint[] {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem(key) ?? "[]") as PipelineBlueprint[];
}

export function saveLocalBlueprints(blueprints: PipelineBlueprint[]) {
  localStorage.setItem(key, JSON.stringify(blueprints));
}

export function listBlueprints() {
  return [...builtInBlueprints, ...getLocalBlueprints()];
}

export function instantiateBlueprint(input: { blueprint: PipelineBlueprint; source_id: string; included_ids: string[] }) {
  const target_type = input.blueprint.outputs[0] ?? "artifact-set";
  return buildPipelineManifest({
    source_type: input.blueprint.source_type,
    source_id: input.source_id,
    target_type,
    included_ids: input.included_ids,
    theme_id: input.blueprint.theme_default
  });
}


export function validatePipelineBlueprint(input: unknown): input is PipelineBlueprint {
  const raw = input as PipelineBlueprint;
  return Boolean(raw && raw.id && raw.source_type && Array.isArray(raw.outputs) && raw.schema_version);
}
