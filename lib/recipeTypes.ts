import type { AutomationRecipe } from "@/lib/types";

export function isAutomationRecipe(input: unknown): input is AutomationRecipe {
  const raw = input as AutomationRecipe;
  return Boolean(raw && raw.id && raw.name && Array.isArray(raw.actions) && raw.schema_version);
}
