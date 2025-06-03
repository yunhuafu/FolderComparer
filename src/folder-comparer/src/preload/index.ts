import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
// const api = {}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld(
      'folderComparerAndMergerAPI',
      // instead of exposing the complete folderComparerAndMergerAPI module
      {
        selectFolder: () => ipcRenderer.invoke('select-folder'),
        compareFolders: (folderPath1: string, folderPath2: string) =>
          ipcRenderer.invoke('compare-folders', folderPath1, folderPath2)
      }
    )
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
