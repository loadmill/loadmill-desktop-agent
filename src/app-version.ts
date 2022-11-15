import { app, ipcMain } from 'electron';
import { APP_VERSION, GET_APP_VERSION } from './constants';

ipcMain.on(GET_APP_VERSION, (event) => {
  event.sender.send(APP_VERSION, { [APP_VERSION]: app.getVersion() });
});
