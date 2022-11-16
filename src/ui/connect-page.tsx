import React, { SyntheticEvent } from 'react';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { Page } from './main';
import { LoadmillTitle } from './loadmill-title';
import { LINK_TO_LOADMILL_AGENT_DOCS, LINK_TO_LOADMILL_SECURITY } from '../constants';

const theme = createTheme();

export const ConnectPage = ({
  isConnected,
  setIsConnected,
  setPage,
  setToken,
  token,
}: {
  isConnected: boolean;
  setIsConnected: React.Dispatch<React.SetStateAction<boolean>>;
  setPage: React.Dispatch<React.SetStateAction<Page>>;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  token: string;
}): JSX.Element => {

  const handleChangeToken = (event: React.ChangeEvent<HTMLInputElement>) => {
    setToken(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.api.startAgent(token);
    setToken('');
    setPage('console');
  };

  const handleStop = (_event: SyntheticEvent) => {
    setIsConnected(false);
    window.api.stopAgent();
  };

  return (
    <ThemeProvider theme={ theme }>
      <CssBaseline />
      <div
        style={ {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        } }
      >
        <Link
          href={ LINK_TO_LOADMILL_AGENT_DOCS }
          target='_blank'
        >
          <IconButton>
            <InfoOutlinedIcon
              color='primary'
              fontSize='large'
            />
          </IconButton>
        </Link>
        <LoadmillTitle/>
        <Tooltip
          placement='right'
          title='Console'
        >
          <IconButton
            onClick={ () => setPage('console') }
          >
            <ArrowCircleRightOutlinedIcon
              color='primary'
              fontSize='large'
            />

          </IconButton>
        </Tooltip>
      </div>
      <Container
        component='main'
        maxWidth='xs'
      >
        <Box
          sx={ {
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          } }
        >
          <ConnectForm
            handleChangeToken={ handleChangeToken }
            handleStop={ handleStop }
            handleSubmit={ handleSubmit }
            isConnected={ isConnected }
            token={ token }
          />
        </Box>
      </Container>
    </ThemeProvider>
  );
};

function ConnectForm({
  handleChangeToken,
  handleSubmit,
  handleStop,
  isConnected,
  token,
}: {
  handleChangeToken: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleStop: (_event: SyntheticEvent) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  isConnected: boolean;
  token: string;
}): JSX.Element {
  return (
    <Box
      component='form'
      noValidate
      onSubmit={ handleSubmit }
      sx={ { mt: 1 } }
    >
      <TextField
        autoComplete='Token'
        autoFocus
        fullWidth
        id='token'
        label='Token'
        margin='normal'
        name='token'
        onChange={ handleChangeToken }
        value={ token }
      />
      <Button
        disabled={ !token }
        fullWidth
        sx={ { mt: 3, mb: 2 } }
        type='submit'
        variant='contained'
      >
        Connect
      </Button>
      <Button
        disabled={ !isConnected }
        fullWidth
        onClick={ handleStop }
        sx={ { mt: 3, mb: 2 } }
        variant='outlined'
      >
        Stop Agent
      </Button>
      <Grid container>
        <Grid
          item
          xs
        >
          <Link
            href={ LINK_TO_LOADMILL_SECURITY }
            target='_blank'
            underline='hover'
            variant='body2'
          >
            Generate a Loadmill token
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
}
