import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import React, { Ref, useEffect } from 'react';

export const Console = ({
  log,
  scrollToBottom,
  scrollRef,
}: {
  log: string[];
  scrollRef: Ref<HTMLLIElement>;
  scrollToBottom: () => void;
}): JSX.Element => {

  return (
    <div>
      <div
        style={ {
          maxHeight: 650,
          overflow: 'scroll',
        } }
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
    '#aae682' :
    event.includes('[ERROR]') ?
      '#ff7878' :
      'inherit';
  return (
    <ListItem >
      <ListItemText
        primary={
          <span
            style={ {
              color: eventColor,
              fontFamily: 'monospace',
            } }
          >
            {event}
          </span>
        }
      />
    </ListItem>
  );
};
