import { Button } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Bounce, Flip, ToastContainer, toast } from 'react-toastify';
import AlertContext from '../provider/contexts/AlertContext';

export default function Home() {
  const navigate = useNavigate();
  const { showAlert } = useContext(AlertContext);

  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>Home</h1>
      <Button variant="contained" color="alternative" onClick={() => navigate('/Login')}>
        Login
      </Button>
      <Button variant="outlined" onClick={() => navigate('/Register')}>
        Register
      </Button>
      <Button variant="outlined" onClick={() => navigate('/Dashboard')}>
        Dashboard
      </Button>

      <button
        onClick={() => {
          setNumber((prevNumber) => prevNumber + 1);
          showAlert(number, null, 'bottom-left');
        }}
      >
        Show Toast
      </button>
    </>
  );
}
