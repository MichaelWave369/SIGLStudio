"use client";

import { useMemo, useState } from "react";
import { ArtifactTemplatePicker } from "@/components/artifact-template-picker";
import { PosterTemplate } from "@/components/poster-template";
import { SymbolCardTemplate } from "@/components/symbol-card-template";
import type { ArtifactType } from "@/lib/types";
import { buildArtifactTemplate } from "@/lib/artifactTemplates";
import { getCurrentSource } from "@/lib/studioStorage";
import { downloadTextFile } from "@/lib/utils";
import { ThemePicker } from "@/components/theme-picker";
import { ArtifactSetBuilder } from "@/components/artifact-set-builder";

export default function ArtifactsPage() {
  const [type, setType] = useState<ArtifactType>("poster");
  const [title, setTitle] = useState("SIGL Artifact");
  const [subtitle, setSubtitle] = useState("Local-first symbolic export");
  const [notes, setNotes] = useState("");
  const [themeId, setThemeId] = useState("observatory");

  const config = useMemo(() => ({ id: crypto.randomUUID(), type, title, subtitle, source: getCurrentSource() || "Φ", notes, metadata: { theme_id: themeId } }), [type, title, subtitle, notes, themeId]);
  const artifact = useMemo(() => buildArtifactTemplate(config), [config]);

  return (
    <main className="space-y-4">
      <div className="panel">
        <h2 className="text-xl font-semibold">Artifact Templates</h2>
        <p className="mt-2 text-sm text-muted">Create poster/card/static exports as deterministic SVG + JSON artifacts and grouped artifact sets.</p>
      </div>
      <ArtifactSetBuilder />
      <div className="panel flex flex-wrap gap-2">
        <ArtifactTemplatePicker value={type} onChange={setType} />
        <input value={title} onChange={(e) => setTitle(e.target.value)} className="rounded border border-line bg-slate-950/50 p-2 text-sm" />
        <input value={subtitle} onChange={(e) => setSubtitle(e.target.value)} className="rounded border border-line bg-slate-950/50 p-2 text-sm" />
        <input value={notes} onChange={(e) => setNotes(e.target.value)} className="rounded border border-line bg-slate-950/50 p-2 text-sm" placeholder="Notes" />
        <ThemePicker value={themeId} onChange={setThemeId} />
        <button className="rounded border border-line px-3 py-1 text-sm" onClick={() => downloadTextFile(`${type}.svg`, artifact.svg)}>Export SVG</button>
        <button className="rounded border border-line px-3 py-1 text-sm" onClick={() => downloadTextFile(`${type}.config.json`, JSON.stringify(artifact, null, 2))}>Export Config JSON</button>
      </div>
      {type === "poster" ? <PosterTemplate config={config} /> : <SymbolCardTemplate config={config} />}
      <div className="panel text-xs text-muted">PNG/PDF export is intentionally deferred in v0.6 for reliability/local-first simplicity.</div>
    </main>
  );
}
