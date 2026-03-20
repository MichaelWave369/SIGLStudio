import type { InspectResult } from "@/lib/types";

export function SigilGraphView({ inspect }: { inspect: InspectResult | null }) {
  if (!inspect) return <div className="panel text-sm text-muted">Run Inspect to view canonical graph.</div>;
  return (
    <div className="panel space-y-3">
      <h3 className="text-lg font-semibold">Canonical Graph</h3>
      <svg viewBox="0 0 900 220" className="h-56 w-full rounded-xl border border-line bg-slate-950/40">
        {inspect.graph.edges.map((e, i) => {
          const from = inspect.graph.nodes.find((n) => n.id === e.from);
          const to = inspect.graph.nodes.find((n) => n.id === e.to);
          if (!from || !to) return null;
          return <line key={i} x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke="#3a4764" strokeWidth="1.5" />;
        })}
        {inspect.graph.nodes.map((n) => (
          <g key={n.id}>
            <circle cx={n.x} cy={n.y} r="18" fill="#131a2a" stroke="#2e3a55" />
            <text x={n.x} y={n.y + 5} textAnchor="middle" fill="#dcfce7" fontSize="16">
              {n.label}
            </text>
          </g>
        ))}
      </svg>
      <pre className="overflow-auto rounded-xl border border-line bg-slate-950/60 p-3 text-xs">{JSON.stringify(inspect.canonical, null, 2)}</pre>
    </div>
  );
}
