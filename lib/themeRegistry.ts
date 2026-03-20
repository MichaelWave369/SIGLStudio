import { themes } from "@/lib/themes";

export function getTheme(themeId: string) {
  return themes.find((theme) => theme.id === themeId) ?? themes[0];
}
