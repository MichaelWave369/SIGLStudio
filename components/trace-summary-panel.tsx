import type { ValidationResult } from "@/lib/types";

export function TraceSummaryPanel({ validation }: { validation: ValidationResult | null }) {
  if (!validation) return <div className="panel text-xs text-muted">No trace summary available.</div>;
  return (
    <div className="panel text-xs">
      <h4 className="mb-2 font-semibold">Trace Summary</h4>
      <p>Valid: {validation.valid ? "yes" : "no"}</p>
      <p>Bridge score: {Math.round(validation.bridgeScore * 100)}%</p>
      <p>Obligations: {validation.obligations.length}</p>
      <p>Issues: {validation.issues.length}</p>
      <p>Warnings: {validation.warnings.length}</p>
    </div>
  );
}
