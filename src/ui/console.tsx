import React, { Ref, SyntheticEvent, useEffect, useRef } from 'react';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';

import { Page } from './main';
import { LoadmillTitle } from './loadmill-title';
import {
  ScrollToBottomIconButton,
  StopIconButton,
} from './actions-icon-buttons';

export const Console = ({
  handleStop,
  isConnected,
  log,
  setPage,
}: {
  handleStop: (e: SyntheticEvent) => void;
  isConnected: boolean;
  log: string[];
  setPage: React.Dispatch<React.SetStateAction<Page>>;
}): JSX.Element => {

  const scrollRef = useRef(null);

  const scrollToBottom = (): void => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behaviour: 'smooth' });
    }
  };

  return (
    <div>
      <div
        style={ {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        } }
      >
        <Tooltip
          placement='bottom'
          title='Back'
        >
          <IconButton
            onClick={ () => setPage('connect') }
          >
            <ArrowCircleLeftOutlinedIcon
              color='primary'
              fontSize='large'
            />
          </IconButton>
        </Tooltip>
        <LoadmillTitle
          isConnected={ isConnected }
        />
        <div>
          <StopIconButton
            disabled={ !isConnected }
            onStopClicked={ handleStop }
          />
          <ScrollToBottomIconButton
            onScrollToBottomClicked={ scrollToBottom }
          />
        </div>
      </div>
      <div
        style={ { overflow: 'scroll', maxHeight: 650 } }
      >
        <ScrollableList
          log={ log }
          scrollRef={ scrollRef }
          scrollToBottom={ scrollToBottom }
        />
      </div>
    </div>
  );
};

export function ScrollableList({
  log,
  scrollToBottom,
  scrollRef,
}: {
  log: string[];
  scrollRef: Ref<HTMLLIElement>;
  scrollToBottom: () => void;
}): JSX.Element {

  useEffect(() => {
    scrollToBottom();
  }, [log, scrollToBottom]);

  return (
    <List dense>
      {log.map((l, i) => (
        <LogEvent
          event={ l }
          key={ i }
        />
      ))}
      <ListItem
        ref={ scrollRef }
      />
    </List>
  );
}

const LogEvent = ({ event }: { event: string; }): JSX.Element => {
  const eventColor = event.includes('[INFO]') ?
    'lightgreen' :
    event.includes('[ERROR]') ?
      'red' :
      'inherit';
  return (
    <ListItem >
      <ListItemText
        primary={
          <span
            style={ {
              fontFamily: 'monospace',
              color: eventColor,
            } }
          >
            {event}
          </span>
        }
      />
    </ListItem>
  );
};
