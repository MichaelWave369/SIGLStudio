export interface PaletteCommand {
  id: string;
  label: string;
}

export function filterCommands(commands: PaletteCommand[], query: string): PaletteCommand[] {
  const normalized = query.toLowerCase();
  return commands.filter((command) => command.label.toLowerCase().includes(normalized));
}
