import '@loadmill/agent/dist/cli';
import { app, ipcMain } from 'electron';

import { ChildProcessWithoutNullStreams, fork } from 'child_process';

import {
  DATA,
  IS_AGENT_CONNECTED,
  LOADMILL_AGENT,
  START_AGENT,
  STDERR,
  STDOUT,
  STOP_AGENT
} from './constants';
import log from './log';
import { send } from './main-to-renderer';
import { InterProcessMessage } from './types/messaging';

let agent: ChildProcessWithoutNullStreams | null;

const subscribeToStartFromRenderer = () => {
  ipcMain.on(START_AGENT, startAgent);
};

const startAgent = (_event: Electron.IpcMainEvent, token: string) => {
  if (!agent || !agent.connected) {
    initAgent();
  }
  if (agent && token) {
    sendToAgentProcess({
      data: token,
      type: START_AGENT,
    });
  }
};

const initAgent = () => {
  agent = createAgentProcess();
  addOnAgentProcessExit();
  addOnAgentIsConnectedEvent();
  if (agent.stdout) {
    pipeAgentStdout();
  }
  if (agent.stderr) {
    pipeAgentStderr();
  }
};

const createAgentProcess = (): ChildProcessWithoutNullStreams => {
  return fork(app.getAppPath() + '/.webpack/main/' + LOADMILL_AGENT, {
    stdio: 'pipe',
  });
};

const addOnAgentProcessExit = () => {
  agent.on('exit', (code) => {
    log.info('Agent process exited with code:', code);
  });
};

const addOnAgentIsConnectedEvent = (): void => {
  agent.on('message', ({ data, type }: InterProcessMessage) => {
    if (type === IS_AGENT_CONNECTED) {
      setTimeout(() => {
        send({ data, type: IS_AGENT_CONNECTED });
      },
      500);
    }
  });
};

const pipeAgentStdout = () => {
  agent.stdout.on(DATA, (data: string | Buffer) => {
    const text = Buffer.from(data).toString();
    log.info('Agent:', text);
    send({ data: text, type: STDOUT });
  });
};

const pipeAgentStderr = () => {
  agent.stderr.on(DATA, (data: string | Buffer) => {
    const text = Buffer.from(data).toString();
    log.info('Agent:', text);
    send({ data: text, type: STDERR });
  });
};

const subscribeToStopFromRenderer = () => {
  ipcMain.on(STOP_AGENT, (_event: Electron.IpcMainEvent) => {
    log.info('Stopping agent...');
    sendToAgentProcess({ type: STOP_AGENT });
  });
};

export const subscribeToIsConnectedFromRenderer = (): void => {
  ipcMain.on(IS_AGENT_CONNECTED, (_event: Electron.IpcMainEvent) => {
    if (agent && agent.connected) {
      sendToAgentProcess({ type: IS_AGENT_CONNECTED });
    }
  });
};

export const subscribeToRendererEvents = (): void => {
  subscribeToStartFromRenderer();
  subscribeToStopFromRenderer();
  subscribeToIsConnectedFromRenderer();
};

subscribeToRendererEvents();

const sendToAgentProcess = (msg: InterProcessMessage) => {
  if (agent && agent.connected) {
    agent.send(msg);
  }
};
