import { describe, expect, it } from "vitest";

describe("checkpoint completion logic", () => {
  it("toggles completion state", () => {
    const checkpoints = [{ id: "c1", label: "x", completed: false }];
    const toggled = checkpoints.map((c) => (c.id === "c1" ? { ...c, completed: !c.completed } : c));
    expect(toggled[0].completed).toBe(true);
  });
});
