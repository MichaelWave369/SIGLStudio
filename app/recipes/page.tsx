import { PageIntro } from "@/components/page-intro";
import { RecipeBuilder } from "@/components/recipe-builder";
import { RecipeRunner } from "@/components/recipe-runner";
import { SendToMenu } from "@/components/send-to-menu";
import { AutomationPackBuilder } from "@/components/automation-pack-builder";
import { RecipeDryRunPanel } from "@/components/recipe-dry-run-panel";

export default function RecipesPage() {
  return (
    <main className="space-y-4">
      <PageIntro title="Automation Recipes" description="Create and run explicit local automation recipes and grouped automation packs with dry-run guardrails." />
      <SendToMenu source="recipes" />
      <RecipeBuilder />
      <AutomationPackBuilder />
      <RecipeDryRunPanel />
      <RecipeRunner />
    </main>
  );
}
