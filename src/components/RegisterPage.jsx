import { useState } from "react";

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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Qui fare la chiamata API per la registrazione
    console.log('Dati Registrazione:', formData);
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
            Acquista Tessera Annuale (€10)
          </label>
        </div>
        <button type="submit" className="btn btn-warning">Registrati</button>
      </form>
    </div>
  </div>
);
};

export default RegisterPage;
