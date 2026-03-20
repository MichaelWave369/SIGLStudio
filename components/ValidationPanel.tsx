import type { ValidationResult } from "@/lib/types";
import { BridgeScoreCard } from "@/components/BridgeScoreCard";
import { ObligationList } from "@/components/ObligationList";
import { EngineStatusBadge } from "@/components/EngineStatusBadge";

export function ValidationPanel({ result }: { result: ValidationResult | null }) {
  if (!result) return <div className="panel text-sm text-muted">No validation result yet.</div>;

  return (
    <div className="panel space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Validation Report</h3>
        <EngineStatusBadge mode={result.mode} reason={result.modeReason} />
      </div>
      <div className="rounded-xl border border-line bg-slate-950/40 p-3 text-sm">
        Status: <span className={result.valid ? "text-emerald-300" : "text-rose-300"}>{result.valid ? "PASS" : "FAIL"}</span>
      </div>
      <BridgeScoreCard score={result.bridgeScore} />
      <ObligationList obligations={result.obligations} />
      <p className="text-xs text-muted">{result.modeReason}</p>
      <div className="text-sm">
        {result.issues.length > 0 && <p className="text-rose-300">Issues: {result.issues.join(" | ")}</p>}
        {result.warnings.length > 0 && <p className="text-amber-300">Warnings: {result.warnings.join(" | ")}</p>}
      </div>
    </div>
  );
}
