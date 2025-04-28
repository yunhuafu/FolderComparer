import { BrowserWindow, dialog, ipcMain } from 'electron';

export function registerIpcHandlers(){
    ipcMain.handle('select-folder', async (event) => {
        const win = BrowserWindow.fromWebContents(event.sender);
        if (!win) return null;
        const result = await dialog.showOpenDialog(win!, {
          properties: ['openDirectory']
        });
      
        return result.canceled ? null : result.filePaths[0];
      });
      
      ipcMain.handle('compare-folders', async (event, folderPath1, folderPath2) => {
        //assume that folderPath1 and folderPath2 are valid
        return folderPath1 + " " + folderPath2;
      });
}