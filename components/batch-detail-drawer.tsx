import type { BatchItemResult } from "@/lib/types";

export function BatchDetailDrawer({ selected }: { selected: BatchItemResult | null }) {
  if (!selected) return <div className="panel text-sm text-muted">Select a row for detail.</div>;
  return (
    <div className="panel space-y-2 text-sm">
      <h3 className="font-semibold">{selected.item.title}</h3>
      <p className="font-mono text-xs">{selected.item.source}</p>
      <p>Mode: {selected.validation?.mode ?? "-"}</p>
      <p>Bridge: {selected.validation ? Math.round(selected.validation.bridgeScore * 100) : "-"}</p>
      <pre className="overflow-auto rounded border border-line bg-slate-950/50 p-2 text-xs">{JSON.stringify(selected.inspect?.canonical ?? {}, null, 2)}</pre>
    </div>
  );
}
