import type { ReviewTemplateDefinition } from "@/lib/types";

const storageKey = "siglstudio-review-templates";

export const builtInReviewTemplates: ReviewTemplateDefinition[] = [
  makeTemplate("symbol-review", "Symbol Review", "Focused symbolic semantics review", ["overview", "important-symbols", "provenance", "decision", "next-actions"]),
  makeTemplate("sequence-review", "Sequence Review", "Temporal sequence interpretation and risks", ["overview", "key-sequences", "validation", "risk", "next-actions"]),
  makeTemplate("diff-review", "Diff Review", "Change analysis and regression guardrail", ["overview", "diffs", "validation", "decision", "next-actions"]),
  makeTemplate("batch-validation", "Batch Validation Review", "Multi-item validation summary", ["overview", "validation", "risk", "decision", "next-actions"]),
  makeTemplate("project-readout", "Project Readout", "Project-level synthesis", ["overview", "important-symbols", "key-sequences", "decision", "next-actions"]),
  makeTemplate("research-critique", "Research Critique", "Evidence and method critique", ["overview", "risk", "provenance", "decision", "next-actions"]),
  makeTemplate("design-review", "Design Review", "Design intent and constraints", ["overview", "important-symbols", "diffs", "decision", "next-actions"]),
  makeTemplate("founder-review", "Founder Review", "Strategic summary for leadership", ["overview", "risk", "decision", "next-actions"]),
  makeTemplate("pre-handoff", "Pre-Handoff Review", "Readiness for handoff", ["overview", "validation", "provenance", "decision", "next-actions"])
];

function makeTemplate(id: string, title: string, description: string, sectionIds: string[]): ReviewTemplateDefinition {
  return {
    id,
    title,
    description,
    sections: sectionIds.map((section, idx) => ({ id: section, title: section.replaceAll("-", " "), content: "", order: idx })),
    suggested_notes_fields: ["author_notes", "reviewer_notes"],
    recommended_artifact_preset: "review-pack",
    recommended_presentation_mode: "analysis-first",
    decision_prompts: ["What is accepted?", "What must change before approval?"],
    next_action_prompts: ["Owner", "Due date", "Validation gate"],
    schema_version: "0.7",
    origin: "built-in"
  };
}

export function getLocalReviewTemplates(): ReviewTemplateDefinition[] {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem(storageKey) ?? "[]") as ReviewTemplateDefinition[];
}

export function saveLocalReviewTemplates(templates: ReviewTemplateDefinition[]) {
  localStorage.setItem(storageKey, JSON.stringify(templates));
}

export function listReviewTemplates() {
  return [...builtInReviewTemplates, ...getLocalReviewTemplates()];
}

export function validateReviewTemplate(input: unknown): input is ReviewTemplateDefinition {
  const raw = input as ReviewTemplateDefinition;
  return Boolean(raw && raw.id && raw.title && Array.isArray(raw.sections) && raw.schema_version);
}
