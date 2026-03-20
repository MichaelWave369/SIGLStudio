export interface ThemeDefinition {
  id: string;
  name: string;
  colors: { background: string; panel: string; text: string; accent: string };
  typography: { heading: string; body: string };
  density: "comfortable" | "compact";
}

export const themes: ThemeDefinition[] = [
  { id: "observatory", name: "Observatory", colors: { background: "#06070b", panel: "#111420", text: "#e2e8f0", accent: "#8ef5d0" }, typography: { heading: "font-semibold", body: "font-normal" }, density: "comfortable" },
  { id: "monolith", name: "Monolith", colors: { background: "#0a0a0a", panel: "#151515", text: "#f5f5f5", accent: "#a3a3a3" }, typography: { heading: "font-bold", body: "font-medium" }, density: "compact" },
  { id: "lattice", name: "Lattice", colors: { background: "#0c1022", panel: "#1a2440", text: "#e0e7ff", accent: "#93c5fd" }, typography: { heading: "font-semibold", body: "font-normal" }, density: "comfortable" },
  { id: "quiet-paper", name: "Quiet Paper", colors: { background: "#f7f7f5", panel: "#ffffff", text: "#1f2937", accent: "#475569" }, typography: { heading: "font-medium", body: "font-normal" }, density: "comfortable" }
];
