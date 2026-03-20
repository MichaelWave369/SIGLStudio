# Desktop packaging (v0.7)

SIGLStudio keeps web mode as default. Desktop mode is optional and intended for local-first review workflows.

## Minimal Electron target

1. Install Electron locally:
   - `npm install --save-dev electron`
2. Run Next dev server:
   - `npm run dev`
3. In another terminal run:
   - `npx electron desktop/main.cjs`

This enables desktop file open/save bridge methods used by `lib/fileSystemBridge.ts`.

## Ergonomics notes

- Runtime badge appears in the shell for desktop/web awareness.
- Recent files are tracked locally for quick context continuity.
- Boards/review/artifact/extension imports can push recent file entries.

## File association guidance

Use `.json`, `.sigl`, `.siglboard.json`, and `.siglreview.json` in desktop open workflows.

## Production notes

- Build web assets first: `npm run build`
- Start Next production server: `npm run start`
- Launch Electron with `SIGL_DESKTOP_DEV_URL=http://localhost:3000 npx electron desktop/main.cjs`

Icon and app metadata can be incrementally added in this folder without impacting browser workflows.
