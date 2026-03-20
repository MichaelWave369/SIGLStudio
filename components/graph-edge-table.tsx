import type { SigilGraphEdge } from "@/lib/types";

export function GraphEdgeTable({ edges }: { edges: SigilGraphEdge[] }) {
  if (!edges.length) return <p className="text-sm text-muted">No graph edges.</p>;
  return (
    <div className="overflow-auto rounded-lg border border-line">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-900/60 text-xs text-muted"><tr><th className="p-2">From</th><th className="p-2">To</th><th className="p-2">Label</th></tr></thead>
        <tbody>
          {edges.map((edge, i) => (
            <tr key={i} className="border-t border-line"><td className="p-2">{edge.from}</td><td className="p-2">{edge.to}</td><td className="p-2">{edge.label ?? "—"}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
