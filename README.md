# SIGLStudio v0.3

SIGLStudio is a local-first symbolic studio for composing, exploring, validating, inspecting, comparing, organizing, and exporting SIGL.

> **Architecture boundary:** SIGLStudio is the product/UI layer. Vibe remains canonical for parsing, lowering, verification, and proof truth.

## What’s new in v0.3
- **Inspect Diff Mode** (`/diff`) for side-by-side semantic comparison.
- **Batch Workflows** (`/batch`) for running validate/inspect across multiple sigils.
- **Atlas Relation Graph** (`/atlas`) for symbolic neighborhoods and relation labels.
- **Project Packs** (`/projects`) for durable local organization with deterministic integrity metadata.
- Export/report additions for diff, batch, project pack, and integrity summary JSON.

## Routes
- `/` landing
- `/compose` compose + inspect workspace
- `/validate` validation workspace
- `/atlas` list + relation graph view
- `/sequences` temporal sequence editor
- `/export` deterministic export center
- `/diff` semantic diff workspace
- `/batch` multi-item validate/inspect workflow
- `/projects` local project pack manager

## Local-first project packs
Project packs include:
- metadata (`name`, `description`, `created_at`, `updated_at`, `version`, `engine_mode_last_used`)
- item collection (`sigils`, `sequences`, `notes`)
- integrity (`pack_hash`, item hashes, `export_version`)

Project pack import includes deterministic validation guards.

## Engine behavior
- Mock mode is first-class and always available.
- Optional Vibe CLI bridge can be enabled with:
  ```bash
  ENABLE_VIBE_CLI=true npm run dev
  ```
- All adapter calls normalize outputs into compare-able/stable shapes for diff and batch workflows.

## Setup
```bash
npm install
npm run dev
```

## Testing
```bash
npm run lint
npm run test
```

## Keyboard / command UX
- Command palette: `Ctrl/Cmd + K`
- Glyph insertion: `Alt + [1..0,-,q,w,e,r,t]`

## Limitations
- Mock mode remains heuristic and non-canonical.
- Relation graph uses deterministic static layout (not physics-heavy).
- No cloud sync/auth/database.

## Docs
- `docs/roadmap.md`
