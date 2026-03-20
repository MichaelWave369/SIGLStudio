const { app, BrowserWindow, dialog, ipcMain } = require('electron');
const fs = require('node:fs/promises');
const path = require('node:path');

const devUrl = process.env.SIGL_DESKTOP_DEV_URL || 'http://localhost:3000';

function createWindow() {
  const win = new BrowserWindow({
    width: 1440,
    height: 920,
    title: 'SIGL Studio',
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs')
    }
  });

  win.loadURL(devUrl);
}

ipcMain.handle('sigl-open-text-file', async () => {
  const result = await dialog.showOpenDialog({ properties: ['openFile'] });
  if (result.canceled || !result.filePaths[0]) return null;
  const filePath = result.filePaths[0];
  const content = await fs.readFile(filePath, 'utf8');
  return { name: path.basename(filePath), content };
});

ipcMain.handle('sigl-save-text-file', async (_event, payload) => {
  const result = await dialog.showSaveDialog({ defaultPath: payload.suggestedName });
  if (result.canceled || !result.filePath) return false;
  await fs.writeFile(result.filePath, payload.content, 'utf8');
  return true;
});

app.whenReady().then(createWindow);
