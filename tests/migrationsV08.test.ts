import { describe, expect, it } from "vitest";
import { migrateLegacyBoard, migrateLegacyExtensionPack } from "@/lib/migrations";

describe("v0.8 migrations", () => {
  it("migrates legacy board to 0.8", () => {
    const migrated = migrateLegacyBoard({ id: "b", blocks: [] });
    expect(migrated.schema_version).toBe("0.8");
  });

  it("migrates extension pack", () => {
    const pack = migrateLegacyExtensionPack({ title: "old", entries: [] });
    expect(pack.schema_version).toBe("0.8");
  });
});
