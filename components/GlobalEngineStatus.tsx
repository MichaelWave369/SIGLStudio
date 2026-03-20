"use client";

import { useEffect, useState } from "react";
import type { ValidationResult } from "@/lib/types";
import { validateSigil } from "@/lib/vibeAdapter";
import { getCurrentSource } from "@/lib/studioStorage";
import { EngineStatusBadge } from "@/components/EngineStatusBadge";

export function GlobalEngineStatus() {
  const [result, setResult] = useState<ValidationResult | null>(null);

  useEffect(() => {
    const refresh = async () => {
      const source = getCurrentSource() || "Φ";
      setResult(await validateSigil(source));
    };
    void refresh();
    window.addEventListener("studio-source-updated", refresh);
    return () => window.removeEventListener("studio-source-updated", refresh);
  }, []);

  if (!result) return null;
  return <EngineStatusBadge mode={result.mode} reason={result.modeReason} />;
}
