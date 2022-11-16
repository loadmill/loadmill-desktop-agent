import React, { SyntheticEvent } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Page } from './main';
import { LoadmillTitle } from './loadmill-title';
import { LINK_TO_LOADMILL_SECURITY } from '../constants';

const theme = createTheme();

export const ConnectPage = ({ token, setToken, setPage }: {
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
    window.api.stopAgent();
  };

  return (
    <ThemeProvider theme={ theme }>
      <Container
        component='main'
        maxWidth='xs'
      >
        <CssBaseline />
        <Box
          sx={ {
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          } }
        >
          <LoadmillTitle/>
          <ConnectForm
            handleChangeToken={ handleChangeToken }
            handleStop={ handleStop }
            handleSubmit={ handleSubmit }
            token={ token }
          />
        </Box>
      </Container>
    </ThemeProvider>
  );
};

function ConnectForm({ handleSubmit, handleStop, handleChangeToken, token }: {
  handleChangeToken: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleStop: (_event: SyntheticEvent) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
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
        fullWidth
        sx={ { mt: 3, mb: 2 } }
        type='submit'
        variant='contained'
      >
        Connect
      </Button>
      <Button
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
