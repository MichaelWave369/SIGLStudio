"use client";

import { useEffect, useMemo, useState } from "react";
import { ExportPanel } from "@/components/ExportPanel";
import { buildExportBundle } from "@/lib/exportBundle";
import type { EngineMode, TemporalSequenceStep } from "@/lib/types";
import { getCurrentSource, storageKeys } from "@/lib/studioStorage";
import { validateSigil } from "@/lib/vibeAdapter";

export default function ExportPage() {
  const [source, setSource] = useState("");
  const [engineMode, setEngineMode] = useState<EngineMode>("mock");
  const [obligationCount, setObligationCount] = useState(0);

  useEffect(() => {
    const next = getCurrentSource();
    setSource(next);
    const sequence = JSON.parse(localStorage.getItem(storageKeys.sequence) ?? "[]") as TemporalSequenceStep[];
    void validateSigil(next).then((result) => {
      setEngineMode(result.mode);
      setObligationCount(result.obligations.length);
      localStorage.setItem(storageKeys.sequence, JSON.stringify(sequence));
    });
  }, []);

  const payload = useMemo(() => {
    const sequence = typeof window === "undefined" ? [] : ((JSON.parse(localStorage.getItem(storageKeys.sequence) ?? "[]") as TemporalSequenceStep[]) ?? []);
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='640' height='120'><rect width='100%' height='100%' fill='#0b1020'/><text x='24' y='70' fill='#dcfce7' font-size='28'>${source}</text></svg>`;
    const json = { source, exportedAt: new Date().toISOString(), format: "sigl-studio-v0.2" };
    const bundle = buildExportBundle({
      source,
      svg,
      canonicalJson: json,
      engineMode,
      obligationsCount: obligationCount,
      sequence
    });

    return {
      source,
      json,
      vibeSnippet: `sigil \"studio-export\" {\n  source: \"${source}\"\n}`,
      svg,
      bundle
    };
  }, [source, engineMode, obligationCount]);

  return (
    <main>
      <ExportPanel payload={payload} />
    </main>
  );
}
