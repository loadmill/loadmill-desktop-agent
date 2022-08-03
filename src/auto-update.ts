import { app, BrowserWindow, ipcMain } from 'electron';
import { autoUpdater, UPDATE_DOWNLOADED } from 'electron-updater';
import { READY, RESTART_APP, UPDATE_AVAILABLE } from './constants';

export class AutoUpdater {
  constructor(mainWindow: BrowserWindow) {
    ipcMain.on(RESTART_APP, () => {
      autoUpdater.quitAndInstall();
    });

    app.on(READY, () => {
      if (app.isPackaged) {
        autoUpdater.checkForUpdatesAndNotify();
      } else {
        console.log('we would have run checkForUpdatesAndNotify here');
      }
    });

    autoUpdater.on('update-available', () => {
      console.log('There is an update available');
      mainWindow.webContents.send(UPDATE_AVAILABLE);
    });

    autoUpdater.on('update-downloaded', () => {
      console.log('We have downloaded an update');
      mainWindow.webContents.send(UPDATE_DOWNLOADED);
    });
  }
}
