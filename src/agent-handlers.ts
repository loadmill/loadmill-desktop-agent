import { ipcMain } from 'electron';
import log from 'electron-log';
import { ChildProcessWithoutNullStreams, spawn } from 'child_process';

import { send } from './main-to-renderer';
import {
  DATA,
  LOADMILL_AGENT,
  START_AGENT, STDERR,
  STDOUT,
  STOP_AGENT
} from './constants';

let agent: ChildProcessWithoutNullStreams | null;

const subscribeToStartEvent = () => {
  ipcMain.on(START_AGENT, (_event: Electron.IpcMainEvent, token: string) => {
    if (!agent && token) {
      log.info('starting agent...');
      agent = spawnAgent(token);
      handleAgentExit();
      if (agent) {
        if (agent.stdout) {
          pipeAgentStdout();
        }
        if (agent.stderr) {
          pipeAgentStderr();
        }
      }
    }
  });
};

const spawnAgent = (token: string): ChildProcessWithoutNullStreams => {
  return spawn(LOADMILL_AGENT, ['start', '-t', token]);
};

const handleAgentExit = () => {
  agent.on('exit', () => {
    log.info('in exit');
    killAgent();
  });
};

const pipeAgentStdout = () => {
  agent.stdout.on(DATA, (data: string | Buffer) => {
    const text = Buffer.from(data).toString();
    send(STDOUT, text);
  });
};

const pipeAgentStderr = () => {
  agent.stderr.on(DATA, (data: string | Buffer) => {
    const text = Buffer.from(data).toString();
    send(STDERR, text);
    killAgentOnIvalidToken(text);
  });
};

const killAgentOnIvalidToken = (data: string) => {
  if (data && data.includes('Invalid token')) {
    killAgent();
  }
};

const killAgent = () => {
  if (agent) {
    log.info('Killing agent...');
    agent.removeAllListeners();
    agent.kill();
    agent = null;
  }
};

const subscribeToStopEvent = () => {
  ipcMain.on(STOP_AGENT, (_event: Electron.IpcMainEvent) => {
    log.info('stopping agent...');
    killAgent();
  });
};

subscribeToStartEvent();
subscribeToStopEvent();
