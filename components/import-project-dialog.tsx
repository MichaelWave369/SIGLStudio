"use client";

import { useRef } from "react";
import { saveProjects, getProjects } from "@/lib/projectStorage";
import { validateProjectPackPayload } from "@/lib/projectPack";

export function ImportProjectDialog() {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="panel">
      <button className="rounded border border-line px-3 py-1 text-sm" onClick={() => inputRef.current?.click()}>Import Project Pack JSON</button>
      <input
        ref={inputRef}
        type="file"
        accept="application/json"
        className="hidden"
        onChange={async (e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          const text = await file.text();
          const parsed = JSON.parse(text) as unknown;
          const validated = validateProjectPackPayload(parsed);
          if (!validated.valid || !validated.pack) {
            alert(`Import failed: ${validated.reason}`);
            return;
          }
          saveProjects([validated.pack, ...getProjects()]);
          alert("Project imported");
          location.reload();
        }}
      />
    </div>
  );
}
