import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyHome from "./components/MyHome";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import MyFooter from "./components/MyFooter";
import MyNavbar from "./components/MyNavBar";
import ParkingReservation from "./components/ParkingReservation";
import PaymentPage from "./components/PaymentPage";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@fontsource/ubuntu";
// import ParkingRoute from './components/ParkingRoute';
import UserProfilePage from "./components/UserProfilePage";
import AnnualCard from "./components/AnnualCard";
import AdminPage from "./components/AdminPage";
import AdminAnnualCard from "./components/AdminAnnualCard";


function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <MyNavbar />
        <div className="container">
          <Routes>
            <Route path="/reservation" element={<ParkingReservation />} />
            <Route path="/" element={<MyHome />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile" element={<UserProfilePage />} />
            <Route path="annualCard" element={<AnnualCard />} />

            <Route path="/annualCards/:annualCardId" element={<AdminAnnualCard />} />

            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/admin" element={<AdminPage />} />
            {/* <Route path="/parking-route/:id" element={<ParkingRoute />} /> */}
          </Routes>
        </div>
        <MyFooter />
      </div>
    </BrowserRouter>
  );
}

export default App;
