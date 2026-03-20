import type { ExtensionPack } from "@/lib/types";

export function ExtensionPackSummary({ pack }: { pack: ExtensionPack | null }) {
  if (!pack) return <p className="text-xs text-muted">No extension pack loaded.</p>;
  return (
    <div className="rounded border border-line p-2 text-xs">
      <p className="font-semibold">{pack.title}</p>
      <p className="text-muted">Schema: {pack.schema_version}</p>
      <p className="text-muted">Entries: {pack.entries.length}</p>
    </div>
  );
}
