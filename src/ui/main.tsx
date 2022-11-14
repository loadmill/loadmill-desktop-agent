import React, { useEffect, useState } from 'react';
import { Console } from './console';
import { ConnectPage } from './connect-page';

export type Page = 'connect' | 'console';

export const Main = (): JSX.Element => {
  const [page, setPage] = useState<Page>('connect');
  const [token, setToken] = useState<string>('');
  const [log, setLog] = useState<string[]>([]);
  const [i, setI] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setI(i + 1);
      setLog(prevLog => [...prevLog, i + '']);
    }, 500);
    return () => clearInterval(interval);
  }, [log, i]);

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
