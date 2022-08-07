import { app, autoUpdater, BrowserWindow, dialog, ipcMain } from 'electron';

import { READY, RESTART_APP, UPDATE_AVAILABLE, UPDATE_DOWNLOADED } from './constants';

export class AutoUpdater {
  constructor(mainWindow: BrowserWindow) {
    const server = 'http://localhost:3000';
    const url = `${server}/update/${process.platform}/${app.getVersion()}`;

    autoUpdater.setFeedURL({ url });

    setInterval(() => {
      autoUpdater.checkForUpdates();
    }, 60000);

    autoUpdater.on('update-downloaded', (_event, releaseNotes, releaseName) => {
      const dialogOpts = {
        type: 'info',
        buttons: ['Restart', 'Later'],
        title: 'Application Update',
        message: process.platform === 'win32' ? releaseNotes : releaseName,
        detail:
      'A new version has been downloaded. Restart the application to apply the updates.',
      };

      dialog.showMessageBox(dialogOpts).then((returnValue) => {
        if (returnValue.response === 0) {
          autoUpdater.quitAndInstall();
        }
      });
    });

    ipcMain.on(RESTART_APP, () => {
      autoUpdater.quitAndInstall();
    });

    app.on(READY, () => {
      console.log('checkForUpdatesAndNotify');
      mainWindow.webContents.send('checkForUpdatesAndNotify');
      autoUpdater.checkForUpdates();
    });

    autoUpdater.on('update-available', () => {
      console.log('There is an update available');
      mainWindow.webContents.send(UPDATE_AVAILABLE);
    });

    autoUpdater.on('update-downloaded', () => {
      console.log('We have downloaded an update');
      mainWindow.webContents.send(UPDATE_DOWNLOADED);
    });

    autoUpdater.on('error', (message) => {
      console.error('There was a problem updating the application');
      console.error(message);
    });
  }
}
