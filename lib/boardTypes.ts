import type { BoardConnection, BoardLayer } from "@/lib/types";

export type BoardBlockType =
  | "sigil"
  | "sequence"
  | "note"
  | "provenance"
  | "diff-summary"
  | "batch-summary"
  | "project-item"
  | "artifact-preview"
  | "review-notes"
  | "session-step";

export interface BoardBlock {
  id: string;
  type: BoardBlockType;
  title: string;
  content: string;
  x: number;
  y: number;
  w: number;
  h: number;
  layer_id?: string;
  locked?: boolean;
  group_id?: string;
}

export interface Board {
  id: string;
  title: string;
  description: string;
  zoom: number;
  blocks: BoardBlock[];
  layers: BoardLayer[];
  connections: BoardConnection[];
  schema_version: string;
  created_at: string;
  updated_at: string;
}
