import { app, autoUpdater, ipcMain } from 'electron';
import log from 'electron-log';
import { CHECK_FOR_UPDATES } from './constants';

export const checkForUpdates = (): void => {
  log.info('User request: Check for updates...');
  if (app.isPackaged) {
    autoUpdater.checkForUpdates();
  }
};

ipcMain.on(CHECK_FOR_UPDATES, (_event) => {
  checkForUpdates();
});
