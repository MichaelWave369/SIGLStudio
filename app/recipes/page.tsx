import { RecipeBuilder } from "@/components/recipe-builder";
import { RecipeRunner } from "@/components/recipe-runner";
import { SendToMenu } from "@/components/send-to-menu";

export default function RecipesPage() {
  return (
    <main className="space-y-4">
      <div className="panel">
        <h2 className="text-xl font-semibold">Automation Recipes</h2>
        <p className="mt-2 text-sm text-muted">Create and run explicit local automation recipes for repeatable review/export workflows.</p>
      </div>
      <SendToMenu source="recipes" />
      <RecipeBuilder />
      <RecipeRunner />
    </main>
  );
}
