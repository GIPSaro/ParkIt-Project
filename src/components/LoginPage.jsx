import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginAction } from "../Redux/actions/authActions";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleSubmit = (e) => {
      e.preventDefault();
      const userData = {email, password};
      dispatch(loginAction(userData));

      console.log('Email:', email, 'Password:', password);
      setEmail('');
      setPassword('');

      navigate('/reservation');
    };
  
    return (
        <div className="container mt-5">
        <div className="form-container text-white">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-warning">Accedi</button>
          </form>
        </div>
      </div>
    );
  };
  
    
  
  export default LoginPage;