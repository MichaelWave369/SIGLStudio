import type { GuidedSession, SessionProgress, SessionStep } from "@/lib/types";
import { stableHash } from "@/lib/hash";

const sessionsKey = "siglstudio-guided-sessions";
const progressKey = "siglstudio-session-progress";

export function getSessions(): GuidedSession[] {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem(sessionsKey) ?? "[]") as GuidedSession[];
}

export function saveSessions(sessions: GuidedSession[]) {
  localStorage.setItem(sessionsKey, JSON.stringify(sessions));
}

export function createSession(title: string, description: string): GuidedSession {
  const now = new Date().toISOString();
  const session: GuidedSession = {
    id: crypto.randomUUID(),
    title,
    description,
    created_at: now,
    updated_at: now,
    steps: [defaultStep("compose"), defaultStep("inspect")]
  };
  saveSessions([session, ...getSessions()]);
  return session;
}

export function defaultStep(type: SessionStep["type"]): SessionStep {
  return {
    id: crypto.randomUUID(),
    type,
    title: `${type[0].toUpperCase()}${type.slice(1)} step`,
    note: "",
    checkpoints: [{ id: crypto.randomUUID(), label: "Complete step", completed: false }]
  };
}

export function saveProgress(progress: SessionProgress) {
  const all = getProgressMap();
  all[progress.sessionId] = progress;
  localStorage.setItem(progressKey, JSON.stringify(all));
}

export function getProgress(sessionId: string): SessionProgress {
  const all = getProgressMap();
  return all[sessionId] ?? { sessionId, currentStepIndex: 0, completedCheckpointIds: [] };
}

function getProgressMap(): Record<string, SessionProgress> {
  if (typeof window === "undefined") return {};
  return JSON.parse(localStorage.getItem(progressKey) ?? "{}") as Record<string, SessionProgress>;
}

export function validateSessionImport(input: unknown): { valid: boolean; reason?: string; session?: GuidedSession } {
  const raw = input as GuidedSession;
  if (!raw || typeof raw !== "object") return { valid: false, reason: "Not an object." };
  if (!raw.id || !raw.title || !Array.isArray(raw.steps)) return { valid: false, reason: "Missing required session fields." };
  return { valid: true, session: raw };
}

export function sessionSummaryHash(session: GuidedSession): string {
  return stableHash(JSON.stringify({ id: session.id, title: session.title, steps: session.steps.map((s) => s.type + s.title) }));
}
