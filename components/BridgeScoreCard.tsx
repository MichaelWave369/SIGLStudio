export function BridgeScoreCard({ score }: { score: number }) {
  const pct = Math.round(score * 100);
  return (
    <div className="rounded-xl border border-line bg-slate-950/40 p-4">
      <p className="text-xs uppercase tracking-wider text-muted">Bridge Score</p>
      <p className="mt-2 text-3xl font-semibold text-accent">{pct}%</p>
    </div>
  );
}
