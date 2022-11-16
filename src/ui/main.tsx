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

  const interceptAgentLog = (event: MessageEvent<{ data: string; type: string; }>) => {
    if (isFromPreload(event) && [STDOUT, STDERR].includes(event.data?.type)) {
      const lines = event.data.data.split('\n');
      setLog(prevLog => [...prevLog, ...lines].filter(l => l && l.trim()));
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
        setPage={ setPage }
        setToken={ setToken }
        token={ token }
      />
    );
  } else if (page === 'console') {
    return (
      <Console
        log={ log }
        setPage={ setPage }
      />
    );
  }
  return <></>;
};
