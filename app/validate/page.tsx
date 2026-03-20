"use client";

import { useEffect, useState } from "react";
import { ValidationPanel } from "@/components/ValidationPanel";
import { sigilExamples } from "@/lib/data/atlas";
import { validateSigil } from "@/lib/vibeAdapter";
import type { ValidationResult } from "@/lib/types";

export default function ValidatePage() {
  const [source, setSource] = useState(sigilExamples.basic);
  const [result, setResult] = useState<ValidationResult | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("siglstudio-current-source");
    if (saved) setSource(saved);
  }, []);

  useEffect(() => {
    void validateSigil(source).then(setResult);
  }, [source]);

  return (
    <main className="space-y-4">
      <div className="panel">
        <h2 className="text-xl font-semibold">Validation Workspace</h2>
        <p className="mt-2 text-sm text-muted">Current source: {source}</p>
      </div>
      <ValidationPanel result={result} />
    </main>
  );
}
