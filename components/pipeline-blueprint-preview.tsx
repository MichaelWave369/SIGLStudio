import type { PipelineBlueprint } from "@/lib/types";

export function PipelineBlueprintPreview({ blueprint }: { blueprint: PipelineBlueprint | null }) {
  if (!blueprint) return null;
  return (
    <div className="rounded border border-line p-2 text-xs">
      <p className="font-semibold">{blueprint.title}</p>
      <p className="text-muted">Source: {blueprint.source_type}</p>
      <p className="text-muted">Sequence: {blueprint.transformation_sequence.join(" → ")}</p>
      <p className="text-muted">Outputs: {blueprint.outputs.join(", ")}</p>
    </div>
  );
}
