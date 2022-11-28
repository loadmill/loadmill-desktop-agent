import React, { SyntheticEvent, useEffect, useRef, useState } from 'react';

import {
  GoBackIconButton,
  GoToConsoleIconButton,
  ScrollToBottomIconButton
} from './actions-icon-buttons';
import { ConnectPage } from './connect-page';
import { Console } from './console';
import { Header } from './header';
import { LinkToAgentDocs } from './link-to-agent-docs';

import { MESSAGE, STDERR, STDOUT } from '../constants';
import { isFromPreload } from '../inter-process-utils';

export type Page = 'connect' | 'console';

export const Main = (): JSX.Element => {
  const [page, setPage] = useState<Page>('connect');
  const [token, setToken] = useState<string>('');
  const [log, setLog] = useState<string[]>([]);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  const interceptAgentLog = (event: MessageEvent<{ data: string; type: string; }>) => {
    if (
      isFromPreload(event) &&
      [STDOUT, STDERR].includes(event.data?.type) &&
      (event.data?.data.includes('[INFO]') || event.data?.data.includes('[ERROR]'))
    ) {
      const lines = event.data.data.split('\n').filter(l => l && l.trim());
      if (lines.some(l => l.includes('[INFO] Successfully connected to Loadmill'))) {
        setIsConnected(true);
      }
      if (lines.some(l => l.includes('[INFO] Shutting down gracefully')) ||
         lines.some(l => l.includes('[ERROR] Disconnected from Loadmill'))) {
        setIsConnected(false);
      }
      if (lines.some(l => l.includes('[ERROR] The agent is outdated'))) {
        setIsConnected(false);
        window.api.checkForUpdates();
      }
      setLog(prevLog => [...prevLog, ...lines]);
    }
  };

  useEffect(() => {
    window.addEventListener(MESSAGE, interceptAgentLog);

    return () => {
      window.removeEventListener(MESSAGE, interceptAgentLog);
    };
  }, []);

  const handleStop = (_event: SyntheticEvent): void => {
    setIsConnected(false);
    window.api.stopAgent();
  };

  const scrollRef = useRef(null);

  const scrollToBottom = (): void => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behaviour: 'smooth' });
    }
  };

  return (
    <>
      <Header
        handleStop={ handleStop }
        isConnected={ isConnected }
        leftActionButton={
          (page === 'connect') ?
            <LinkToAgentDocs/> :
            <GoBackIconButton
              onGoBackClicked={ () => setPage('connect') }
            />
        }
        rightActionButton={
          (page === 'connect') ?
            <GoToConsoleIconButton
              disabled={ log.length === 0 }
              onGoToConsoleClicked={ () => setPage('console') }
            /> :
            <ScrollToBottomIconButton
              onScrollToBottomClicked={ scrollToBottom }
            />
        }
      />
      { (page === 'connect') ? (
        <ConnectPage
          isConnected={ isConnected }
          setPage={ setPage }
          setToken={ setToken }
          token={ token }
        />
      ) : (
        <Console
          log={ log }
          scrollRef={ scrollRef }
          scrollToBottom={ scrollToBottom }
        />
      ) }
    </>
  );
};
