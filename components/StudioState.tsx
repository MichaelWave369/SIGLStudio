"use client";

import { useEffect, useState } from "react";

const key = "siglstudio-current-source";

export function useStudioSource(defaultValue: string) {
  const [source, setSource] = useState(defaultValue);

  useEffect(() => {
    const persisted = localStorage.getItem(key);
    if (persisted) setSource(persisted);
  }, []);

  useEffect(() => {
    localStorage.setItem(key, source);
  }, [source]);

  return [source, setSource] as const;
}
