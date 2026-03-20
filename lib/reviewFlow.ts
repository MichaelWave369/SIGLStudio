import { stableHash } from "@/lib/hash";
import type { ReviewFlow, ReviewFlowSection, ReviewStatus } from "@/lib/types";

export const defaultReviewFlowSections: ReviewFlowSection[] = [
  { id: "overview", title: "Overview", content: "", order: 0 },
  { id: "important-symbols", title: "Important Symbols", content: "", order: 1 },
  { id: "key-sequences", title: "Key Sequences", content: "", order: 2 },
  { id: "diffs", title: "Diffs / Changes", content: "", order: 3 },
  { id: "validation", title: "Validation Summary", content: "", order: 4 },
  { id: "provenance", title: "Provenance Summary", content: "", order: 5 },
  { id: "risk", title: "Risk / Issues Summary", content: "", order: 6 },
  { id: "decision", title: "Decision Notes", content: "", order: 7 },
  { id: "next-actions", title: "Next Actions", content: "", order: 8 }
];

export function createReviewFlow(input: { title: string; source_review_pack_id?: string }): ReviewFlow {
  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    title: input.title,
    source_review_pack_id: input.source_review_pack_id,
    status: "draft",
    author_notes: "",
    reviewer_notes: "",
    decision_notes: "",
    next_actions: [],
    sections: defaultReviewFlowSections,
    created_at: now,
    updated_at: now,
    schema_version: "0.6"
  };
}

export function sortReviewSections(sections: ReviewFlowSection[]): ReviewFlowSection[] {
  return [...sections].sort((a, b) => a.order - b.order || a.id.localeCompare(b.id));
}

export function updateReviewStatus(flow: ReviewFlow, status: ReviewStatus): ReviewFlow {
  return { ...flow, status, updated_at: new Date().toISOString() };
}

export function reviewFlowHash(flow: ReviewFlow) {
  return stableHash(JSON.stringify({ title: flow.title, status: flow.status, sections: sortReviewSections(flow.sections), next_actions: flow.next_actions }));
}
