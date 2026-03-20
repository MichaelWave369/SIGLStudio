export interface RecentItem {
  id: string;
  label: string;
  route: string;
  updated_at: string;
}

const key = "siglstudio-recent-items";

export function getRecentItems(): RecentItem[] {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem(key) ?? "[]") as RecentItem[];
}

export function pushRecentItem(item: Omit<RecentItem, "updated_at">) {
  const now = new Date().toISOString();
  const next = [
    { ...item, updated_at: now },
    ...getRecentItems().filter((r) => !(r.id === item.id && r.route === item.route))
  ].slice(0, 12);
  localStorage.setItem(key, JSON.stringify(next));
}
