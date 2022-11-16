import React, { Ref, useEffect, useRef, useState } from 'react';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';

import { useScrollDirection } from 'react-use-scroll-direction';

import { Page } from './main';
import { LoadmillTitle } from './loadmill-title';

export const Console = ({
  isConnected,
  log,
  setPage,
}: {
  isConnected: boolean;
  log: string[];
  setPage: React.Dispatch<React.SetStateAction<Page>>;
}): JSX.Element => {
  const [isUserScrolled, setIsUserScrolled] = useState<boolean>(false);
  const { isScrollingUp } = useScrollDirection();

  const scrollRef = useRef(null);

  const scrollToBottom = (): void => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behaviour: 'smooth' });
    }
  };

  const onScrollToBottomClicked = (): void => {
    setIsUserScrolled(false);
    scrollToBottom();
  };

  const onScrollUp = () => setIsUserScrolled(true);

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
          placement='right'
          title='BACK'
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
        <Tooltip
          placement='bottom'
          title='Scroll to bottom'
        >
          <IconButton onClick={ onScrollToBottomClicked }>
            <ArrowCircleDownIcon
              color='primary'
              fontSize='large'
            />
          </IconButton>
        </Tooltip>
      </div>
      <div
        onScroll={ () => isScrollingUp && onScrollUp() }
        style={ { overflow: 'scroll', maxHeight: '80%' } }
      >
        <ScrollableList
          isUserScrolled={ isUserScrolled }
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
  isUserScrolled,
  scrollToBottom,
  scrollRef,
}: {
  isUserScrolled: boolean;
  log: string[];
  scrollRef: Ref<HTMLLIElement>;
  scrollToBottom: () => void;
}): JSX.Element {

  useEffect(() => {
    if (!isUserScrolled) {
      scrollToBottom();
    }
  }, [log, isUserScrolled, scrollToBottom]);

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
