import type { SigilGraphNode } from "@/lib/types";

export function GraphNodeTable({ nodes }: { nodes: SigilGraphNode[] }) {
  if (!nodes.length) return <p className="text-sm text-muted">No graph nodes.</p>;
  return (
    <div className="overflow-auto rounded-lg border border-line">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-900/60 text-xs text-muted"><tr><th className="p-2">ID</th><th className="p-2">Label</th><th className="p-2">X</th><th className="p-2">Y</th></tr></thead>
        <tbody>
          {nodes.map((node) => (
            <tr key={node.id} className="border-t border-line"><td className="p-2">{node.id}</td><td className="p-2">{node.label}</td><td className="p-2">{node.x}</td><td className="p-2">{node.y}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
