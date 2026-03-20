export interface RecentFileEntry {
  id: string;
  name: string;
  kind: string;
  opened_at: string;
}

const key = "siglstudio-recent-files";

export function getRecentFiles(): RecentFileEntry[] {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem(key) ?? "[]") as RecentFileEntry[];
}

export function pushRecentFile(file: Omit<RecentFileEntry, "opened_at">) {
  const next = [{ ...file, opened_at: new Date().toISOString() }, ...getRecentFiles().filter((f) => f.id !== file.id)].slice(0, 20);
  localStorage.setItem(key, JSON.stringify(next));
}
