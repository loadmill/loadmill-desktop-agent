import React, { useState } from 'react';
import { Console } from './console';
import { NewHome } from './new-home';

export type Page = 'connect' | 'console';

export const Main = (): JSX.Element => {
  const [page, setPage] = useState<Page>('connect');
  const [token, setToken] = useState<string>('');
  const [log, setLog] = useState<string[]>([]);
  const [i, setI] = useState<number>(0);

  setInterval(() => {
    setI(i => i + 1);
    setLog(prevLog => [...prevLog, i + '']);
  }, 3000);

  if (page === 'connect') {
    return (
      <NewHome
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
