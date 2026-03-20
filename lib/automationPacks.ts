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
    export_version: "0.9"
  };
}
