export type BoardBlockType = "sigil" | "sequence" | "note" | "provenance" | "diff-summary" | "batch-summary" | "project-item" | "artifact-preview";

export interface BoardBlock {
  id: string;
  type: BoardBlockType;
  title: string;
  content: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface Board {
  id: string;
  title: string;
  description: string;
  zoom: number;
  blocks: BoardBlock[];
  created_at: string;
  updated_at: string;
}
