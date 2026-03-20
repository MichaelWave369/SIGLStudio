import { describe, expect, it } from "vitest";
import { themes } from "../lib/themes";
import { getTheme } from "../lib/themeRegistry";

describe("theme registry and metadata", () => {
  it("includes required starter themes", () => {
    expect(themes.map((t) => t.id)).toEqual(expect.arrayContaining(["observatory", "monolith", "lattice", "quiet-paper"]));
  });

  it("falls back to default theme", () => {
    expect(getTheme("missing").id).toBe("observatory");
  });
});
