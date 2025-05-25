import { BrowserWindow, dialog, ipcMain } from 'electron'
import compareFolders from './compareFolders'
import getFileSystemNode from './getFileSystemNode'

function registerIpcHandlers(): void {
  ipcMain.handle('select-folder', async (event) => {
    const win = BrowserWindow.fromWebContents(event.sender)
    if (!win) return null
    const result = await dialog.showOpenDialog(win!, {
      properties: ['openDirectory']
    })

    return result.canceled ? null : getFileSystemNode(result.filePaths[0])
  })

  ipcMain.handle('compare-folders', async (event, folderPath1, folderPath2) => {
    const result = await compareFolders(folderPath1, folderPath2)
    return result
  })
}

export default registerIpcHandlers
