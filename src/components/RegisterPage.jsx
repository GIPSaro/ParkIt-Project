import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerAndPurchaseAction } from "../Redux/actions/registerAdnPurchaseAction";
const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    surname: "",
    email: "",
    password: "",
    dateOfBirthday: "",
    licensePlate: "",
    annualCard: false,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  



  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.dateOfBirthday) {
      console.error("Data di nascita non fornita.");
      return;
  }

  console.log("Payload di registrazione:", formData);

  const registrationSuccesful = await dispatch(registerAndPurchaseAction(formData)); 
  if (registrationSuccesful) {
    if (formData.annualCard) {
      window.location.href = "/payment";
    } else {
      navigate("/login");
    }
  }
};


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
            { label: "Data di nascita", name: "dateOfBirthday", type: "date" },
            { label: "Targa del veicolo", name: "licensePlate", type: "text" },
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

          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              name="subscribeNewsletter"
              checked={formData.subscribeNewsletter}
              onChange={handleChange}
            />
            <label className="form-check-label text-white">
              Iscriviti alla newsletter per ricevere offerte e aggiornamenti!
            </label>
          </div>
          {formData.annualCard && (
            <div className="mb-3">
              <a href="/payment" className="btn btn-warning">
                Paga con PayPal
              </a>
            </div>
          )}
          <button type="submit" className="btn btn-warning">
            Registrati
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
