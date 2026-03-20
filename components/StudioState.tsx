"use client";

import { useEffect, useState } from "react";
import { getCurrentSource, setCurrentSource } from "@/lib/studioStorage";

export function useStudioSource(defaultValue: string) {
  const [source, setSourceState] = useState(defaultValue);

  useEffect(() => {
    const persisted = getCurrentSource();
    if (persisted) setSourceState(persisted);
  }, []);

  useEffect(() => {
    const handler = (event: Event) => {
      const custom = event as CustomEvent<string>;
      if (typeof custom.detail === "string") setSourceState(custom.detail);
    };
    window.addEventListener("studio-source-updated", handler);
    return () => window.removeEventListener("studio-source-updated", handler);
  }, []);

  const setSource = (next: string | ((current: string) => string)) => {
    setSourceState((current) => {
      const resolved = typeof next === "function" ? next(current) : next;
      setCurrentSource(resolved);
      return resolved;
    });
  };

  return [source, setSource] as const;
}
