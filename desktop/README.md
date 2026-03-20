# Desktop packaging (v0.6)

SIGLStudio keeps web mode as default. Desktop mode is optional and intended for local-first review workflows.

## Minimal Electron target

1. Install Electron locally:
   - `npm install --save-dev electron`
2. Run Next dev server:
   - `npm run dev`
3. In another terminal run:
   - `npx electron desktop/main.cjs`

This enables desktop file open/save bridge methods used by `lib/fileSystemBridge.ts`.

## Production notes

- Build web assets first: `npm run build`
- Start Next production server: `npm run start`
- Launch Electron with `SIGL_DESKTOP_DEV_URL=http://localhost:3000 npx electron desktop/main.cjs`

Icon and app metadata can be incrementally added in this folder without impacting browser workflows.
