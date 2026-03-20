"use client";

import { useState } from "react";
import { ValidationPanel } from "@/components/ValidationPanel";
import { EngineIngestionPanel } from "@/components/engine-ingestion-panel";
import { AnalyticsSummaryPanel } from "@/components/analytics-summary-panel";
import { validateSigil } from "@/lib/vibeAdapter";
import type { ValidationResult } from "@/lib/types";
import { PageIntro } from "@/components/page-intro";

export default function ValidatePage() {
  const [source, setSource] = useState("Φ → Ψ");
  const [result, setResult] = useState<ValidationResult | null>(null);

  return (
    <main className="space-y-4">
      <PageIntro title="Validate" description="Run validation and inspect optional engine-native proof/report ingestion details." cta="Next: open Diff for comparisons or publish a bundle after review-pack prep." />
      <div className="panel space-y-2">
        <textarea value={source} onChange={(e) => setSource(e.target.value)} className="min-h-24 w-full rounded border border-line bg-slate-950/50 p-2 font-mono text-sm" />
        <button className="rounded border border-line px-3 py-1 text-sm" onClick={async () => setResult(await validateSigil(source))}>Run Validate</button>
      </div>
      <ValidationPanel result={result} />
      <EngineIngestionPanel />
      <AnalyticsSummaryPanel source="validate" />
    </main>
  );
}
