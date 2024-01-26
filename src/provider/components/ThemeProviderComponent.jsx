import React, { useContext } from 'react';
import ThemeModeContext from '../contexts/ThemeMode';
import { ThemeProvider, createTheme } from '@mui/material';

export default function ThemeProviderComponent({ children }) {
  const { themeMode } = useContext(ThemeModeContext);

  const theme = createTheme({
    palette: {
      mode: themeMode,
      ...(themeMode === 'light'
        ? {
            // palette values for light mode
            primary: {
              main: '#FF0063',
            },
            secondary: {
              main: '#66BFBF',
            },
            background: {
              default: '#FFFFFF',
              paper: '#EAF6F6',
            },
            text: {
              primary: '#000000',
              // secondary: '#000000',
            },
          }
        : {
            // palette values for dark mode
            primary: {
              main: '#FF0063',
            },
            secondary: {
              main: '#66BFBF',
            },
            background: {
              default: '#000000',
              paper: '#272727',
            },
            text: {
              primary: '#ffffff',
              // secondary: '#eeeeee',
            },
          }),
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: { backgroundImage: 'none' },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            // Default styles
            borderWidth: '2px',
            borderColor: 'theme.palette.primary.main',
            fontWeight: 'bold',

            // Hover styles
            '&:hover': {
              borderWidth: '2px',
              borderColor: 'theme.palette.primary.main',
            },

            // Active styles
            '&:active': {
              borderWidth: '2px',
              borderColor: 'theme.palette.primary.main',
            },

            // Focus styles
            '&:focus': {
              borderWidth: '2px',
              borderColor: 'theme.palette.primary.main',
            },

            // Add other styles as needed
          },
        },
      },
    },
  });
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
