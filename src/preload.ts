import { contextBridge, ipcRenderer } from 'electron';
import {
  API,
  APP_VERSION,
  CHECK_FOR_UPDATES,
  GET_APP_VERSION,
  START_AGENT,
  STDERR,
  STDOUT,
  STOP_AGENT,
} from './constants';

export const WINDOW_API = {
  checkForUpdates: (msg?: string): void => ipcRenderer.send(CHECK_FOR_UPDATES, msg),
  getVersion: (msg?: string): void => ipcRenderer.send(GET_APP_VERSION, msg),
  startAgent: (msg: string): void => ipcRenderer.send(START_AGENT, msg),
  stopAgent: (msg?: string): void => ipcRenderer.send(STOP_AGENT, msg),
};

const windowLoaded = new Promise(resolve => {
  window.onload = resolve;
});

ipcRenderer.on(APP_VERSION, async (_event, arg: { [APP_VERSION]: string }) => {
  await windowLoaded;
  window.postMessage(APP_VERSION + ':' + arg[APP_VERSION]);
});

ipcRenderer.on(STDOUT, async (_event, msg: string) => {
  await windowLoaded;
  window.postMessage({ data: msg, type: STDOUT });
});

ipcRenderer.on(STDERR, async (_event, msg: string) => {
  await windowLoaded;
  window.postMessage({ data: msg, type: STDERR });
});

contextBridge.exposeInMainWorld(API, WINDOW_API);
