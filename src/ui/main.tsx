import React, { useEffect, useState } from 'react';
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
      setLog(prevLog => [...prevLog, ...lines]);
    }
  };

  useEffect(() => {
    window.addEventListener(MESSAGE, interceptAgentLog);

    return () => {
      window.removeEventListener(MESSAGE, interceptAgentLog);
    };

  }, [log]);

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
        isConnected={ isConnected }
        log={ log }
        setPage={ setPage }
      />
    );
  }
  return <></>;
};
