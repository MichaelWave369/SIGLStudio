import { stableHash } from "@/lib/hash";

export interface ReviewPack {
  id: string;
  project_id: string;
  title: string;
  notes: string;
  included_items: string[];
  sections: Array<{ id: string; title: string; content: string; order: number }>;
  created_at: string;
  updated_at: string;
  pack_hash: string;
  theme_id: string;
  schema_version: string;
}

export function createReviewPack(input: { project_id: string; title: string; notes: string; included_items: string[]; theme_id?: string }): ReviewPack {
  const now = new Date().toISOString();
  const sections = [
    { id: "overview", title: "Overview", content: "Project summary", order: 0 },
    { id: "key-symbols", title: "Key Symbols", content: "Important symbolic anchors", order: 1 },
    { id: "diffs", title: "Diffs / Changes", content: "Key changes to inspect", order: 2 },
    { id: "validation-summary", title: "Validation Summary", content: "Pass/fail and obligations", order: 3 },
    { id: "provenance", title: "Provenance Summary", content: "Engine/local trace context", order: 4 },
    { id: "risk-issues", title: "Risk / Issues", content: "Open concerns", order: 5 },
    { id: "decision-notes", title: "Decision Notes", content: "Review decisions", order: 6 },
    { id: "next-actions", title: "Next Actions", content: "Recommended follow-up", order: 7 }
  ];
  const pack_hash = stableHash(JSON.stringify({ input, sections }));
  return { id: crypto.randomUUID(), project_id: input.project_id, title: input.title, notes: input.notes, included_items: input.included_items, sections, created_at: now, updated_at: now, pack_hash, theme_id: input.theme_id ?? "observatory", schema_version: "0.6" };
}

export function validateReviewPack(input: unknown): { valid: boolean; reason?: string; pack?: ReviewPack } {
  const raw = input as ReviewPack;
  if (!raw || typeof raw !== "object") return { valid: false, reason: "Not an object." };
  if (!raw.project_id || !Array.isArray(raw.sections)) return { valid: false, reason: "Missing fields." };
  return { valid: true, pack: raw };
}
