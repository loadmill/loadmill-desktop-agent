import { ipcMain } from 'electron';
import { ChildProcessByStdio, spawn } from 'child_process';
import { Readable, Writable } from 'node:stream';

import { START_AGENT, STOP_AGENT } from './constants';

const CONSOLE = console;
let agent: ChildProcessByStdio<Writable, Readable, Readable> | null;

ipcMain.on(START_AGENT, (_event, token) => {
  if (!agent && token) {
    CONSOLE.log('starting agent...');
    agent = spawn('loadmill-agent', ['start', '-t', token]);

    if (agent) {
      if (agent.stdout) {
        agent.stdout.on('data', (data: string) => {
          CONSOLE.log('stdout: ' + data);
        });
      }
      if (agent.stderr) {
        agent.stderr.on('data', (data: string) => {
          CONSOLE.error('stderr: ' + data);
          if (data && data.includes('Invalid token')) {
            killAgent();
          }
        });
      }
    }
  }
});

ipcMain.on(STOP_AGENT, (_event) => {
  CONSOLE.log('stopping agent...');
  killAgent();
});

const killAgent = () => {
  if (agent) {
    CONSOLE.log('Killing agent...');
    agent.removeAllListeners();
    agent.kill();
    agent = null;
  }
};
