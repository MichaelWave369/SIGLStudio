"use client";

import { useMemo } from "react";
import { ExportPanel } from "@/components/ExportPanel";

export default function ExportPage() {
  const source = typeof window !== "undefined" ? (localStorage.getItem("siglstudio-current-source") ?? "") : "";
  const payload = useMemo(() => {
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='640' height='120'><rect width='100%' height='100%' fill='#0b1020'/><text x='24' y='70' fill='#dcfce7' font-size='28'>${source}</text></svg>`;
    return {
      source,
      json: { source, exportedAt: new Date().toISOString(), format: "sigl-studio-v0.1" },
      vibeSnippet: `sigil \"studio-export\" {\n  source: \"${source}\"\n}`,
      svg
    };
  }, [source]);

  return (
    <main>
      <ExportPanel payload={payload} />
    </main>
  );
}
