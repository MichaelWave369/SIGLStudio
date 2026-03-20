import type { InspectResult, ValidationResult } from "@/lib/types";
import { mockInspect, mockValidate } from "@/lib/mockEngine";
import { normalizeInspectResult, normalizeValidationResult } from "@/lib/engineNormalize";

export async function validateSigil(source: string): Promise<ValidationResult> {
  const fallback = mockValidate(source);
  if (typeof window === "undefined") return fallback;

  try {
    const res = await fetch("/api/engine/validate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ source })
    });
    if (!res.ok) {
      return mockValidate(source, `Engine endpoint unavailable (${res.status}); using mock mode.`);
    }
    const data = (await res.json()) as unknown;
    return normalizeValidationResult(data, fallback);
  } catch (error) {
    const message = error instanceof Error ? error.message : "network error";
    return mockValidate(source, `Engine call failed (${message}); using mock mode.`);
  }
}

export async function inspectSigil(source: string): Promise<InspectResult> {
  const fallback = mockInspect(source);
  if (typeof window === "undefined") return fallback;

  try {
    const res = await fetch("/api/engine/inspect", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ source })
    });
    if (!res.ok) {
      return mockInspect(source, `Engine inspect endpoint unavailable (${res.status}); using mock mode.`);
    }
    const data = (await res.json()) as unknown;
    return normalizeInspectResult(data, fallback);
  } catch (error) {
    const message = error instanceof Error ? error.message : "network error";
    return mockInspect(source, `Engine inspect failed (${message}); using mock mode.`);
  }
}
