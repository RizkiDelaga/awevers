import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Container,
  Divider,
  FormControlLabel,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { Fragment, useState } from 'react';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [rememberDevice, setRememberDevice] = useState(localStorage.getItem('rememberDevice') || false);
  const [showPassword, setShowPassword] = useState(false);
  const [formLogin, setFormLogin] = useState({
    email: '',
    password: '',
  });

  const location = useLocation();
  const routerParams_directTo = new URLSearchParams(location.search).get('directTo');

  const handleLogin = async () => {
    setLoading(!loading);

    try {
      const res = await axios({
        method: 'POST',
        url: `${process.env.REACT_APP_API_KEY}/api/v1/user/login`,
        data: {
          email: formLogin.email,
          password: formLogin.password,
        },
      });
      localStorage.setItem('accessToken', res.data.accessToken);

      if (routerParams_directTo) {
        window.location.href = `${routerParams_directTo}/SSOProcess?token=${res.data.accessToken}`;
        return null;
      }
      navigate('/Dashboard');
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Set loading to false after the asynchronous operation (whether it succeeds or fails)
    }
  };

  return (
    <Fragment>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', mb: 6 }}>
        <img
          src="https://images.unsplash.com/photo-1618768400447-a4dc4a2c64bb?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          style={{ width: '80px', height: '100%', maxHeight: '35px', objectFit: 'cover' }}
          alt=""
        />
        <h3 style={{ marginTop: '8px', marginBottom: '8px' }}>Hi! Welcome back</h3>
        <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Box sx={{ mr: 1 }}>First time at Awevers?</Box>
          <Link to="/Register">
            <Box sx={{ color: 'primary.main' }}>Register for free</Box>
          </Link>
        </Box>
      </Box>

      <Container maxWidth="sm">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <TextField
            required
            variant="outlined"
            label="Email"
            type="email"
            value={formLogin.email}
            onChange={(e) => {
              setFormLogin({ ...formLogin, email: e.target.value });
            }}
            autoComplete="off"
            sx={{ width: '100%', mb: 2 }}
          />

          <TextField
            required
            variant="outlined"
            label="Password"
            type="password"
            value={formLogin.password}
            onChange={(e) => {
              setFormLogin({ ...formLogin, password: e.target.value });
            }}
            autoComplete="off"
            sx={{ width: '100%', mb: 2 }}
          />

          <Box sx={{ position: 'relative' }}>
            <Button
              variant="contained"
              size="large"
              type="submit"
              disabled={loading}
              sx={{ width: '100%', fontWeight: 'bold', mb: 2 }}
            >
              Masuk
            </Button>

            {loading && (
              <CircularProgress
                size={24}
                color="primary"
                sx={{
                  // color: green[500],
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginTop: '-20px',
                  marginLeft: '-12px',
                }}
              />
            )}
          </Box>
        </form>
        <Box sx={{ display: 'flex', justifyContent: 'end', mb: 2 }}>
          <Link to={'/ForgotPassword'}>
            <Typography sx={{ width: 'fit-content' }}>Forgot Password?</Typography>
          </Link>
        </Box>

        <Divider />
        <FormControlLabel
          control={<Checkbox checked={rememberDevice} onChange={() => setRememberDevice(!rememberDevice)} />}
          label="Remember this device"
          labelPlacement="end"
        />
        <Divider />

        <Box sx={{ textAlign: 'center', mt: 2 }}>
          By continuing, you accept our{' '}
          <Link to={'/TermsOfUse'}>
            <strong>Terms of Use</strong>
          </Link>{' '}
          and{' '}
          <Link to={'/PrivacyPolicy'}>
            <strong>Privacy Policy</strong>
          </Link>
        </Box>
      </Container>
    </Fragment>
  );
}

export default Login;
