import { stableHash } from "@/lib/hash";
import type { HandoffPayload } from "@/lib/handoffTypes";

export function createHandoff(input: Omit<HandoffPayload, "version" | "created_at" | "integrity_hash">): HandoffPayload {
  const created_at = new Date().toISOString();
  const integrity_hash = stableHash(JSON.stringify(input.payload));
  return { ...input, version: "0.6", created_at, integrity_hash };
}

export function validateHandoff(input: unknown): { valid: boolean; reason?: string; handoff?: HandoffPayload } {
  const raw = input as HandoffPayload;
  if (!raw || typeof raw !== "object") return { valid: false, reason: "Not an object." };
  if (!raw.handoff_type || !raw.payload || !raw.integrity_hash) return { valid: false, reason: "Missing handoff fields." };
  const hash = stableHash(JSON.stringify(raw.payload));
  if (hash !== raw.integrity_hash) return { valid: false, reason: "Integrity hash mismatch." };
  return { valid: true, handoff: raw };
}
