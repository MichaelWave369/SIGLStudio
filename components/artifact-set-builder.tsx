"use client";

import { useMemo, useState } from "react";
import { buildArtifactSetManifest } from "@/lib/artifactSet";
import type { ArtifactSetPreset } from "@/lib/types";
import { ArtifactPresetPicker } from "@/components/artifact-preset-picker";
import { downloadTextFile } from "@/lib/utils";

export function ArtifactSetBuilder() {
  const [preset, setPreset] = useState<ArtifactSetPreset>("review-pack");
  const [sourceRef, setSourceRef] = useState("compose:current");
  const [themeId, setThemeId] = useState("observatory");
  const manifest = useMemo(() => buildArtifactSetManifest({ preset, source_ref: sourceRef, theme_id: themeId }), [preset, sourceRef, themeId]);

  return (
    <div className="panel space-y-2 text-sm">
      <h3 className="font-semibold">Artifact Set Builder</h3>
      <div className="flex flex-wrap gap-2">
        <ArtifactPresetPicker value={preset} onChange={setPreset} />
        <input value={sourceRef} onChange={(e) => setSourceRef(e.target.value)} className="rounded border border-line bg-slate-950/50 p-2" />
        <input value={themeId} onChange={(e) => setThemeId(e.target.value)} className="rounded border border-line bg-slate-950/50 p-2" />
      </div>
      <p className="text-xs text-muted">Manifest hash: {manifest.manifest_hash}</p>
      <button className="rounded border border-line px-3 py-1" onClick={() => downloadTextFile(`${manifest.id}.artifact-set.json`, JSON.stringify(manifest, null, 2))}>Export Manifest</button>
    </div>
  );
}
