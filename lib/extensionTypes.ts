import type { ExtensionEntry } from "@/lib/types";

export interface ExtensionRegistryPayload {
  schema_version: string;
  entries: ExtensionEntry[];
}

export function isExtensionEntry(input: unknown): input is ExtensionEntry {
  const raw = input as ExtensionEntry;
  return Boolean(raw && raw.id && raw.name && raw.kind && raw.schema_version && raw.config && raw.origin);
}
