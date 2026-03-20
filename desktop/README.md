# Desktop packaging (v0.8)

SIGLStudio keeps web mode as default. Desktop mode is optional and intended for local-first review workflows.

## Minimal Electron target

1. Install Electron locally:
   - `npm install --save-dev electron`
2. Run Next dev server:
   - `npm run dev`
3. In another terminal run:
   - `npx electron desktop/main.cjs`

This enables desktop file open/save bridge methods used by `lib/fileSystemBridge.ts`.

## Polished desktop workflow notes

- Runtime badge and desktop actions panel surface mode/help context.
- Recent files/workflow snapshots support quick local continuity.
- Use `Open Recent` behavior from workstation panels to quickly resume.
- File association guidance: `.json`, `.sigl`, `.siglboard.json`, `.siglreview.json`.

## Build/run notes

- Build web assets first: `npm run build`
- Start Next production server: `npm run start`
- Launch Electron with `SIGL_DESKTOP_DEV_URL=http://localhost:3000 npx electron desktop/main.cjs`

## Metadata placeholders

- `desktop/icon-placeholder.txt` marks location for future platform icon assets.
