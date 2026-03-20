"use client";

import { useState } from "react";
import { openTextFileFromUser } from "@/lib/fileSystemBridge";
import { validateExtensionPack } from "@/lib/extensionPack";
import { ExtensionPackSummary } from "@/components/extension-pack-summary";

export function ExtensionPackImportDialog() {
  const [errors, setErrors] = useState<string[]>([]);
  const [pack, setPack] = useState<ReturnType<typeof validateExtensionPack>["pack"]>();

  return (
    <div className="panel space-y-2 text-sm">
      <button className="rounded border border-line px-2 py-1 text-xs" onClick={async () => {
        const file = await openTextFileFromUser('.json');
        const parsed = JSON.parse(file.content) as unknown;
        const validated = validateExtensionPack(parsed);
        setPack(validated.pack);
        setErrors(validated.errors);
      }}>Import Extension Pack</button>
      <ExtensionPackSummary pack={pack ?? null} />
      {errors.map((error) => <p key={error} className="text-xs text-rose-300">{error}</p>)}
    </div>
  );
}
