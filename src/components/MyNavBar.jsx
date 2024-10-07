
import { Link } from 'react-router-dom';


const MyNavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand ps-3">ParkIt</div>
      <div className="nav-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/login" className="nav-link">Login</Link>
        <Link to="/register" className="nav-link">Register</Link>
      </div>
    </nav>
  );
};

export default MyNavBar;
