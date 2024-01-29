import { Box, LinearProgress } from '@mui/material';
import axios from 'axios';
import React, { useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router';

export default function SSOValidation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [progress, setProgress] = React.useState(0);
  const routerParams_directTo = new URLSearchParams(location.search).get('directTo');

  const SSOValidator = () => {
    if (localStorage.getItem('accessToken')) {
      return (window.location.href = `${routerParams_directTo}/SSOProcess?token=${localStorage.getItem(
        'accessToken'
      )}`);
    } else {
      return navigate(`/Login?directTo=${routerParams_directTo}`);
    }
  };

  useEffect(() => {
    setTimeout(SSOValidator, 3000);

    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(timer);
          return 100;
        }
        return Math.min(oldProgress + 100 / (3000 / 50), 100);
      });
    }, 50);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50% , -50%)' }}>
      <LinearProgress variant="determinate" value={progress} />
      <h2 style={{ textAlign: 'center' }}>Single Sign-On Validation</h2>
    </Box>
  );
}
