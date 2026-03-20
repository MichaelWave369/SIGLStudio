"use client";

import { useState } from "react";
import { openTextFileFromUser } from "@/lib/fileSystemBridge";
import { detectImportKind, validateImportVersion } from "@/lib/importVersioning";
import { VersionMismatchNotice } from "@/components/version-mismatch-notice";

export function ImportValidationDialog() {
  const [summary, setSummary] = useState<ReturnType<typeof validateImportVersion> | null>(null);

  return (
    <div className="panel space-y-2 text-sm">
      <h3 className="font-semibold">Import Validation</h3>
      <button
        className="rounded border border-line px-3 py-1"
        onClick={async () => {
          const file = await openTextFileFromUser(".json,.siglboard.json,.siglreview.json");
          const parsed = JSON.parse(file.content) as Record<string, unknown>;
          const kind = detectImportKind(file.name, parsed);
          setSummary(validateImportVersion({ kind, schema_version: typeof parsed.schema_version === "string" ? parsed.schema_version : undefined }));
        }}
      >
        Validate Import File
      </button>
      {summary ? (
        <div className="space-y-1 text-xs">
          <p>Kind: {summary.kind}</p>
          <p>Schema: {summary.schema_version}</p>
          {summary.warnings.map((warning) => <VersionMismatchNotice key={warning} warning={warning} />)}
          {summary.errors.map((error) => <p key={error} className="text-rose-300">{error}</p>)}
        </div>
      ) : null}
    </div>
  );
}
