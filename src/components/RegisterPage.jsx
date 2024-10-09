import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerAction} from "../Redux/actions/registerActions"

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    surname: '',
    email: '',
    password: '',
    dateOfBirth: '',
    licensePlate: '',
    annualCard: false
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(registerAction(formData));

    console.log('Dati Registrazione:', formData);

   

    if(formData.annualCard){
      window.location.href = "/payment";
    }else{
        navigate("/login");
    }
     }
  
    return (
    <div className="container mt-5">
    <div className="form-container">
      <h2 className="text-white">Registrati su ParkIt</h2>
      <form onSubmit={handleSubmit}>
        {[
          { label: "Username", name: "username", type: "text" },
          { label: "Nome", name: "name", type: "text" },
          { label: "Cognome", name: "surname", type: "text" },
          { label: "Email", name: "email", type: "email" },
          { label: "Password", name: "password", type: "password" },
          { label: "Data di nascita", name: "dateOfBirth", type: "date" },
          { label: "Targa del veicolo", name: "licensePlate", type: "text" }
        ].map(({ label, name, type }) => (
          <div className="mb-3" key={name}>
            <label className="form-label text-white">{label}</label>
            <input
              type={type}
              className="form-control"
              name={name}
              value={formData[name]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            name="annualCard"
            checked={formData.annualCard}
            onChange={handleChange}
          />
          <label className="form-check-label text-white">
            Acquista Tessera Annuale (€10 con 10 ore di parcheggio in omaggio!)
          </label>
        </div>
        {formData.annualCard && (
            <div className="mb-3">
            <a href="/payment" className="btn btn-warning">
              Paga con PayPal
            </a>
          </div>
        )}
        <button type="submit" className="btn btn-warning">Registrati</button>
      </form>
    </div>
  </div>
);
};

export default RegisterPage;
