# SIGLStudio v0.1

SIGLStudio is a polished local-first web app for composing, exploring, validating, and exporting SIGL.

> **Boundary truth:** SIGLStudio is the UI/product layer. Vibe is the canonical engine layer.

## What SIGLStudio is
- A visual symbolic studio with focused routes for composing, atlas browsing, validation, temporal sequence authoring, and export.
- Deterministic SVG rendering for quick symbolic previews.
- A local-first workspace with draft persistence in `localStorage`.

## Relationship to Vibe
Vibe owns canonical parsing/lowering/verification/bridge-threshold truth.
SIGLStudio owns editing, visualization, UX flow, and local export.

This repo includes a stable adapter boundary that targets outputs equivalent to:
- `vibec sigil-validate <file.vibe> --report json`
- `vibec sigil-inspect <file.vibe> --report json`

When Vibe CLI is unavailable, SIGLStudio transparently runs in **Mock Engine Mode** and clearly labels results.

## Prototype scope (truthful)
- No database.
- No auth.
- No required server dependency for initial use.
- Optional local API bridge can invoke `vibec` when available and explicitly enabled.

## Routes
- `/` landing and product identity
- `/compose` sigil composer + glyph picker + preview + drafts
- `/validate` pass/fail + obligations + bridge score + issues/warnings
- `/atlas` glyph atlas with load-to-compose examples
- `/sequences` temporal sequence editor + coherence check + JSON export
- `/export` JSON/SVG/text/`.vibe` snippet export center

## Setup
```bash
npm install
npm run dev
```
Open `http://localhost:3000`.

### Optional Vibe mode
1. Install `vibec` locally and ensure it is on PATH.
2. Set env flag:
   ```bash
   ENABLE_VIBE_CLI=true
   ```
3. Restart dev server.

If CLI calls fail at runtime, SIGLStudio safely falls back to Mock Engine Mode.

## Testing
```bash
npm run lint
npm run test
```

## Screenshots
- `docs/screenshots/compose.png` (placeholder)
- `docs/screenshots/validate.png` (placeholder)

## Seed data included
Examples:
- basic sigil
- coupled sigil
- recursive sigil
- temporal sequence sample

Atlas core symbols:
`Φ ∴ ☉ ∇ Ω ⟨ ⟩ ⟡ ⟐ ⟢ ⟣ ◌ ◉ ◎ ⊙ ⊚`

## Limitations
- Mock mode validations are heuristic UX scaffolding, not canonical truth.
- SVG renderer is intentionally simple in v0.1.
- No collaborative persistence yet (local device only).

## Roadmap
See `docs/roadmap.md`.
