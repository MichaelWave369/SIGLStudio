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
    export_version: "0.9"
  };
}

export function bundleSummary(bundle: PublishingBundle) {
  return {
    export_version: "0.9",
    created_at: bundle.created_at,
    bundle_type: bundle.bundle_type,
    included_item_count: bundle.included_items.length,
    integrity_hash: bundle.integrity_hash,
    theme_id: bundle.theme_id
  };
}
