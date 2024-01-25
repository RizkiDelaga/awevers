import { Button } from '@mui/material';
import { useNavigate } from 'react-router';

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <h1>Home</h1>
      <Button variant="outlined" onClick={() => navigate('/Login')}>
        Login
      </Button>
      <Button variant="outlined" onClick={() => navigate('/Register')}>
        Register
      </Button>

      <Button variant="outlined" onClick={() => navigate('/Login?directTo=pocketlink.com')}>
        Direct Login
      </Button>
    </>
  );
}
