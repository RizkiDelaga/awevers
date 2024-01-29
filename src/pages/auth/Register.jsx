import { Box, Button, CircularProgress, Container, TextField } from '@mui/material';
import axios from 'axios';
import { Fragment, useState } from 'react';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useLocation, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formRegister, setFormRegister] = useState({
    userName: '',
    phone: null,
    email: '',
    password: '',
    confirmPassword: '',
  });

  const location = useLocation();
  const routerParams_directTo = new URLSearchParams(location.search).get('directTo');

  const handleRegister = async () => {
    setLoading(!loading);

    try {
      const res = await axios({
        method: 'POST',
        url: `${process.env.REACT_APP_API_KEY}/api/v1/user/register`,
        data: {
          username: formRegister.userName,
          phone: formRegister.phone,
          email: formRegister.email,
          password: formRegister.password,
        },
      });
      if (routerParams_directTo) {
        navigate(`/Login?directTo=${routerParams_directTo}`);
      } else {
        navigate('/Login');
      }
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
        <h3 style={{ marginTop: '8px', marginBottom: '8px' }}>Welcome to Awevers</h3>
        <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Box sx={{ mr: 1 }}>Already have an Awevers account?</Box>
          <Link to="/Login">
            <Box sx={{ color: 'primary.main' }}>Login now</Box>
          </Link>
        </Box>
      </Box>

      <Container maxWidth="sm">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (formRegister.password === formRegister.confirmPassword) {
              handleRegister();
            } else {
              alert("Password don't match!");
            }
          }}
        >
          <TextField
            required
            variant="outlined"
            label="Username"
            type="username"
            value={formRegister.userName}
            onChange={(e) => {
              setFormRegister({ ...formRegister, userName: e.target.value });
            }}
            autoComplete="off"
            sx={{ width: '100%', mb: 2 }}
          />

          <TextField
            required
            variant="outlined"
            label="Phone"
            type="number"
            value={formRegister.phone}
            onChange={(e) => {
              setFormRegister({ ...formRegister, phone: e.target.value });
            }}
            autoComplete="off"
            sx={{ width: '100%', mb: 2 }}
          />

          <TextField
            required
            variant="outlined"
            label="Email"
            type="email"
            value={formRegister.email}
            onChange={(e) => {
              setFormRegister({ ...formRegister, email: e.target.value });
            }}
            autoComplete="off"
            sx={{ width: '100%', mb: 2 }}
          />

          <TextField
            required
            variant="outlined"
            label="Password"
            type="password"
            value={formRegister.password}
            onChange={(e) => {
              setFormRegister({ ...formRegister, password: e.target.value });
            }}
            autoComplete="off"
            sx={{ width: '100%', mb: 2 }}
          />

          <TextField
            required
            variant="outlined"
            label="Confirm Password"
            type="password"
            value={formRegister.confirmPassword}
            onChange={(e) => {
              setFormRegister({ ...formRegister, confirmPassword: e.target.value });
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
              Register
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

        <Box sx={{ textAlign: 'center', mt: 2 }}>
          By continuing, you accept our{' '}
          <Link to={'/TermsOfUse'} target="_blank" rel="noopener noreferrer">
            <strong>Terms of Use</strong>
          </Link>{' '}
          and{' '}
          <Link to={'/PrivacyPolicy'} target="_blank" rel="noopener noreferrer">
            <strong>Privacy Policy</strong>
          </Link>
        </Box>
      </Container>
    </Fragment>
  );
}

export default Register;
