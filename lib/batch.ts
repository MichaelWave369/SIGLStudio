import type { BatchItemResult } from "@/lib/types";

export function aggregateBatchResults(results: BatchItemResult[]) {
  const total = results.length;
  const pass = results.filter((result) => result.validation?.valid).length;
  const fail = total - pass;
  const obligations = results.reduce((acc, result) => acc + (result.validation?.obligations.length ?? 0), 0);
  return { total, pass, fail, obligations };
}
