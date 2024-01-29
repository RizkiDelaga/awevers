import { BrowserRouter } from "react-router-dom";
import { Navigate, Outlet, Route, Routes, useLocation, useNavigate } from 'react-router';

import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import Dashboard from "./pages/Dashboard/Dashboard";
import AccountValidation from "./pages/Auth/AccountValidation";

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
    }
}

  return (
    <ThemeModeComponent>
      <ThemeProviderComponent>
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

              <Route element={<HandleLoginSuccessfully />}>
                <Route path="ForgotPassword" element={<ForgotPassword />} />
              </Route>
            </Route>

            <Route path="Login" element={<Login />} />
            <Route path="Register" element={<Register />} />

            
            <Route path="SSOValidation" element={<SSOValidation />} />
            <Route path="AccountValidation" element={<AccountValidation />} />

            <Route path="*" element={<PageNotFound />}/>

          </Routes>
        </BrowserRouter>
      </ThemeProviderComponent>
    </ThemeModeComponent>

  );
}

export default App;


// All Theme Color
// All Layout
// All Frame
// All Login & Register
// Text Editor