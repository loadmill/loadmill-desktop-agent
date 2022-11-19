import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { Page } from './main';

import { LINK_TO_LOADMILL_SECURITY } from '../constants';

const theme = createTheme();

export const ConnectPage = ({
  isConnected,
  setPage,
  setToken,
  token,
}: {
  isConnected: boolean;
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

  return (
    <ThemeProvider theme={ theme }>
      <CssBaseline />
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
  isConnected,
  token,
}: {
  handleChangeToken: (event: React.ChangeEvent<HTMLInputElement>) => void;
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
        disabled={ isConnected }
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
