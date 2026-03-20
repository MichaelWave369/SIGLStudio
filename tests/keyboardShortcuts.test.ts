import { describe, expect, it } from "vitest";
import { glyphForShortcut, insertAtCursor } from "../lib/keyboardShortcuts";

describe("keyboard shortcut helpers", () => {
  it("inserts at cursor with spacing", () => {
    const { next } = insertAtCursor("Φ ∴", "☉", 3, 3);
    expect(next).toContain("☉");
  });

  it("maps alt shortcut to glyph", () => {
    const ev = new KeyboardEvent("keydown", { altKey: true, key: "1" });
    expect(glyphForShortcut(ev)).toBe("Φ");
  });
});
