import { asArray, asRecord, asString } from "@/lib/ingestionGuards";

export interface NormalizedProofPayload {
  engine_metadata: {
    engine_version?: string;
    proof_version?: string;
    source_origin?: string;
    generated_at?: string;
  };
  obligations_by_status: Record<string, number>;
  obligations_by_type: Record<string, number>;
  trace_refs: string[];
  ingestion_health: { complete: boolean; warnings: string[] };
}

export function normalizeVibeProof(input: unknown): NormalizedProofPayload {
  const raw = asRecord(input);
  const warnings: string[] = [];
  if (!raw) {
    return {
      engine_metadata: {},
      obligations_by_status: {},
      obligations_by_type: {},
      trace_refs: [],
      ingestion_health: { complete: false, warnings: ["Proof payload is not an object."] }
    };
  }

  const obligations = asArray(raw.obligations).map((item) => asRecord(item)).filter(Boolean) as Array<Record<string, unknown>>;
  if (obligations.length === 0) warnings.push("No obligations provided in proof payload.");

  const obligations_by_status = obligations.reduce<Record<string, number>>((acc, item) => {
    const status = asString(item.status) ?? "unknown";
    acc[status] = (acc[status] ?? 0) + 1;
    return acc;
  }, {});

  const obligations_by_type = obligations.reduce<Record<string, number>>((acc, item) => {
    const type = asString(item.type) ?? "unknown";
    acc[type] = (acc[type] ?? 0) + 1;
    return acc;
  }, {});

  const trace_refs = asArray(raw.trace_refs).map(asString).filter((v): v is string => Boolean(v));

  return {
    engine_metadata: {
      engine_version: asString(raw.engine_version),
      proof_version: asString(raw.proof_version),
      source_origin: asString(raw.source_origin),
      generated_at: asString(raw.generated_at)
    },
    obligations_by_status,
    obligations_by_type,
    trace_refs,
    ingestion_health: { complete: warnings.length === 0, warnings }
  };
}
