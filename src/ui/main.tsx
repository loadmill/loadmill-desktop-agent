import React, { SyntheticEvent, useEffect, useState } from 'react';
import { Console } from './console';
import { ConnectPage } from './connect-page';
import { isFromPreload } from '../inter-process-utils';
import { MESSAGE, STDERR, STDOUT } from '../constants';

export type Page = 'connect' | 'console';

export const Main = (): JSX.Element => {
  const [page, setPage] = useState<Page>('connect');
  const [token, setToken] = useState<string>('');
  const [log, setLog] = useState<string[]>([]);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  const interceptAgentLog = (event: MessageEvent<{ data: string; type: string; }>) => {
    if (isFromPreload(event) && [STDOUT, STDERR].includes(event.data?.type)) {
      const lines = event.data.data.split('\n').filter(l => l && l.trim());
      if (lines.some(l => l.includes('[INFO] Successfully connected to Loadmill'))) {
        setIsConnected(true);
      }
      if (lines.some(l => l.includes('[INFO] Shutting down gracefully')) ||
         lines.some(l => l.includes('[ERROR] Disconnected from Loadmill'))) {
        setIsConnected(false);
      }
      setLog(prevLog => [...prevLog, ...lines]);
    }
  };

  useEffect(() => {
    window.addEventListener(MESSAGE, interceptAgentLog);

    return () => {
      window.removeEventListener(MESSAGE, interceptAgentLog);
    };
  }, [log]);

  const handleStop = (_event: SyntheticEvent): void => {
    setIsConnected(false);
    window.api.stopAgent();
  };

  if (page === 'connect') {
    return (
      <ConnectPage
        isConnected={ isConnected }
        setIsConnected={ setIsConnected }
        setPage={ setPage }
        setToken={ setToken }
        token={ token }
      />
    );
  } else if (page === 'console') {
    return (
      <Console
        handleStop={ handleStop }
        isConnected={ isConnected }
        log={ log }
        setPage={ setPage }
      />
    );
  }
  return <></>;
};
