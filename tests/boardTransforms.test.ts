import { describe, expect, it } from "vitest";
import { alignBlocksLeft, distributeBlocksHorizontally } from "@/lib/boardTransforms";

const blocks = [
  { id: "a", type: "note", title: "A", content: "", x: 10, y: 0, w: 100, h: 60 },
  { id: "b", type: "note", title: "B", content: "", x: 100, y: 0, w: 100, h: 60 },
  { id: "c", type: "note", title: "C", content: "", x: 250, y: 0, w: 100, h: 60 }
] as const;

describe("boardTransforms", () => {
  it("aligns selected blocks to left-most x", () => {
    const result = alignBlocksLeft([...blocks]);
    expect(new Set(result.map((b) => b.x))).toEqual(new Set([10]));
  });

  it("distributes blocks horizontally", () => {
    const result = distributeBlocksHorizontally([...blocks]);
    expect(result.map((b) => b.x)).toEqual([10, 130, 250]);
  });
});
