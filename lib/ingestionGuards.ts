export function asRecord(input: unknown): Record<string, unknown> | null {
  return input && typeof input === "object" && !Array.isArray(input) ? (input as Record<string, unknown>) : null;
}

export function asString(input: unknown): string | undefined {
  return typeof input === "string" ? input : undefined;
}

export function asArray(input: unknown): unknown[] {
  return Array.isArray(input) ? input : [];
}
