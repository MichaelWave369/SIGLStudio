import type { Board, BoardBlock } from "@/lib/boardTypes";
import { stableHash } from "@/lib/hash";

const key = "siglstudio-boards";

export function getBoards(): Board[] {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem(key) ?? "[]") as Board[];
}

export function saveBoards(boards: Board[]) {
  localStorage.setItem(key, JSON.stringify(boards));
}

export function createBoard(title: string, description: string): Board {
  const now = new Date().toISOString();
  const board: Board = { id: crypto.randomUUID(), title, description, zoom: 1, created_at: now, updated_at: now, blocks: [] };
  saveBoards([board, ...getBoards()]);
  return board;
}

export function addBlock(board: Board, block: Omit<BoardBlock, "id">): Board {
  return { ...board, blocks: [...board.blocks, { ...block, id: crypto.randomUUID() }], updated_at: new Date().toISOString() };
}

export function boardHash(board: Board): string {
  return stableHash(JSON.stringify({ title: board.title, blocks: board.blocks.map((b) => [b.type, b.content, b.x, b.y, b.w, b.h]) }));
}

export function validateBoardImport(input: unknown): { valid: boolean; reason?: string; board?: Board } {
  const raw = input as Board;
  if (!raw || typeof raw !== "object") return { valid: false, reason: "Not an object." };
  if (!raw.id || !Array.isArray(raw.blocks)) return { valid: false, reason: "Missing board fields." };
  return { valid: true, board: raw };
}
