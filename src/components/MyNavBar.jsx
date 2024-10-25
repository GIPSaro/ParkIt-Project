import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutAction } from "../Redux/actions/authActions";
import { useEffect } from "react";

const MyNavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

 
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);
 

  useEffect(() => {
   
}, [user]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logoutAction());
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand text-warning">
          ParkIt
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {!isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="nav-link">
                    Register
                  </Link>
                </li>
              </>
            ) : user?.role === "ADMIN" ? (
              <>
                <li className="nav-item">
                  <Link to="/admin" className="nav-link">
                    Admin User Management
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/" className="nav-link" onClick={handleLogout}>
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/profile" className="nav-link">
                    Profile
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to="annualCard" className="nav-link">
                    Fidelity Card
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/reservation" className="nav-link">
                    Find your Parking!
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/" className="nav-link" onClick={handleLogout}>
                    Logout
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default MyNavBar;
