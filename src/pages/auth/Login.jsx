import { Button, TextField } from '@mui/material';
import axios from 'axios';
import { Fragment, useState } from 'react';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useLocation, useNavigate } from 'react-router';

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formLogin, setFormLogin] = useState({
    email: '',
    password: '',
  });

  const location = useLocation();
  const routerParams_directTo = new URLSearchParams(location.search).get('directTo');

  const handleLogin = async () => {
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

      switch (routerParams_directTo) {
        case 'pocketlink.com':
          window.location.href = `https://first-program.vercel.app/LoginProcess?token=${res.data.accessToken}`;
          break;
        case 'masterpad.com':
          window.location.href = `https://first-program.vercel.app/quill`;
          break;
        default:
          navigate('');
          break;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <TextField
            required
            variant="standard"
            label="Email"
            type="text"
            value={formLogin.email}
            onChange={(e) => {
              setFormLogin({ ...formLogin, email: e.target.value });
            }}
            autoComplete="off"
            sx={{ width: '100%' }}
          />

          <TextField
            required
            variant="standard"
            label="Password"
            type="text"
            value={formLogin.password}
            onChange={(e) => {
              setFormLogin({ ...formLogin, password: e.target.value });
            }}
            autoComplete="off"
            sx={{ width: '100%' }}
          />

          <Button variant="contained" size="large" type="submit" sx={{ width: '100%', fontWeight: 'bold' }}>
            Masuk
          </Button>
        </form>
      </div>
    </Fragment>
  );
}

export default Login;
