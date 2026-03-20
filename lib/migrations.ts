import { asRecord } from "@/lib/ingestionGuards";
import type { ExtensionPack } from "@/lib/types";
import { migrateExtensionPack } from "@/lib/extensionPackMigrations";

export function migrateLegacyBoard(input: unknown): Record<string, unknown> {
  const raw = asRecord(input);
  if (!raw) return { schema_version: "0.8", blocks: [] };

  const legacy = { ...raw };
  if (!legacy.schema_version) legacy.schema_version = "0.8";
  if (!Array.isArray(legacy.layers)) {
    legacy.layers = [{ id: "default", title: "Default", visible: true, locked: false }];
  }
  if (!Array.isArray(legacy.connections)) {
    legacy.connections = [];
  }
  return legacy;
}

export function migrateLegacyExtensionPack(input: Partial<ExtensionPack>): ExtensionPack {
  return migrateExtensionPack(input);
}
