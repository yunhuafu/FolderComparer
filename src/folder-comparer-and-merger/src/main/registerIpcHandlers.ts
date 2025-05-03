import { BrowserWindow, dialog, ipcMain } from 'electron'
import FolderComparer from './folderComparer'

function registerIpcHandlers(): void {
  ipcMain.handle('select-folder', async (event) => {
    const win = BrowserWindow.fromWebContents(event.sender)
    if (!win) return null
    const result = await dialog.showOpenDialog(win!, {
      properties: ['openDirectory']
    })

    return result.canceled ? null : result.filePaths[0]
  })

  ipcMain.handle('compare-folders', async (event, folderPath1, folderPath2) => {
    const [ret1, ret2] = await FolderComparer.compareFolders(folderPath1, folderPath2)
    return [ret1, ret2]
  })
}

export default registerIpcHandlers
