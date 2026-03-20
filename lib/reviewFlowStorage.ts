import type { ReviewFlow } from "@/lib/types";

const key = "siglstudio-review-flows";

export function getReviewFlows(): ReviewFlow[] {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem(key) ?? "[]") as ReviewFlow[];
}

export function saveReviewFlows(flows: ReviewFlow[]) {
  localStorage.setItem(key, JSON.stringify(flows));
}
