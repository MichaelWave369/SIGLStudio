import type { EngineMode, ProjectPack, ProjectPackItem } from "@/lib/types";
import { stableHash } from "@/lib/hash";

export function itemHash(item: Omit<ProjectPackItem, "hash">): string {
  return stableHash(JSON.stringify({ type: item.type, title: item.title, source: item.source, labels: item.labels }));
}

export function packHash(items: ProjectPackItem[], meta: { name: string; description: string; version: string }): string {
  return stableHash(JSON.stringify({ meta, items: items.map((i) => i.hash).sort() }));
}

export function createProjectPack(input: {
  name: string;
  description: string;
  version?: string;
  engineMode: EngineMode;
  items?: Omit<ProjectPackItem, "hash">[];
}): ProjectPack {
  const now = new Date().toISOString();
  const version = input.version ?? "0.3.0";
  const items = (input.items ?? []).map((item) => ({ ...item, hash: itemHash(item) }));
  return {
    id: crypto.randomUUID(),
    name: input.name,
    description: input.description,
    created_at: now,
    updated_at: now,
    version,
    engine_mode_last_used: input.engineMode,
    export_version: "0.3",
    pack_hash: packHash(items, { name: input.name, description: input.description, version }),
    items
  };
}

export function validateProjectPackPayload(input: unknown): { valid: boolean; reason?: string; pack?: ProjectPack } {
  const raw = input as ProjectPack;
  if (!raw || typeof raw !== "object") return { valid: false, reason: "Payload is not an object." };
  if (!raw.name || !Array.isArray(raw.items)) return { valid: false, reason: "Missing project name or items." };
  const allHashesValid = raw.items.every((item) => item.hash === itemHash({ id: item.id, type: item.type, title: item.title, source: item.source, labels: item.labels }));
  if (!allHashesValid) return { valid: false, reason: "Item hash mismatch." };
  const recomputedPackHash = packHash(raw.items, { name: raw.name, description: raw.description, version: raw.version });
  if (recomputedPackHash !== raw.pack_hash) return { valid: false, reason: "Pack hash mismatch." };
  return { valid: true, pack: raw };
}
