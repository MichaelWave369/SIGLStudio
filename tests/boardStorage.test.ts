import { describe, expect, it } from "vitest";
import { placeBlock, snapToGrid } from "../lib/boardLayout";
import { boardHash, validateBoardImport } from "../lib/boardStorage";

describe("board placement/state serialization", () => {
  it("snaps to grid", () => {
    expect(snapToGrid(25, 10)).toBe(30);
  });

  it("places block with snapping", () => {
    const block = placeBlock({ id: "1", type: "note", title: "N", content: "c", x: 0, y: 0, w: 100, h: 100 }, 13, 17);
    expect(block.x).toBe(12);
    expect(block.y).toBe(12);
  });

  it("validates board import", () => {
    expect(validateBoardImport({}).valid).toBe(false);
  });

  it("hashes board deterministically", () => {
    const board = { id: "b", title: "B", description: "", zoom: 1, created_at: "", updated_at: "", blocks: [] };
    expect(boardHash(board as any)).toBe(boardHash(board as any));
  });
});
