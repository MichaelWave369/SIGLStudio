import type { PublishingBundle } from "@/lib/types";

export function PublishingBundleSummary({ bundle }: { bundle: PublishingBundle | null }) {
  if (!bundle) return <p className="text-xs text-muted">No bundle preview yet.</p>;
  return (
    <div className="rounded border border-line bg-slate-950/40 p-3 text-xs">
      <p className="font-semibold">{bundle.title}</p>
      <p className="text-muted">Type: {bundle.bundle_type}</p>
      <p className="text-muted">Integrity: {bundle.integrity_hash}</p>
      <p className="text-muted">Items: {bundle.included_items.length}</p>
    </div>
  );
}
