import { app, BrowserWindow, shell } from 'electron';

import './agent-handlers';
import { ACTIVATE, PLATFORM, READY, WINDOW_ALL_CLOSED } from './constants';
import './log';
import { init as initMainToRenderer } from './main-to-renderer';
import './menu';
import './path';
import './update-electron-app';

// This allows TypeScript to pick up the magic constant that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = async (): Promise<void> => {
  const mainWindow = new BrowserWindow({
    height: 800,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
    width: 800,
  });

  await mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // mainWindow.webContents.openDevTools();

  initMainToRenderer(mainWindow);

  setOpenLinksInBrowser(mainWindow);
};

const setOpenLinksInBrowser = (mainWindow: BrowserWindow) => {
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });
};

app.on(READY, createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on(WINDOW_ALL_CLOSED, () => {
  if (process.platform !== PLATFORM.DARWIN) {
    app.quit();
  }
});

app.on(ACTIVATE, () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
