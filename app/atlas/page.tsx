"use client";

import { AtlasBrowser } from "@/components/AtlasBrowser";

export default function AtlasPage() {
  const load = (example: string) => {
    localStorage.setItem("siglstudio-current-source", example);
    alert("Example loaded into compose source state.");
  };

  return (
    <main className="space-y-4">
      <div className="panel">
        <h2 className="text-xl font-semibold">Core Glyph Atlas</h2>
        <p className="mt-2 text-sm text-muted">Primordial glyphs, operators, and states. Click any card to load its example into the composer.</p>
      </div>
      <AtlasBrowser onLoad={load} />
    </main>
  );
}
