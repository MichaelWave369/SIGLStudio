export type HandoffType = "sigil" | "sequence" | "diff" | "batch" | "project" | "review-pack" | "review-flow" | "board" | "session" | "artifact-set";

export interface HandoffPayload {
  handoff_type: HandoffType;
  version: "0.7";
  created_at: string;
  source_context: string;
  integrity_hash: string;
  notes?: string;
  theme_id?: string;
  schema_version?: string;
  payload: Record<string, unknown>;
}
