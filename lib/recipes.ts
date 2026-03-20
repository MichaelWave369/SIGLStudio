import type { AutomationRecipe } from "@/lib/types";
import { isAutomationRecipe } from "@/lib/recipeTypes";

const key = "siglstudio-recipes";

export function getRecipes(): AutomationRecipe[] {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem(key) ?? "[]") as AutomationRecipe[];
}

export function saveRecipes(recipes: AutomationRecipe[]) {
  localStorage.setItem(key, JSON.stringify(recipes));
}

export function runRecipe(recipe: AutomationRecipe) {
  const completed_at = new Date().toISOString();
  return {
    recipe_id: recipe.id,
    action_count: recipe.actions.length,
    completed_at,
    export_version: "0.8"
  };
}

export function validateRecipe(input: unknown): boolean {
  return isAutomationRecipe(input);
}
