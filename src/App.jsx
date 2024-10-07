import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import MyHome from './components/MyHome';
// import LoginPage from './components/LoginPage';
// import RegisterPage from './components/RegisterPage';
import MyFooter from './components/MyFooter';
import MyNavbar from './components/MyNavBar';
import ParkingReservation from './components/ParkingReservation';



function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <MyNavbar />
        <div className="container">
          <Routes>
          <Route path='/reservation' element={<ParkingReservation />}/>
            {/* <Route path="/" element={<MyHome />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} /> */}
          </Routes>
        </div> 
        <MyFooter />
      </div>
    </BrowserRouter>
  );
}

export default App;
