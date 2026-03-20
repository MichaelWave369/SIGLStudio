export function getNextStepGuidance(route: string): string[] {
  if (route.startsWith('/boards')) return ['Open pipeline preview', 'Send output to Review Packs', 'Export Publishing Bundle'];
  if (route.startsWith('/review')) return ['Finalize sections', 'Create artifact exports', 'Export handoff package'];
  if (route.startsWith('/analytics')) return ['Apply filters', 'Review warnings', 'Open Automation Recipes'];
  if (route.startsWith('/recipes')) return ['Run dry-run report', 'Confirm guardrails', 'Export run summary'];
  return ['Open Compose', 'Run Inspect + Validate', 'Package Publishing Bundle'];
}
