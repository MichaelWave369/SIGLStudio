import type { ExtensionPack } from "@/lib/types";
import { migrateExtensionPack } from "@/lib/extensionPackMigrations";

export function validateExtensionPack(input: unknown): { valid: boolean; pack?: ExtensionPack; errors: string[] } {
  const raw = input as Partial<ExtensionPack>;
  if (!raw || typeof raw !== "object") return { valid: false, errors: ["Pack is not an object."] };
  const migrated = migrateExtensionPack(raw);
  const errors: string[] = [];
  if (!migrated.title) errors.push("Missing title");
  return { valid: errors.length === 0, pack: migrated, errors };
}

export function exportExtensionPack(pack: ExtensionPack) {
  return {
    export_version: "0.8",
    extension_pack_version: pack.schema_version,
    created_at: new Date().toISOString(),
    pack
  };
}
