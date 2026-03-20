import type { ReviewPack } from "@/lib/reviewPack";

const key = "siglstudio-review-packs";

export function getReviewPacks(): ReviewPack[] {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem(key) ?? "[]") as ReviewPack[];
}

export function saveReviewPacks(packs: ReviewPack[]) {
  localStorage.setItem(key, JSON.stringify(packs));
}
