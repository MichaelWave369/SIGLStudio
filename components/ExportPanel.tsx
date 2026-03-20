"use client";

import type { ExportPayload } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { downloadTextFile } from "@/lib/utils";

export function ExportPanel({ payload }: { payload: ExportPayload }) {
  const copy = async () => {
    await navigator.clipboard.writeText(payload.source);
  };

  return (
    <div className="panel space-y-3">
      <h3 className="text-lg font-semibold">Export Center</h3>
      <div className="flex flex-wrap gap-2">
        <Button onClick={() => downloadTextFile("sigl.json", JSON.stringify(payload.json, null, 2))}>Export JSON</Button>
        <Button onClick={() => downloadTextFile("sigl.svg", payload.svg)}>Export SVG</Button>
        <Button onClick={() => downloadTextFile("sigl.vibe", payload.vibeSnippet)}>Export .vibe</Button>
        <Button onClick={() => downloadTextFile("sigl.txt", payload.source)}>Export Text</Button>
        <Button onClick={copy}>Copy Source</Button>
      </div>
      <pre className="overflow-auto rounded-xl border border-line bg-slate-950/60 p-3 text-xs">{JSON.stringify(payload.json, null, 2)}</pre>
    </div>
  );
}
