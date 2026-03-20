import { stableHash } from "@/lib/hash";

export interface ReviewPack {
  id: string;
  project_id: string;
  title: string;
  notes: string;
  included_items: string[];
  sections: Array<{ id: string; title: string; content: string }>;
  created_at: string;
  updated_at: string;
  pack_hash: string;
  theme_id: string;
}

export function createReviewPack(input: { project_id: string; title: string; notes: string; included_items: string[]; theme_id?: string }): ReviewPack {
  const now = new Date().toISOString();
  const sections = [
    { id: "overview", title: "Overview", content: "Project summary" },
    { id: "key-symbols", title: "Key Symbols", content: "Important symbolic anchors" },
    { id: "validation-summary", title: "Validation Summary", content: "Pass/fail and obligations" },
    { id: "provenance", title: "Provenance Summary", content: "Engine/local trace context" },
    { id: "next-actions", title: "Next Actions", content: "Recommended follow-up" }
  ];
  const pack_hash = stableHash(JSON.stringify({ input, sections }));
  return { id: crypto.randomUUID(), project_id: input.project_id, title: input.title, notes: input.notes, included_items: input.included_items, sections, created_at: now, updated_at: now, pack_hash, theme_id: input.theme_id ?? "observatory" };
}

export function validateReviewPack(input: unknown): { valid: boolean; reason?: string; pack?: ReviewPack } {
  const raw = input as ReviewPack;
  if (!raw || typeof raw !== "object") return { valid: false, reason: "Not an object." };
  if (!raw.project_id || !Array.isArray(raw.sections)) return { valid: false, reason: "Missing fields." };
  return { valid: true, pack: raw };
}
