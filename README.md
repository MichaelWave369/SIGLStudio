# SIGLStudio v0.4

SIGLStudio is a local-first symbolic studio for composing, inspecting, comparing, organizing, presenting, and exporting SIGL.

> **Architecture boundary:** Vibe owns canonical parsing/lowering/verification truth. SIGLStudio owns UI workflows, visualization, organization, presentation, and local exports.

## What’s new in v0.4
- **Presentation Mode** (`/present`): distraction-reduced walkthrough slides with keyboard controls.
- **Guided Sessions** (`/sessions`): ordered symbolic workflows with checkpoints and local progress.
- **Artifact Templates** (`/artifacts`): poster/card/static SVG template exports + JSON template configs.
- **Provenance/Trace Alignment**: reusable provenance cards and trace summaries across inspect/diff/batch/projects.

## Route overview
- `/` landing
- `/compose`, `/validate`, `/atlas`, `/sequences`, `/export`
- `/diff`, `/batch`, `/projects`
- `/present`, `/sessions`, `/artifacts`

## Local-first workflow guarantees
- No auth
- No database requirement
- No cloud backend required
- Mock engine mode remains first-class
- Optional Vibe CLI bridge only

## Presentation and session exports
- Presentation config JSON
- Session definition JSON
- Session progress/summaries JSON
- Artifact template config JSON
- SVG artifact output

## Setup
```bash
npm install
npm run dev
```

## Test commands
```bash
npm run lint
npm run test
```

## Limitations (honest)
- PNG export is deferred in v0.4 for reliability.
- Presentation mode is lightweight and deterministic (not a full slideshow engine).
- Provenance displays local/mock metadata unless richer Vibe provenance is available.

## Docs
- `docs/roadmap.md`
