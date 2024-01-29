import { Box } from '@mui/material';
import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Outlet, useNavigate } from 'react-router-dom';
import DefaultNavBar from '../components/NavBar/DefaultNavBar';

export default function DefaultLayout() {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <>
      <DefaultNavBar />

      <Box
        sx={{
          flexGrow: 1,
          paddingBottom: `24px`,
          paddingX: '24px',
          [theme.breakpoints.down('md')]: {
            paddingX: '8px',
            marginLeft: '0 !important',
          },
        }}
      >
        <Outlet />
      </Box>
    </>
  );
}
