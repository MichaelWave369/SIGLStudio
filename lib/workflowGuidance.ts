export function getNextStepGuidance(route: string): string[] {
  if (route.startsWith('/boards')) return ['Create pipeline preview', 'Send to review pack', 'Export publishing bundle'];
  if (route.startsWith('/review')) return ['Finalize sections', 'Create artifacts', 'Export handoff'];
  if (route.startsWith('/analytics')) return ['Apply filters', 'Review warnings', 'Open recipes'];
  if (route.startsWith('/recipes')) return ['Run dry-run', 'Confirm actions', 'Export run summary'];
  return ['Open compose', 'Inspect/validate', 'Package publishing bundle'];
}
