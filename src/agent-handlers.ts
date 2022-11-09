import { ipcMain } from 'electron';
import { start } from '@loadmill/agent';
import { START_AGENT, STOP_AGENT } from './constants';

const CONSOLE = console;
let stop: () => void;

ipcMain.on(START_AGENT, (_event, token) => {
  if (token) {
    CONSOLE.log('starting agent...');
    stop = start({ token });
  }
});

ipcMain.on(STOP_AGENT, (_event) => {
  if (stop) {
    CONSOLE.log('stopping agent...');
    stop();
  }
});
