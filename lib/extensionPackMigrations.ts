import type { ExtensionPack } from "@/lib/types";

export function migrateExtensionPack(input: Partial<ExtensionPack>): ExtensionPack {
  return {
    id: input.id ?? crypto.randomUUID(),
    title: input.title ?? "Migrated Extension Pack",
    schema_version: "0.9",
    created_at: input.created_at ?? new Date().toISOString(),
    entries: Array.isArray(input.entries) ? input.entries : []
  };
}
