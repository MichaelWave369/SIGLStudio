import { describe, expect, it } from "vitest";
import { detectImportKind, validateImportVersion } from "@/lib/importVersioning";

describe("import versioning", () => {
  it("detects import type", () => {
    expect(detectImportKind("sample.siglboard.json", { blocks: [] })).toBe("board");
  });

  it("warns on newer payloads", () => {
    const summary = validateImportVersion({ kind: "board", schema_version: "1.1" });
    expect(summary.warnings.length).toBeGreaterThan(0);
  });

  it("does not warn for known v1.0 payloads", () => {
    const summary = validateImportVersion({ kind: "board", schema_version: "1.0" });
    expect(summary.warnings).toEqual([]);
  });
});
