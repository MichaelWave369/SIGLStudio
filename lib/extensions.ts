import type { ExtensionEntry } from "@/lib/types";
import { isExtensionEntry, type ExtensionRegistryPayload } from "@/lib/extensionTypes";

const key = "siglstudio-extensions";

export function getExtensions(): ExtensionEntry[] {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem(key) ?? "[]") as ExtensionEntry[];
}

export function saveExtensions(entries: ExtensionEntry[]) {
  localStorage.setItem(key, JSON.stringify(entries));
}

export function validateExtensionRegistry(input: unknown): { valid: boolean; entries: ExtensionEntry[]; errors: string[] } {
  const raw = input as ExtensionRegistryPayload;
  if (!raw || typeof raw !== "object" || !Array.isArray(raw.entries)) {
    return { valid: false, entries: [], errors: ["Invalid registry shape."] };
  }
  const entries = raw.entries.filter(isExtensionEntry);
  const errors = raw.entries.length === entries.length ? [] : ["Some entries were ignored due to schema mismatch."];
  return { valid: errors.length === 0, entries, errors };
}
