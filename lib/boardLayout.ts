import type { BoardBlock } from "@/lib/boardTypes";

export function snapToGrid(value: number, grid = 12): number {
  return Math.round(value / grid) * grid;
}

export function placeBlock(block: BoardBlock, x: number, y: number): BoardBlock {
  return { ...block, x: snapToGrid(x), y: snapToGrid(y) };
}
