"use client";

import { useState } from "react";
import { ValidationPanel } from "@/components/ValidationPanel";
import { EngineIngestionPanel } from "@/components/engine-ingestion-panel";
import { validateSigil } from "@/lib/vibeAdapter";
import type { ValidationResult } from "@/lib/types";

export default function ValidatePage() {
  const [source, setSource] = useState("Φ → Ψ");
  const [result, setResult] = useState<ValidationResult | null>(null);

  return (
    <main className="space-y-4">
      <div className="panel">
        <h2 className="text-xl font-semibold">Validate</h2>
        <p className="mt-2 text-sm text-muted">Run validation and inspect optional engine-native proof/report ingestion details.</p>
      </div>
      <div className="panel space-y-2">
        <textarea value={source} onChange={(e) => setSource(e.target.value)} className="min-h-24 w-full rounded border border-line bg-slate-950/50 p-2 font-mono text-sm" />
        <button className="rounded border border-line px-3 py-1 text-sm" onClick={async () => setResult(await validateSigil(source))}>Run Validate</button>
      </div>
      <ValidationPanel result={result} />
      <EngineIngestionPanel />
    </main>
  );
}
