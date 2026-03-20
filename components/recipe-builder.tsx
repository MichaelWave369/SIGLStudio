"use client";

import { useState } from "react";
import { getRecipes, saveRecipes } from "@/lib/recipes";
import type { AutomationRecipe } from "@/lib/types";

export function RecipeBuilder() {
  const [, setRefresh] = useState(0);
  const recipes = getRecipes();

  const createRecipe = () => {
    const recipe: AutomationRecipe = {
      id: crypto.randomUUID(),
      name: `Recipe ${recipes.length + 1}`,
      description: "Local deterministic recipe",
      source_scope: "global",
      output_target: "artifact-set",
      actions: [{ id: crypto.randomUUID(), kind: "create-artifact-set", params: { preset: "review-pack" } }],
      schema_version: "0.8"
    };
    saveRecipes([recipe, ...recipes]);
    setRefresh((v) => v + 1);
  };

  return (
    <div className="panel space-y-2 text-sm">
      <button className="rounded border border-line px-2 py-1 text-xs" onClick={createRecipe}>Create Recipe</button>
      {recipes.map((recipe) => <p key={recipe.id} className="text-xs">{recipe.name} ({recipe.actions.length} actions)</p>)}
    </div>
  );
}
