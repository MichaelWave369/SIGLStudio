import { describe, expect, it } from "vitest";
import { validateSessionImport } from "../lib/sessionStorage";

describe("malformed session config import handling", () => {
  it("rejects malformed config", () => {
    expect(validateSessionImport({ nope: true }).valid).toBe(false);
  });
});
