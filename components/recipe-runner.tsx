"use client";

import { useState } from "react";
import { getRecipes, runRecipe } from "@/lib/recipes";
import { downloadTextFile } from "@/lib/utils";

export function RecipeRunner() {
  const recipes = getRecipes();
  const [lastRun, setLastRun] = useState<ReturnType<typeof runRecipe> | null>(null);

  return (
    <div className="panel space-y-2 text-sm">
      <h3 className="font-semibold">Recipe Runner</h3>
      {recipes.map((recipe) => (
        <button key={recipe.id} className="mr-2 rounded border border-line px-2 py-1 text-xs" onClick={() => {
          const result = runRecipe(recipe);
          setLastRun(result);
          downloadTextFile(`${recipe.name}.run-summary.json`, JSON.stringify(result, null, 2));
        }}>{recipe.name}</button>
      ))}
      {lastRun ? <p className="text-xs text-muted">Last run: {lastRun.recipe_id} ({lastRun.action_count} actions)</p> : null}
    </div>
  );
}
