import type { GuidedSession, PresentationConfig } from "@/lib/types";

export function createPresentationConfig(input: {
  title: string;
  sourceType: PresentationConfig["sourceType"];
  slides: PresentationConfig["slides"];
  focusMode: PresentationConfig["focusMode"];
  cleanMode?: boolean;
}): PresentationConfig {
  return {
    id: crypto.randomUUID(),
    title: input.title,
    sourceType: input.sourceType,
    slides: input.slides,
    focusMode: input.focusMode,
    cleanMode: input.cleanMode ?? false,
    created_at: new Date().toISOString()
  };
}

export function sessionToPresentation(session: GuidedSession): PresentationConfig {
  return createPresentationConfig({
    title: session.title,
    sourceType: "session",
    focusMode: "balanced",
    slides: session.steps.map((step, index) => ({ id: step.id, title: `${index + 1}. ${step.title}`, source: step.linkedSource ?? step.type, notes: step.note }))
  });
}
