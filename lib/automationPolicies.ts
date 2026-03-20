import type { AutomationRecipe } from "@/lib/types";

export function validateRecipeAgainstPolicy(recipe: AutomationRecipe, policy: { require_source_match: boolean; allow_destructive: boolean }, sourceAvailable: boolean) {
  const warnings: string[] = [];
  if (policy.require_source_match && !sourceAvailable) warnings.push("Source context unavailable for this recipe.");
  if (!policy.allow_destructive && recipe.actions.some((a) => a.kind === "export-handoff")) warnings.push("Export/handoff actions require explicit confirmation.");
  return { valid: warnings.length === 0, warnings };
}
