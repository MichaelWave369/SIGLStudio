const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('__SIGL_DESKTOP__', true);
contextBridge.exposeInMainWorld('siglDesktopBridge', {
  openTextFile: async () => {
    const response = await ipcRenderer.invoke('sigl-open-text-file');
    if (!response) throw new Error('No file selected.');
    return response;
  },
  saveTextFile: async (payload) => {
    await ipcRenderer.invoke('sigl-save-text-file', payload);
  }
});
