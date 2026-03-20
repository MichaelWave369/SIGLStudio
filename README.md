# SIGLStudio v0.2

SIGLStudio is a local-first symbolic studio for composing, exploring, validating, inspecting, sequencing, and exporting SIGL.

> **Architecture boundary:** SIGLStudio is the product/UI layer. Vibe remains canonical for parsing, lowering, and verification truth.

## What’s new in v0.2
- Global command palette (`Ctrl/Cmd + K`) with navigation, insertion, copy/export, and draft commands.
- Keyboard glyph shortcuts (Alt + key) with cursor-aware insertion and a built-in shortcuts help modal.
- Rich inspect workspace with tabbed panes: canonical JSON, summary, token tree, graph tables, obligations trace, issues/warnings, render hints.
- Atlas upgrade with category filters (`generator`, `operator`, `state`), semantic grouping, search, and details modal.
- Deterministic export bundle metadata (`export_version`, `created_at`, `engine_mode`, `source_hash`, `sequence_present`, `glyph_count`, `obligation_count`).
- Hardened engine adapter normalization and safe fallback behavior with mode reasons.

## Product scope (truthful)
- No database.
- No auth.
- Local-first by default.
- Mock Engine Mode always available when Vibe CLI is missing/disabled.
- Optional server-side bridge for local `vibec` execution.

## Engine behavior
- Browser calls `lib/vibeAdapter.ts`.
- Adapter calls local API routes (`/api/engine/validate` and `/api/engine/inspect`).
- Server bridge optionally invokes:
  - `vibec sigil-validate <file.vibe> --report json`
  - `vibec sigil-inspect <file.vibe> --report json`
- If unavailable/malformed, adapter normalizes response and falls back to mock mode without crashing.

## Routes
- `/` landing + app overview
- `/compose` compose + glyph picker + inspect workspace + draft management
- `/validate` validation report + obligations + engine status
- `/atlas` filterable atlas with glyph detail modal
- `/sequences` temporal sequence editor with shortcut support
- `/export` deterministic exports + project bundle payload

## Local setup
```bash
npm install
npm run dev
```
Visit: `http://localhost:3000`.

### Optional Vibe mode
```bash
ENABLE_VIBE_CLI=true npm run dev
```

## Test commands
```bash
npm run lint
npm run test
```

## Keyboard shortcuts
- Open command palette: `Ctrl/Cmd + K`
- Insert glyphs in editors: `Alt + [1..0,-,q,w,e,r,t]`
- Shortcut mappings are visible from the global “Keyboard Shortcuts” modal.

## Export bundle metadata
`export_version`, `created_at`, `engine_mode`, `source_hash`, `sequence_present`, `glyph_count`, `obligation_count`

## Limitations
- Mock mode remains heuristic and is not canonical truth.
- Graph layout is intentionally deterministic/simple in v0.2.
- No collaborative or cloud sync workflows yet.

## Docs
- Roadmap: `docs/roadmap.md`
