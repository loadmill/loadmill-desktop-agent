import { start } from '@loadmill/agent';

import {
  CONNECTED,
  DISCONNECTED,
  IS_AGENT_CONNECTED,
  START_AGENT,
  STOP_AGENT
} from './constants';
import { InterProcessMessage } from './types/messaging';

let stop: () => void | undefined | null = null;

process.on('message', ({ type, data: token }: InterProcessMessage) => {
  if (type === START_AGENT) {
    if (token) {
      stop = start({ token });
    }
  }
});

process.on('message', ({ type }: InterProcessMessage) => {
  if (type === STOP_AGENT) {
    if (stop) {
      stop();
      stop = null;
    }
  }
});

process.on('message', (arnon: InterProcessMessage) => {
  if (arnon.type === IS_AGENT_CONNECTED) {
    process.send({
      data: stop ? CONNECTED : DISCONNECTED,
      type: IS_AGENT_CONNECTED,
    });
  }
});

export {};
