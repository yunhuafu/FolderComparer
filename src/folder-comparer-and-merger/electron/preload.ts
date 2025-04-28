import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  selectFolder: () => ipcRenderer.invoke('select-folder'),
  compareFolders: (folderPath1:string, folderPath2:string) => ipcRenderer.invoke('compare-folders', folderPath1, folderPath2)
});