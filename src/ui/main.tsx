import React, { SyntheticEvent, useEffect, useRef, useState } from 'react';

import {
  IS_AGENT_CONNECTED,
  MESSAGE,
  STDERR,
  STDOUT
} from '../constants';
import { isFromPreload } from '../inter-process-utils';
import { ProcessMessageRenderer } from '../types/messaging';
import { textToNonEmptyLines } from '../utils';

import {
  GoBackIconButton,
  GoToConsoleIconButton,
  ScrollToBottomIconButton
} from './actions-icon-buttons';
import { ConnectPage } from './connect-page';
import { Console } from './console';
import { Header } from './header';
import { LinkToAgentDocs } from './link-to-agent-docs';

export type Page = 'connect' | 'console';

export const Main: React.FC<MainProps> = (): JSX.Element => {
  const [page, setPage] = useState<Page>('connect');
  const [token, setToken] = useState<string>('');
  const [log, setLog] = useState<string[]>([]);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  const onAgentStdoutMsg = ({ text }: ProcessMessageRenderer['data']) => {
    if (text && (text.includes('[INFO]') || text.includes('[ERROR]'))) {
      const lines = textToNonEmptyLines(text);
      setLog(prevLog => [...prevLog, ...lines]);
    }
  };

  const onIsConnectedMsg = (data: ProcessMessageRenderer['data']) => {
    setIsConnected(!!data?.isConnected);
  };

  const onPreloadMessage = (event: MessageEvent<ProcessMessageRenderer>) => {
    if (isFromPreload(event)) {
      const { data: { type, data } } = event;
      switch (type) {
        case STDOUT:
        case STDERR:
          onAgentStdoutMsg(data);
          break;
        case IS_AGENT_CONNECTED:
          onIsConnectedMsg(data);
          break;
        default:
          break;
      }
    }

  };

  const onMessage = (event: MessageEvent<ProcessMessageRenderer>) => {
    onPreloadMessage(event);
  };

  useEffect(() => {
    setTimeout(window.api.isAgentConnected, 250);
    window.addEventListener(MESSAGE, onMessage);

    return () => {
      window.removeEventListener(MESSAGE, onMessage);
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
              isDisabled={ log.length === 0 }
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

export type MainProps = {};
