export interface PaletteCommand {
  id: string;
  label: string;
}

export function filterCommands<T extends PaletteCommand>(commands: T[], query: string): T[] {
  const normalized = query.toLowerCase();
  return commands.filter((command) => command.label.toLowerCase().includes(normalized));
}
