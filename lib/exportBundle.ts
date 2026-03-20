import type { EngineMode, ExportBundle, TemporalSequenceStep } from "@/lib/types";
import { stableHash } from "@/lib/hash";

export function deterministicHash(source: string): string {
  return stableHash(source);
}

export function buildExportBundle(input: {
  source: string;
  svg: string;
  canonicalJson: Record<string, unknown>;
  engineMode: EngineMode;
  obligationsCount?: number;
  sequence?: TemporalSequenceStep[];
  createdAt?: string;
}): ExportBundle {
  const glyphCount = input.source.split(/\s+/).filter(Boolean).length;
  const created_at = input.createdAt ?? new Date().toISOString();
  const vibeSnippet = `sigil \"studio-export\" {\n  source: \"${input.source}\"\n}`;

  return {
    metadata: {
      export_version: "0.3",
      created_at,
      engine_mode: input.engineMode,
      source_hash: deterministicHash(input.source),
      sequence_present: Boolean(input.sequence && input.sequence.length > 0),
      glyph_count: glyphCount,
      obligation_count: input.obligationsCount ?? 0
    },
    files: {
      "sigil.txt": input.source,
      "sigil.vibe": vibeSnippet,
      "sigil.svg": input.svg,
      "sigil.json": {
        ...input.canonicalJson,
        sequence: input.sequence ?? []
      }
    }
  };
}
