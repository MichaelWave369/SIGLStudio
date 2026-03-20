import { asRecord } from "@/lib/ingestionGuards";

export function migrateLegacyBoard(input: unknown): Record<string, unknown> {
  const raw = asRecord(input);
  if (!raw) return { schema_version: "0.6", blocks: [] };

  const legacy = { ...raw };
  if (!legacy.schema_version) legacy.schema_version = "0.6";
  if (!Array.isArray(legacy.layers)) {
    legacy.layers = [{ id: "default", title: "Default", visible: true, locked: false }];
  }
  if (!Array.isArray(legacy.connections)) {
    legacy.connections = [];
  }
  return legacy;
}
