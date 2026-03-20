import type { InspectResult, ValidationResult } from "@/lib/types";
import { mockInspect, mockValidate } from "@/lib/mockEngine";

export async function validateSigil(source: string): Promise<ValidationResult> {
  if (typeof window !== "undefined") {
    try {
      const res = await fetch("/api/engine/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source })
      });
      if (!res.ok) {
        return mockValidate(source);
      }
      return (await res.json()) as ValidationResult;
    } catch {
      return mockValidate(source);
    }
  }

  return mockValidate(source);
}

export async function inspectSigil(source: string): Promise<InspectResult> {
  if (typeof window !== "undefined") {
    try {
      const res = await fetch("/api/engine/inspect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source })
      });
      if (!res.ok) {
        return mockInspect(source);
      }
      return (await res.json()) as InspectResult;
    } catch {
      return mockInspect(source);
    }
  }

  return mockInspect(source);
}
