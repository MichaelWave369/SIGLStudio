export type HandoffType = "sigil" | "sequence" | "diff" | "batch" | "project" | "review-pack" | "board" | "session";

export interface HandoffPayload {
  handoff_type: HandoffType;
  version: "0.5";
  created_at: string;
  source_context: string;
  integrity_hash: string;
  notes?: string;
  theme_id?: string;
  payload: Record<string, unknown>;
}
