import { app, BrowserWindow, ipcMain } from 'electron';
import { autoUpdater, UPDATE_DOWNLOADED } from 'electron-updater';
import log from 'electron-log';
import { READY, RESTART_APP, UPDATE_AVAILABLE } from './constants';

export class AutoUpdater {
  constructor(mainWindow: BrowserWindow) {
    ipcMain.on(RESTART_APP, () => {
      log.info('in ipcMain.on(RESTART_APP');

      autoUpdater.quitAndInstall();
    });

    app.on(READY, () => {
      if (app.isPackaged) {
        autoUpdater.checkForUpdatesAndNotify();
      } else {
        log.info('we would have run checkForUpdatesAndNotify here');
      }
    });

    autoUpdater.on('update-available', () => {
      log.info('There is an update available');
      mainWindow.webContents.send(UPDATE_AVAILABLE);
    });

    autoUpdater.on('update-downloaded', () => {
      log.info('We have downloaded an update');
      mainWindow.webContents.send(UPDATE_DOWNLOADED);
    });
  }
}
