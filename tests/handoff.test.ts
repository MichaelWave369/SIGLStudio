import { describe, expect, it } from "vitest";
import { createHandoff, validateHandoff } from "../lib/handoff";

describe("handoff import/export validation", () => {
  it("creates deterministic handoff payload", () => {
    const handoff = createHandoff({ handoff_type: "sigil", source_context: "/compose", payload: { source: "Φ" } });
    expect(handoff.version).toBe("1.0");
    expect(validateHandoff(handoff).valid).toBe(true);
  });

  it("rejects malformed handoff", () => {
    expect(validateHandoff({ bad: true }).valid).toBe(false);
  });
});
