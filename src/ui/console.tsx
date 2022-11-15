import React, { useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { Page } from './main';

export const Console = ({ log, setPage }: {
  log: string[];
  setPage: React.Dispatch<React.SetStateAction<Page>>;
}): JSX.Element =>
  (
    <>
      <div>
        <Button onClick={ () => setPage('connect') }>Back</Button>
      </div>
      <div style={ { maxHeight: 500, overflow: 'auto' } }>
        <ScrollableList log={ log } />
      </div>
    </>
  );

export function ScrollableList({ log }: { log: string[]; }): JSX.Element {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behaviour: 'smooth' });
    }
  }, [log]);
  return (
    <Box sx={ { flexGrow: 1, maxWidth: 752 } }>
      <Grid
        container
        spacing={ 2 }
      >
        <Grid
          item
          md={ 6 }
          xs={ 12 }
        >
          <List dense>
            {log.map(l => (
              <ListItem>
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
