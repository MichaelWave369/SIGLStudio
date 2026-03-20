import type { AutomationPack } from "@/lib/types";
import { validateRecipeAgainstPolicy } from "@/lib/automationPolicies";

const key = "siglstudio-automation-packs";

export function getAutomationPacks(): AutomationPack[] {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem(key) ?? "[]") as AutomationPack[];
}

export function saveAutomationPacks(packs: AutomationPack[]) {
  localStorage.setItem(key, JSON.stringify(packs));
}

export function dryRunAutomationPack(pack: AutomationPack, sourceAvailable = true) {
  const recipeReports = pack.recipes.map((recipe) => ({ recipe_id: recipe.id, ...validateRecipeAgainstPolicy(recipe, pack.validation_policy, sourceAvailable), action_count: recipe.actions.length }));
  return {
    pack_id: pack.id,
    recipe_count: pack.recipes.length,
    reports: recipeReports,
    action_count: recipeReports.reduce((acc, r) => acc + r.action_count, 0),
    created_at: new Date().toISOString(),
    export_version: "1.0"
  };
}


export function validateAutomationPack(input: unknown): { valid: boolean; errors: string[] } {
  const raw = input as AutomationPack;
  const errors: string[] = [];
  if (!raw || typeof raw !== "object") errors.push("Pack is not an object.");
  if (!raw?.name) errors.push("Pack name missing.");
  if (!Array.isArray(raw?.recipes)) errors.push("Pack recipes missing.");
  if (!raw?.schema_version) errors.push("Pack schema_version missing.");
  if (!raw?.validation_policy) errors.push("Pack validation policy missing.");
  if (Array.isArray(raw?.recipes) && raw.recipes.some((recipe) => !recipe.id || !recipe.schema_version || !Array.isArray(recipe.actions))) {
    errors.push("One or more recipes are missing id/schema_version/actions.");
  }
  return { valid: errors.length === 0, errors };
}
