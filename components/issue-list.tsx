export function IssueList({ issues, warnings }: { issues: string[]; warnings: string[] }) {
  if (!issues.length && !warnings.length) return <p className="text-sm text-muted">No issues or warnings.</p>;
  return (
    <div className="space-y-2 text-sm">
      {issues.map((issue, i) => (
        <div key={`i-${i}`} className="rounded-lg border border-rose-400/30 bg-rose-950/20 p-2 text-rose-200">{issue}</div>
      ))}
      {warnings.map((warning, i) => (
        <div key={`w-${i}`} className="rounded-lg border border-amber-400/30 bg-amber-950/20 p-2 text-amber-200">{warning}</div>
      ))}
    </div>
  );
}
