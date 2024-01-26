import { BrowserRouter } from "react-router-dom";
import { Navigate, Outlet, Route, Routes } from 'react-router';

import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Dashboard from "./pages/Dashboard/Dashboard";
import AccountValidation from "./pages/auth/AccountValidation";
import PageNotFound404 from "./pages/PageNotFound404";

import ThemeProviderComponent from "./provider/components/ThemeProviderComponent";
import ThemeModeComponent from "./provider/components/ThemeModeComponent";

function App() {

  const HandleLoginSuccessfully = () => {
    if (localStorage.getItem("accessToken")) {
        return <Navigate to={"/Dashboard"} />
    }
    return <Outlet/>;
  }

  const ProtectedRoute = () => {
    if (!localStorage.getItem("accessToken")) {
        return <Navigate to={"/Login"} />
    }
    return <Outlet/>;
  }


  return (
    <ThemeModeComponent>
      <ThemeProviderComponent>
        <BrowserRouter>
          <Routes>  
            <Route path="" element={<Home />} />
            <Route element={<HandleLoginSuccessfully />}>
              <Route path="Login" element={<Login />} />
              <Route path="Register" element={<Register />} />
              <Route path="ForgotPassword" element={<ForgotPassword />} />
            </Route>
            <Route path="AccountValidation" element={<AccountValidation />} />

            <Route element={<ProtectedRoute />}>
              <Route path="Dashboard" element={<Dashboard />} />
              {/* <Route path="Dashboard/" element={<Dashboard />} />
              <Route path="Dashboard/" element={<Dashboard />} /> */}
            </Route>

            <Route path="*" element={<PageNotFound404 />}/>

          </Routes>
        </BrowserRouter>
      </ThemeProviderComponent>
    </ThemeModeComponent>

  );
}

export default App;
