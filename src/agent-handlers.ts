import { ipcMain } from 'electron';

import { start } from '@loadmill/agent';
import { START_AGENT, STOP_AGENT } from './constants';

let stop: () => void;

ipcMain.on(START_AGENT, (_event, token) => {
  if (token) {
    console.log("starting agent...")
    stop = start({ token });
  }
});

ipcMain.on(STOP_AGENT, (_event) => {
  if (stop) {
    console.log("stopping agent...")
    stop()
  }
});
