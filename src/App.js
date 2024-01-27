import { BrowserRouter } from "react-router-dom";
import { Navigate, Outlet, Route, Routes, useLocation, useNavigate } from 'react-router';

import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Dashboard from "./pages/Dashboard/Dashboard";
import AccountValidation from "./pages/auth/AccountValidation";
import PageNotFound404 from "./pages/PageNotFound404";

import ThemeProviderComponent from "./provider/components/ThemeProviderComponent";
import ThemeModeComponent from "./provider/components/ThemeModeComponent";
import { useEffect } from "react";

function App() {

  const HandleLoginSuccessfully = () => {
    // LoginValidation()
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


  const SSOValidation = () => {
    const location = useLocation();
    const routerParams_directTo = new URLSearchParams(location.search).get('directTo');
    
    if (localStorage.getItem('accessToken')) {
      // Validasi Token by API
      if (false) {
        window.location.href =`${routerParams_directTo}/LoginProcess?token=${localStorage.getItem('accessToken')}`
      } else {
        return routerParams_directTo? <Navigate to={`/Login?tokenStatus=expired&directTo=${routerParams_directTo}`} /> : <Navigate to={'/Login?tokenStatus=expired'}/>
      }
      
    } else {
      return  <Navigate to={`/Login?${routerParams_directTo? 'directTo='+routerParams_directTo: '' }`} />
      // navigate(`/Login?${routerParams_directTo? 'directTo='+routerParams_directTo: null }`)
    }
}


  return (
    <ThemeModeComponent>
      <ThemeProviderComponent>
        <BrowserRouter>
          <Routes>  
            <Route path="" element={<Home />} />
            <Route path="SSOValidation" element={<SSOValidation />} />
            <Route path="Login" element={<Login />} />
            <Route path="Register" element={<Register />} />
            <Route element={<HandleLoginSuccessfully />}>
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


