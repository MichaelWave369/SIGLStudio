import { stableHash } from "@/lib/hash";
import type { PublishingBundle, PublishingBundleType } from "@/lib/types";

export function createPublishingBundle(input: {
  bundle_type: PublishingBundleType;
  title: string;
  subtitle: string;
  description: string;
  source_context: string;
  included_items: string[];
  theme_id: string;
  provenance_summary: string;
  notes: string;
  next_actions: string[];
}): PublishingBundle {
  const created_at = new Date().toISOString();
  const included_items = [...input.included_items].sort();
  const integrity_hash = stableHash(JSON.stringify({ input, included_items }));
  return {
    id: crypto.randomUUID(),
    ...input,
    included_items,
    integrity_hash,
    created_at,
    export_version: "1.0"
  };
}

export function bundleSummary(bundle: PublishingBundle) {
  return {
    export_version: "1.0",
    created_at: bundle.created_at,
    bundle_type: bundle.bundle_type,
    included_item_count: bundle.included_items.length,
    integrity_hash: bundle.integrity_hash,
    theme_id: bundle.theme_id
  };
}


export function validatePublishingBundle(input: unknown): { valid: boolean; reason?: string } {
  const raw = input as PublishingBundle;
  if (!raw || typeof raw !== "object") return { valid: false, reason: "Not an object." };
  if (!raw.bundle_type || !Array.isArray(raw.included_items) || !raw.integrity_hash) return { valid: false, reason: "Missing bundle fields." };
  if (!raw.title?.trim()) return { valid: false, reason: "Bundle title is required." };
  if (!raw.export_version) return { valid: false, reason: "Bundle export_version is required." };
  if (!raw.created_at) return { valid: false, reason: "Bundle created_at timestamp is required." };
  if (!Array.isArray(raw.next_actions)) return { valid: false, reason: "Bundle next_actions must be an array." };
  return { valid: true };
}
