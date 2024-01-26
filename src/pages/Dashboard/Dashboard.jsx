import React, { useContext } from 'react';
import ThemeModeContext from '../../provider/contexts/ThemeMode';
import { CssBaseline, Paper, Switch } from '@mui/material';

export default function Dashboard() {
  const { themeMode, toggleThemeMode } = useContext(ThemeModeContext);

  return (
    <>
      <CssBaseline />
      <div>Dashboard</div>
      <Switch onChange={toggleThemeMode} color="primary" />
      <div>Mode : {themeMode}</div>
      <Paper elevation={0} sx={{ height: 300 }}>
        Lorem ipsum dolor sit.
      </Paper>
    </>
  );
}