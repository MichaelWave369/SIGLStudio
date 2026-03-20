import type { PublishingBundle } from "@/lib/types";
import { SectionHeader } from "@/components/section-header";
import { MetadataRow } from "@/components/metadata-row";
import { StatusBadge } from "@/components/status-badge";

export function PublishingBundleSummary({ bundle }: { bundle: PublishingBundle | null }) {
  if (!bundle) return <p className="text-xs text-muted">No bundle preview yet.</p>;
  return (
    <div className="rounded border border-line bg-slate-950/40 p-3 text-xs">
      <SectionHeader title={bundle.title} subtitle={bundle.subtitle} />
      <StatusBadge label={bundle.bundle_type} tone="good" />
      <div className="mt-2 space-y-1">
        <MetadataRow label="Integrity" value={bundle.integrity_hash} />
        <MetadataRow label="Items" value={bundle.included_items.length} />
        <MetadataRow label="Theme" value={bundle.theme_id} />
      </div>
    </div>
  );
}
