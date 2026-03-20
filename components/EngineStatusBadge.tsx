"use client";

import { useEffect, useState } from "react";
import type { EngineMode } from "@/lib/types";
import { getSettings, storageKeys } from "@/lib/studioStorage";
import { shouldShowEngineStatus } from "@/lib/engineStatus";

export function EngineStatusBadge({ mode, reason }: { mode: EngineMode; reason?: string }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const refresh = () => {
      const settings = getSettings();
      const open = localStorage.getItem(storageKeys.engineStatusOpen) !== "false";
      setVisible(shouldShowEngineStatus(settings, open));
    };
    refresh();
    window.addEventListener("studio-settings-updated", refresh);
    window.addEventListener("studio-engine-visibility", refresh);
    return () => {
      window.removeEventListener("studio-settings-updated", refresh);
      window.removeEventListener("studio-engine-visibility", refresh);
    };
  }, []);

  if (!visible) return null;
  const isMock = mode === "mock";
  return (
    <span title={reason} className={`rounded-full border px-3 py-1 text-xs ${isMock ? "border-amber-400/40 text-amber-300" : "border-emerald-400/40 text-emerald-300"}`}>
      {isMock ? "Mock Engine Mode" : "Vibe Engine Mode"}
    </span>
  );
}
