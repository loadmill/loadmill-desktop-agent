import { start } from '@loadmill/agent';

import log from './log';
import { START_AGENT, STOP_AGENT } from './constants';

let stop: () => void | undefined;

process.on('message', ({ type, data: token }: ParentProcessMessage) => {
  if (type === START_AGENT) {
    log.info('Got START_AGENT msg');
    if (token) {
      log.info('starting agent...');
      stop = start({ token });
    }
  }
});

process.on('message', ({ type }: ParentProcessMessage) => {
  if (type === STOP_AGENT) {
    log.info('Got STOP_AGENT msg');
    if (stop) {
      log.info('stopping agent...');
      stop();
      log.info('agent has stopped...');
    }
  }
});

export {};
