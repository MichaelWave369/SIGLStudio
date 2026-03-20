"use client";

import { useState } from "react";
import type { ExportPayload } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { downloadTextFile } from "@/lib/utils";

export function ExportPanel({ payload }: { payload: ExportPayload }) {
  const [message, setMessage] = useState("");

  const notify = (text: string) => {
    setMessage(text);
    setTimeout(() => setMessage(""), 1800);
  };

  const copy = async (value: string, label: string) => {
    await navigator.clipboard.writeText(value);
    notify(`${label} copied`);
  };

  return (
    <div className="panel space-y-4">
      <h3 className="text-lg font-semibold">Export Center</h3>
      {message ? <div className="rounded-lg border border-accent/30 bg-accent/10 p-2 text-xs text-accent">{message}</div> : null}
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-xl border border-line bg-slate-950/40 p-3">
          <p className="mb-2 text-sm font-medium">Core Exports</p>
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => { downloadTextFile("sigl.json", JSON.stringify(payload.json, null, 2)); notify("JSON exported"); }}>JSON</Button>
            <Button onClick={() => { downloadTextFile("sigl.svg", payload.svg); notify("SVG exported"); }}>SVG</Button>
            <Button onClick={() => { downloadTextFile("sigl.vibe", payload.vibeSnippet); notify(".vibe exported"); }}>.vibe</Button>
            <Button onClick={() => { downloadTextFile("sigl.txt", payload.source); notify("source exported"); }}>Source</Button>
          </div>
        </div>
        <div className="rounded-xl border border-line bg-slate-950/40 p-3">
          <p className="mb-2 text-sm font-medium">Project Bundle</p>
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => { downloadTextFile("sigl.bundle.json", JSON.stringify(payload.bundle, null, 2)); notify("bundle exported"); }}>Export Bundle</Button>
            <Button onClick={() => void copy(payload.source, "Source")}>Copy Source</Button>
            <Button onClick={() => void copy(JSON.stringify(payload.bundle.metadata, null, 2), "Metadata")}>Copy Metadata</Button>
          </div>
        </div>
      </div>
      <pre className="overflow-auto rounded-xl border border-line bg-slate-950/60 p-3 text-xs">{JSON.stringify(payload.bundle.metadata, null, 2)}</pre>
    </div>
  );
}
