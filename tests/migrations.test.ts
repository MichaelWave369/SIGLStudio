import { describe, expect, it } from "vitest";
import { migrateLegacyBoard } from "@/lib/migrations";

describe("migrations", () => {
  it("fills layer and connection defaults", () => {
    const migrated = migrateLegacyBoard({ id: "b", blocks: [] });
    expect(Array.isArray(migrated.layers)).toBe(true);
    expect(Array.isArray(migrated.connections)).toBe(true);
  });
});
