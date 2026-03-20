import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";

describe("lint tooling config sanity", () => {
  it("has eslint flat config file", () => {
    expect(existsSync("eslint.config.mjs")).toBe(true);
  });
});
