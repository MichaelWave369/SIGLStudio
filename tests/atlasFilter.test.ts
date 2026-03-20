import { describe, expect, it } from "vitest";
import { atlasGlyphs } from "../lib/data/atlas";
import { filterAtlasGlyphs } from "../lib/atlasFilter";

describe("atlas filter", () => {
  it("filters by category", () => {
    const onlyOperators = filterAtlasGlyphs(atlasGlyphs, "operator", "");
    expect(onlyOperators.every((glyph) => glyph.category === "operator")).toBe(true);
  });

  it("filters by query", () => {
    const results = filterAtlasGlyphs(atlasGlyphs, "all", "Omega");
    expect(results.length).toBeGreaterThan(0);
  });
});
