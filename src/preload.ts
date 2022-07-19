import { contextBridge, ipcRenderer } from 'electron';
import { START_AGENT, STOP_AGENT } from './constants';

export const WINDOW_API = {
  startAgent: (msg: string) => ipcRenderer.send(START_AGENT, msg),
  stopAgent: (msg?: string) => ipcRenderer.send(STOP_AGENT, msg),
};

contextBridge.exposeInMainWorld('api', WINDOW_API);
