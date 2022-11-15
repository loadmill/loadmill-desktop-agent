import { contextBridge, ipcRenderer } from 'electron';
import {
  API,
  APP_VERSION,
  GET_APP_VERSION,
  RESTART_APP,
  START_AGENT,
  STOP_AGENT,
  // UPDATE_AVAILABLE,
  // UPDATE_DOWNLOADED
} from './constants';

export const WINDOW_API = {
  getVersion: (msg?: string): void => ipcRenderer.send(GET_APP_VERSION, msg),
  restartApp: (msg?: string): void => ipcRenderer.send(RESTART_APP, msg),
  startAgent: (msg: string): void => ipcRenderer.send(START_AGENT, msg),
  stopAgent: (msg?: string): void => ipcRenderer.send(STOP_AGENT, msg),
};

const windowLoaded = new Promise(resolve => {
  window.onload = resolve;
});
// ipcRenderer.on('checkForUpdatesAndNotify', () => {
//   console.log('checkForUpdatesAndNotify');
// });
// ipcRenderer.on(UPDATE_AVAILABLE, async () => {
//   await windowLoaded;
//   console.log(UPDATE_AVAILABLE);
//   window.postMessage(UPDATE_AVAILABLE);
//   ipcRenderer.removeAllListeners(UPDATE_AVAILABLE);
// });
// ipcRenderer.on(UPDATE_DOWNLOADED, async () => {
//   await windowLoaded;
//   window.postMessage(UPDATE_DOWNLOADED);
//   ipcRenderer.removeAllListeners(UPDATE_DOWNLOADED);
// });

ipcRenderer.on(APP_VERSION, async (_event, arg: { [APP_VERSION]: string }) => {
  await windowLoaded;
  window.postMessage(APP_VERSION + ':' + arg[APP_VERSION]);
});

contextBridge.exposeInMainWorld(API, WINDOW_API);
