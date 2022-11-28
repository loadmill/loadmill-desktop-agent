/**
 * This module provides a nice interface to send messages from main process to renderer process.
 */
import { BrowserWindow } from 'electron';

import log from './log';
import { InterProcessMessage } from './types/messaging';

const MainToRender = {
  mainWindow: null as BrowserWindow,
};

export const init = (mainWindow: BrowserWindow): void => {
  MainToRender.mainWindow = mainWindow;
};

export const send = ({ type: channel, data: msg }: InterProcessMessage): void => {
  try {
    log.debug('Sending to renderer', { channel, msg });
    if (MainToRender.mainWindow?.webContents) {
      MainToRender.mainWindow.webContents.send(channel, msg);
    } else {
      log.warn('Cannot send from Main process to Renderer Process. Reason: No mainWindow on MainToRender object.', {
        channel, msg
      });
    }
  } catch (e) {
    log.error('error in send main to renderer', e);
  }
};
