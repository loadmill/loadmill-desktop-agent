import { app, ipcMain } from 'electron';

import { ChildProcessWithoutNullStreams, fork } from 'child_process';

import '@loadmill/agent/dist/cli';
import {
  DATA,
  LOADMILL_AGENT,
  START_AGENT,
  STDERR,
  STDOUT,
  STOP_AGENT
} from './constants';
import log from './log';
import { send } from './main-to-renderer';

let agent: ChildProcessWithoutNullStreams | null;

const subscribeToStartEvent = () => {
  ipcMain.on(START_AGENT, (_event: Electron.IpcMainEvent, token: string) => {
    if (!agent) {
      log.info('starting agent process...');
      agent = spawnAgent();
      addOnAgentProcessExit();
      if (agent.stdout) {
        log.info('piping agent process stdout');
        pipeAgentStdout();
      }
      if (agent.stderr) {
        pipeAgentStderr();
      }
    }
    if (agent && token) {
      sendToAgentProcess({
        data: token,
        type: START_AGENT,
      });
    }
  });
};

const spawnAgent = (): ChildProcessWithoutNullStreams => {
  return fork(app.getAppPath() + '/.webpack/main/' + LOADMILL_AGENT, {
    stdio: 'pipe',
  });
};

const addOnAgentProcessExit = () => {
  agent.on('exit', (code) => {
    log.info('Agent process exited with code:', code);
  });
};

const pipeAgentStdout = () => {
  agent.stdout.on(DATA, (data: string | Buffer) => {
    const text = Buffer.from(data).toString();
    log.info('Agent:', text);
    send(STDOUT, text);
  });
};

const pipeAgentStderr = () => {
  agent.stderr.on(DATA, (data: string | Buffer) => {
    const text = Buffer.from(data).toString();
    log.info('Agent:', text);
    send(STDERR, text);
  });
};

const subscribeToStopEvent = () => {
  ipcMain.on(STOP_AGENT, (_event: Electron.IpcMainEvent) => {
    log.info('stopping agent...');
    sendToAgentProcess({ type: STOP_AGENT });
  });
};

subscribeToStartEvent();
subscribeToStopEvent();

const sendToAgentProcess = (msg: ParentProcessMessage) => {
  if (agent) {
    agent.send(msg);
  }
};
