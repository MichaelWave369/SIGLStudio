"use client";

import { useState } from "react";
import { getExtensions, saveExtensions, validateExtensionRegistry } from "@/lib/extensions";
import { downloadTextFile } from "@/lib/utils";
import { openTextFileFromUser } from "@/lib/fileSystemBridge";
import { pushRecentFile } from "@/lib/recentFiles";

export function ExtensionRegistryPanel() {
  const [refresh, setRefresh] = useState(0);
  const [errors, setErrors] = useState<string[]>([]);
  const entries = getExtensions();

  return (
    <div className="panel space-y-2 text-sm">
      <h3 className="font-semibold">Local Extensions</h3>
      <div className="flex gap-2">
        <button className="rounded border border-line px-2 py-1 text-xs" onClick={() => {
          saveExtensions([...entries, { id: crypto.randomUUID(), name: `Local Extension ${entries.length + 1}`, kind: "artifact-preset", origin: "local", schema_version: "0.7", config: {} }]);
          setRefresh((v) => v + 1);
        }}>Add Placeholder</button>
        <button className="rounded border border-line px-2 py-1 text-xs" onClick={() => downloadTextFile("extensions.registry.json", JSON.stringify({ schema_version: "0.7", entries }, null, 2))}>Export Registry</button>
        <button className="rounded border border-line px-2 py-1 text-xs" onClick={async () => {
          const file = await openTextFileFromUser('.json');
          pushRecentFile({ id: file.name, name: file.name, kind: 'extension-registry' });
          const parsed = JSON.parse(file.content) as unknown;
          const validated = validateExtensionRegistry(parsed);
          setErrors(validated.errors);
          if (validated.entries.length > 0) saveExtensions(validated.entries);
          setRefresh((v) => v + 1);
        }}>Import Registry</button>
      </div>
      <div className="text-xs text-muted">Entries: {entries.length} · refresh {refresh}</div>
      {entries.map((entry) => <p key={entry.id} className="text-xs">{entry.name} ({entry.kind})</p>)}
      {errors.map((error) => <p key={error} className="text-xs text-rose-300">{error}</p>)}
    </div>
  );
}
