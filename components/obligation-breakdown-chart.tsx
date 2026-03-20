export function ObligationBreakdownChart({ data }: { data: Record<string, number> }) {
  const total = Object.values(data).reduce((a, b) => a + b, 0) || 1;
  return (
    <div className="space-y-1 text-xs">
      <p className="font-semibold">Obligations by status</p>
      {Object.entries(data).map(([key, value]) => (
        <div key={key}>
          <div className="flex justify-between"><span>{key}</span><span>{value}</span></div>
          <div className="h-2 rounded bg-slate-800"><div className="h-2 rounded bg-teal-400" style={{ width: `${(value / total) * 100}%` }} /></div>
        </div>
      ))}
    </div>
  );
}
