// import Brightness4Icon from '@mui/icons-material/Brightness4';
// import Brightness7Icon from '@mui/icons-material/Brightness7';
// import { PaletteMode } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
// import IconButton from '@mui/material/IconButton';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React/* , { createContext, useMemo, useState } */ from 'react';

import { Main } from './main';

// const ColorModeContext = createContext({ toggleColorMode: () => {} });

const darkTheme = createTheme({
  palette: {
    background: {
      default: '#101e2c',
      paper: '#101e2c',
    },
    mode: 'dark',
    primary: {
      main: '#00B1FF',
    },
    text: {
      primary: '#bdd2e7',
    },
  }
});

// const darkModeTheme = createTheme(getDesignTokens('dark'));

export const ThemeWrapper: React.FC<ThemeWrapperProps> = (): JSX.Element => {
  // const [mode, setMode] = useState<PaletteMode>('light' as PaletteMode);
  // const colorMode = useMemo(
  //   () => ({
  //     toggleColorMode: () => {
  //       setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  //     },
  //   }),
  //   [],
  // );

  // const theme = useMemo(
  //   () => {
  //     return createTheme({
  //       palette: {
  //         mode: 'light',
  //         ...(mode === 'light' ? {} : darkTheme)
  //       }
  //     });
  //   },
  //   [mode],
  // );

  return (
    // <ColorModeContext.Provider value={ colorMode }>
    <ThemeProvider theme={ darkTheme }>
      <CssBaseline />
      {/* <div>
          <IconButton
            color="inherit"
            onClick={ colorMode.toggleColorMode }
            sx={ { ml: 1 } }
          >
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton> */}
      <Main/>
      {/* </div> */}
    </ThemeProvider>
    // </ColorModeContext.Provider>
  );
};

export type ThemeWrapperProps = {};
