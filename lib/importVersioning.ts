export interface ImportValidationSummary {
  kind: string;
  schema_version: string;
  warnings: string[];
  errors: string[];
}

function parseVersion(version: string): [number, number] {
  const [major, minor] = version.split(".").map((part) => Number(part));
  return [Number.isFinite(major) ? major : 0, Number.isFinite(minor) ? minor : 0];
}

function compareVersions(a: string, b: string): number {
  const [aMajor, aMinor] = parseVersion(a);
  const [bMajor, bMinor] = parseVersion(b);
  if (aMajor !== bMajor) return aMajor - bMajor;
  return aMinor - bMinor;
}

export function detectImportKind(fileName: string, payload: Record<string, unknown>): string {
  const lower = fileName.toLowerCase();
  if (lower.endsWith(".siglboard.json") || payload.blocks) return "board";
  if (lower.endsWith(".siglreview.json") || payload.included_items) return "review-pack";
  if (payload.handoff_type) return "handoff";
  if (payload.items && payload.pack_hash) return "project";
  return "unknown";
}

export function validateImportVersion(input: { kind: string; schema_version?: string }): ImportValidationSummary {
  const schema_version = input.schema_version ?? "0.0";
  const warnings: string[] = [];
  const errors: string[] = [];
  const minSupported = "0.5";
  const maxKnown = "1.0";

  if (compareVersions(schema_version, minSupported) < 0) warnings.push("Payload is older than v0.5; migration may be required.");
  if (compareVersions(schema_version, maxKnown) > 0) warnings.push("Payload version is newer than this app; some fields may be ignored.");
  if (input.kind === "unknown") errors.push("Could not detect import type.");

  return { kind: input.kind, schema_version, warnings, errors };
}
