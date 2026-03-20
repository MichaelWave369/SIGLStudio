export function ObligationSummaryByType({ obligationsByType }: { obligationsByType: Record<string, number> }) {
  const entries = Object.entries(obligationsByType);
  return (
    <div className="rounded border border-line p-2 text-xs">
      <p className="font-semibold">Obligations by type</p>
      {entries.length === 0 ? <p className="text-muted">No obligations detected.</p> : entries.map(([type, count]) => <p key={type}>{type}: {count}</p>)}
    </div>
  );
}
