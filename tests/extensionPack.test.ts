import { describe, expect, it } from "vitest";
import { validateExtensionPack } from "@/lib/extensionPack";
import { migrateExtensionPack } from "@/lib/extensionPackMigrations";

describe("extension pack", () => {
  it("migrates old shapes", () => {
    const migrated = migrateExtensionPack({ title: "Legacy", entries: [] });
    expect(migrated.schema_version).toBe("0.9");
  });

  it("validates migrated packs", () => {
    const validated = validateExtensionPack({ title: "Pack", entries: [] });
    expect(validated.pack?.schema_version).toBe("0.9");
  });
});
