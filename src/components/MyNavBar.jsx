import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoutAction } from '../Redux/actions/authActions';


const MyNavBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state)=> state.auth.isLoggedIn);

    const handleLogout = () => {
        dispatch(logoutAction());
        navigate("/");
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand text-warning">ParkIt</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">Home</Link>
                        </li>
                        {!isLoggedIn ? (
                            <>
                                <li className="nav-item">
                                    <Link to="/login" className="nav-link">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/register" className="nav-link">Register</Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link to="/profile" className="nav-link">Il tuo profilo</Link>
                                </li>
                            
                                <li className="nav-item">
                                    <Link to="/reservation" className="nav-link">Trova il tuo parcheggio!</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/" className="nav-link" onClick={handleLogout}>Logout</Link>
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
