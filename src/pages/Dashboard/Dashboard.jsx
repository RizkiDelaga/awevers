import React, { useContext } from 'react';
import ThemeModeContext from '../../provider/contexts/ThemeModeContext';
import { Paper } from '@mui/material';

export default function Dashboard() {
  const { themeMode, toggleThemeMode } = useContext(ThemeModeContext);

  return (
    <>
      <div>Dashboard</div>

      <Paper elevation={0} sx={{ height: 300 }}>
        Lorem ipsum dolor sit.
      </Paper>
    </>
  );
}
