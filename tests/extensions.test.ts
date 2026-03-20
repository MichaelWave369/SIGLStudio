import { describe, expect, it } from "vitest";
import { validateExtensionRegistry } from "@/lib/extensions";

describe("extensions", () => {
  it("validates extension registry", () => {
    const valid = validateExtensionRegistry({ schema_version: "0.7", entries: [{ id: "1", name: "e", kind: "artifact-preset", origin: "local", schema_version: "0.7", config: {} }] });
    expect(valid.entries.length).toBe(1);
  });

  it("rejects malformed registry", () => {
    expect(validateExtensionRegistry({ bad: true }).valid).toBe(false);
  });
});
