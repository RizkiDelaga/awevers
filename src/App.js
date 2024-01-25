import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from 'react-router';

import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Dashboard from "./pages/Dashboard/Dashboard";
import AccountValidation from "./pages/auth/AccountValidation";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="Login" element={<Login />} />
        <Route path="Register" element={<Register />} />
        <Route path="ForgotPassword" element={<ForgotPassword />} />
        <Route path="AccountValidation" element={<AccountValidation />} />

        <Route path="Dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
