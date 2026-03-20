import type { BoardBlock } from "@/lib/boardTypes";

export function alignBlocksLeft(blocks: BoardBlock[]): BoardBlock[] {
  if (blocks.length === 0) return blocks;
  const left = Math.min(...blocks.map((b) => b.x));
  return blocks.map((b) => ({ ...b, x: left }));
}

export function distributeBlocksHorizontally(blocks: BoardBlock[]): BoardBlock[] {
  if (blocks.length < 3) return blocks;
  const sorted = [...blocks].sort((a, b) => a.x - b.x);
  const minX = sorted[0].x;
  const maxX = sorted[sorted.length - 1].x;
  const step = (maxX - minX) / (sorted.length - 1);
  return sorted.map((b, idx) => ({ ...b, x: Math.round(minX + step * idx) }));
}
