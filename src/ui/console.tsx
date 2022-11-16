import React, { Ref, useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { useScrollDirection } from 'react-use-scroll-direction';

import { Page } from './main';

export const Console = ({ log, setPage }: {
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
      <div>
        <Button onClick={ () => setPage('connect') }>Back</Button>
      </div>
      <Button onClick={ onScrollToBottomClicked }>
        Scroll To Bottom
      </Button>
      <div
        onScroll={ () => isScrollingUp && onScrollUp() }
        style={ { maxHeight: 500, overflow: 'auto' } }
      >
        <ScrollableList
          isScrollingUp={ isScrollingUp }
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
  isScrollingUp,
}: {
  isScrollingUp: boolean;
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
    <Box
      sx={ { flexGrow: 1, maxWidth: 752 } }
    >
      <Grid
        alignItems="flex-start"
        columnSpacing={ 4 }
        container
      >
        <Grid
          item
          md={ 6 }
        >
          <List dense>
            {log.map((l, i) => (
              <ListItem key={ i }>
                <ListItemText
                  primary={
                    <span style={ { fontFamily: 'monospace' } }>
                      {l}
                    </span>
                  }
                />
              </ListItem>
            ))}
            <ListItem ref={ scrollRef } />
          </List>
        </Grid>
      </Grid>
    </Box>
  );
}
