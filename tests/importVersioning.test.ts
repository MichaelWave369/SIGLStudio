import { describe, expect, it } from "vitest";
import { detectImportKind, validateImportVersion } from "@/lib/importVersioning";

describe("import versioning", () => {
  it("detects import type", () => {
    expect(detectImportKind("sample.siglboard.json", { blocks: [] })).toBe("board");
  });

  it("warns on newer payloads", () => {
    const summary = validateImportVersion({ kind: "board", schema_version: "0.7" });
    expect(summary.warnings.length).toBeGreaterThan(0);
  });
});
