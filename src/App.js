import { BrowserRouter } from "react-router-dom";
import { Navigate, Outlet, Route, Routes, useLocation, useNavigate } from 'react-router';

import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import Dashboard from "./pages/Dashboard/Dashboard";

import ThemeProviderComponent from "./provider/components/ThemeProviderComponent";
import ThemeModeComponent from "./provider/components/ThemeModeComponent";
import DashboardLayout from "./layouts/DashboardLayout";
import DefaultLayout from "./layouts/DefaultLayout";
import ChangePassword from "./pages/Dashboard/Profile/ChangePassword/ChangePassword";
import Notifications from "./pages/Dashboard/Notifications/Notifications";
import Settings from "./pages/Dashboard/Settings/Settings";
import ActiveSubscription from "./pages/Dashboard/ActiveSubscription/ActiveSubscription";
import Subscription from "./pages/Subscription/Subscription";
import PaymentMethod from "./pages/Subscription/PaymentMethod/PaymentMethod";
import Checkout from "./pages/Subscription/PaymentMethod/Checkout/Checkout";
import PaymentInfo from "./pages/Subscription/PaymentInfo/PaymentInfo";
import Profile from "./pages/Dashboard/Profile/Profile";
import UseVoucherCode from "./pages/Subscription/UseVoucherCode/UseVoucherCode";
import Promo from "./pages/Subscription/Promo/Promo";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import HelpCenter from "./pages/HelpCenter/HelpCenter";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import Feedback from "./pages/Feedback/Feedback";
import TermsOfUse from "./pages/TermsOfUse/TermsOfUse";
import MasterPad from "./pages/Dashboard/MasterPad/MasterPad";
import PocketLink from "./pages/Dashboard/PocketLink/PocketLink";
import axios from "axios";
import { useEffect } from "react";
import SSOValidation from "./pages/SSOValidation/SSOValidation";
import AuthLayout from "./layouts/AuthLayout";
import AlertComponent from "./provider/components/AlertComponent";

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

  const handleCheckToken = async () => {
    if (!localStorage.getItem("accessToken")) {
      return null
    }
    
    try {
      const res = await axios({
        method: 'GET',
        url: `${process.env.REACT_APP_API_KEY}/api/v1/user/checkTokens`,
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
      });

      if (res.data.tokenStatus !== 'Valid') {
        return localStorage.removeItem('accessToken');
      }
      return null
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleCheckToken()
  },[])

  return (
    <ThemeModeComponent>
      <ThemeProviderComponent>
        <AlertComponent>
          <BrowserRouter>
            <Routes>
              <Route element={<DashboardLayout />} >
                <Route element={<ProtectedRoute />}>
                  <Route path="Dashboard" element={<Dashboard />} />
                  <Route path="Dashboard/Profile" element={<Profile />} />
                  <Route path="Dashboard/Profile/ChangePassword" element={<ChangePassword />} />
                  <Route path="Dashboard/Notifications" element={<Notifications />} />
                  <Route path="Dashboard/Settings" element={<Settings />} />
                  <Route path="Dashboard/ActiveSubscription" element={<ActiveSubscription />} />

                  <Route path="Dashboard/PocketLink" element={<PocketLink />} />
                  <Route path="Dashboard/MasterPad" element={<MasterPad />} />
                </Route>
              </Route>
              
              <Route element={<DefaultLayout />} >
                <Route path="" element={<Home />} />
                
                <Route path="Subscription" element={<Subscription />} />
                <Route path="Subscription/PaymentMethod" element={<PaymentMethod />} />
                <Route path="Subscription/PaymentMethod/Checkout" element={<Checkout />} />
                <Route path="Subscription/PaymentInfo" element={<PaymentInfo />} />
                <Route path="Subscription/UseVoucherCode" element={<UseVoucherCode />} />
                <Route path="Subscription/Promo" element={<Promo />} />
                
                <Route path="HelpCenter" element={<HelpCenter />} />
                <Route path="TermsOfUse" element={<TermsOfUse />} />
                <Route path="PrivacyPolicy" element={<PrivacyPolicy />} />
                <Route path="Feedback" element={<Feedback />} />

              </Route>

              <Route element={<AuthLayout />}>
                <Route element={<HandleLoginSuccessfully />}>
                  <Route path="ForgotPassword" element={<ForgotPassword />} />
                  <Route path="Login" element={<Login />} />
                </Route>
                <Route path="Register" element={<Register />} />
              </Route>
              
              <Route path="SSOValidation" element={<SSOValidation />} />

              <Route path="*" element={<PageNotFound />}/>

            </Routes>
          </BrowserRouter>
        </AlertComponent>
      </ThemeProviderComponent>
    </ThemeModeComponent>

  );
}

export default App;


// All Theme Color (Done)
// All Layout (Done)
// All Login & Register (Done)
// Handling API (Done)
// Delete Token When Expired (Done)
// Image SSO Integration (Done)
// Logo and Title Bar (1)
// Icon (2)
// Persiapan Diskusi (3)

// All Frame (Night)
// Create Link Page, Edit Link Page, and Link Page Viewer [2-4 page] (Night)
// Text Editor (Night)

// Comment & Rapiin (Kamis)