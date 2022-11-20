/**
 * This module provides a nice interface to send messages from main process to renderer process.
 */
import { BrowserWindow } from 'electron';
import log from 'electron-log';

const MainToRender = {
  mainWindow: null as BrowserWindow,
};

export const init = (mainWindow: BrowserWindow): void => {
  if (!MainToRender.mainWindow) {
    MainToRender.mainWindow = mainWindow;
  }
};

export const send = (channel: string, msg: string): void => {
  log.info('sending to renderer', { channel, msg });
  if (MainToRender.mainWindow) {
    MainToRender.mainWindow.webContents.send(channel, msg);
  } else {
    log.warn('Cannot send from Main process to Renderer Process. Reason: No mainWindow on MainToRender object.', {
      channel, msg
    });
  }
};
