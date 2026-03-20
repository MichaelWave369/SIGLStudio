import { describe, expect, it } from "vitest";
import { itemHash } from "../lib/projectPack";

describe("draft to project conversion primitives", () => {
  it("hashes draft-derived item deterministically", () => {
    const a = itemHash({ id: "", type: "sigil", title: "Draft", source: "Φ", labels: ["draft"] });
    const b = itemHash({ id: "", type: "sigil", title: "Draft", source: "Φ", labels: ["draft"] });
    expect(a).toBe(b);
  });
});
