import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import registerIpcHandlers from './ipcHandlers';
import path from 'path';

import isDev from 'electron-is-dev';
//const isDev = false;

let mainWindow:BrowserWindow | null = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js')
    },
  });

  const startURL = isDev
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, '../../build/index.html')}`;

  mainWindow.loadURL(startURL);

  if (isDev)
    mainWindow.webContents.openDevTools();

  mainWindow.on('closed', () => (mainWindow = null));
}

app.whenReady().then(() => {
  createWindow();
  registerIpcHandlers();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
      registerIpcHandlers();
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

