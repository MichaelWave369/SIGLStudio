"use client";

import { useMemo, useState } from "react";
import { normalizeVibeProof } from "@/lib/vibeProofNormalize";
import { normalizeVibeReport } from "@/lib/vibeReportNormalize";
import { ObligationSummaryByType } from "@/components/obligation-summary-by-type";

export function EngineIngestionPanel() {
  const [proofText, setProofText] = useState("{}");
  const [reportText, setReportText] = useState("{}");

  const proof = useMemo(() => {
    try {
      return normalizeVibeProof(JSON.parse(proofText));
    } catch {
      return normalizeVibeProof(null);
    }
  }, [proofText]);

  const report = useMemo(() => {
    try {
      return normalizeVibeReport(JSON.parse(reportText));
    } catch {
      return normalizeVibeReport(null);
    }
  }, [reportText]);

  return (
    <div className="panel space-y-3 text-sm">
      <h3 className="font-semibold">Engine Ingestion Health</h3>
      <div className="grid gap-3 lg:grid-cols-2">
        <textarea value={proofText} onChange={(e) => setProofText(e.target.value)} className="min-h-32 rounded border border-line bg-slate-950/50 p-2 font-mono text-xs" />
        <textarea value={reportText} onChange={(e) => setReportText(e.target.value)} className="min-h-32 rounded border border-line bg-slate-950/50 p-2 font-mono text-xs" />
      </div>
      <p className="text-xs text-muted">Proof warnings: {proof.ingestion_health.warnings.join("; ") || "none"}</p>
      <p className="text-xs text-muted">Report warnings: {report.ingestion_health.warnings.join("; ") || "none"}</p>
      <ObligationSummaryByType obligationsByType={proof.obligations_by_type} />
    </div>
  );
}
