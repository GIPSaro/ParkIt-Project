import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginAction } from "../Redux/actions/authActions";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const url = import.meta.env.VITE_URL;

  const loginFetch = async () => {
    try {
      const resp = await fetch(url + "auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: password }),
      });
  
      if (resp.ok) {
        const result = await resp.json();
        console.log(result);
        if (result.accessToken) {
          dispatch(loginAction({ email, role: result.role }, result.accessToken, result.role));
          
          
          if (result.role === "ADMIN") {
            navigate("/admin");
          } else {
            navigate("/reservation");
            console.log(result.role) 
          }
        } else {
          alert("Token non disponibile.");
        }
        if (resp.status === 401) {
          alert("Il tuo token è scaduto. Effettua nuovamente il login.");
          navigate("/login"); // Reindirizza alla pagina di login
      } 
      } else {
        const errorResponse = await resp.json();
        alert("Utente non registrato!");
        console.log("Errore dalla risposta del server:", errorResponse);
      }
    } catch (error) {
      console.log(error);
      alert("Si è verificato un errore durante il login.");
    }
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();

    loginFetch();
  };

  return (
    <div className="container">
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
          <button type="submit" className="btn btn-warning">
            Accedi
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
