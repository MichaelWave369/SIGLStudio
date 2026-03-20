export interface ContextAction {
  label: string;
  route: string;
}

export function getContextActions(pathname: string): ContextAction[] {
  if (pathname.startsWith('/boards')) return [{ label: 'Open in Artifacts', route: '/artifacts' }, { label: 'Open in Review Flow', route: '/review-flows' }];
  if (pathname.startsWith('/review')) return [{ label: 'Open in Boards', route: '/boards' }, { label: 'Open in Present', route: '/present' }];
  if (pathname.startsWith('/analytics')) return [{ label: 'Open in Review Packs', route: '/review-packs' }, { label: 'Open in Recipes', route: '/recipes' }];
  if (pathname.startsWith('/recipes')) return [{ label: 'Open in Analytics', route: '/analytics' }, { label: 'Open in Artifacts', route: '/artifacts' }];
  return [{ label: 'Open in Boards', route: '/boards' }, { label: 'Open in Review Packs', route: '/review-packs' }];
}
