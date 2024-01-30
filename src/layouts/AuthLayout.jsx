import { Box, Grid, Paper } from '@mui/material';
import { Fragment } from 'react';
import { Outlet } from 'react-router';

function AuthLayout() {
  return (
    <Fragment>
      <Grid
        container
        sx={{
          height: { xs: 'none', md: '100%' },
          display: 'flex',
          flexDirection: { xs: 'column-reverse', md: 'row' },
        }}
      >
        <Grid
          item
          xs={12}
          md={5}
          lg={4}
          sx={{
            height: '100vh',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              bgcolor: 'primary.main',
              height: '100%',
              overflowY: 'auto',
              p: { xs: 2, md: 3 },
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <img
                src="https://images.unsplash.com/photo-1618768400447-a4dc4a2c64bb?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                style={{ width: '80px', height: '100%', maxHeight: '35px', objectFit: 'cover' }}
                alt=""
              />
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box>
                <div style={{ fontSize: '38px', fontWeight: 'bold' }}>Sigle Sign-On Authentication</div>
                <h2 style={{ m: 0, marginTop: '4px', marginBottom: '4px' }}>One account for all Awevers products!</h2>
                <div>
                  Awevers simplifies your experience by allowing you to log in once to access a variety of services. No
                  need to log in multiple times — just one secure entry point to enjoy the convenience of our platform.
                </div>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Box
                  component={'img'}
                  src="https://images.unsplash.com/photo-1602347615074-470b2dd82bcb?q=80&w=1957&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  sx={{
                    width: { xs: '80%', sm: '60%', md: '60%' },
                    objectFit: 'cover',
                  }}
                  alt=""
                />
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                &#169;2024 <strong>Awevers</strong>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={7}
          lg={8}
          sx={{
            height: '100vh',
          }}
        >
          <Box
            sx={{
              height: '100%',
              overflowY: 'auto',
              px: { xs: 2, md: 3 },
              py: { xs: 4, md: 6 },
            }}
          >
            <Outlet />
          </Box>
        </Grid>
      </Grid>
    </Fragment>
  );
}

export default AuthLayout;
