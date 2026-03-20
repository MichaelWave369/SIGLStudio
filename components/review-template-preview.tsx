import type { ReviewTemplateDefinition } from "@/lib/types";

export function ReviewTemplatePreview({ template }: { template: ReviewTemplateDefinition | null }) {
  if (!template) return null;

  return (
    <div className="rounded border border-line bg-slate-950/40 p-3 text-xs">
      <p className="font-semibold">{template.title}</p>
      <p className="mt-1 text-muted">{template.description}</p>
      <p className="mt-2 text-muted">Sections: {template.sections.map((section) => section.title).join(" • ")}</p>
      <p className="mt-1 text-muted">Artifact preset: {template.recommended_artifact_preset}</p>
      <p className="mt-1 text-muted">Presentation mode: {template.recommended_presentation_mode}</p>
    </div>
  );
}
