# SIGLStudio v0.5

SIGLStudio is a local-first symbolic studio for composing, comparing, presenting, reviewing, and handing off SIGL work.

> **Architecture boundary:** Vibe owns canonical parsing/lowering/verification truth. SIGLStudio owns UX, visualization, sessions, boards, review packs, and local handoff/export workflows.

## What’s new in v0.5
- **Boards / Canvas** (`/boards`) for freeform symbolic block layout.
- **Theme system** (Observatory, Monolith, Lattice, Quiet Paper) for presentation/artifact/review styling.
- **Review Packs** (`/review-packs`) for deterministic project review bundle generation.
- **Handoff formats** (`.siglboard.json`, `.siglreview.json`, etc.) with integrity validation.
- **Deeper provenance normalization** with local-vs-engine metadata grouping.
- **Non-interactive linting** via explicit ESLint flat config + `eslint` script.

## Routes
- `/` landing
- `/compose`, `/validate`, `/atlas`, `/sequences`, `/export`
- `/diff`, `/batch`, `/projects`
- `/present`, `/sessions`, `/artifacts`
- `/boards`, `/review-packs`

## Local-first guarantees
- No cloud backend
- No auth
- No database requirement
- Mock mode remains first-class
- Optional Vibe CLI bridge only

## File-based handoff
Handoff payloads include explicit type, version, created_at, source context, integrity hash, notes/theme, and route-aware validation/import.

## Tooling
`npm run lint` now runs non-interactively via ESLint CLI and flat config.

## Setup
```bash
npm install
npm run dev
```

## Validation
```bash
npm run lint
npm run test
npm run build
```

## Limitations
- Boards are bounded/local and intentionally simple (not an infinite whiteboard engine).
- No realtime collaboration; handoff is file-based only.
- PNG artifact export remains deferred for reliability.

## Docs
- `docs/roadmap.md`
