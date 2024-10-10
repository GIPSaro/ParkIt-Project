import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUserAction } from "../Redux/actions/userActions";
import { Container, Form, Button } from "react-bootstrap";

const EditProfilePage = () => {
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    surname: "",
    email: "",
    dateOfBirthday: "",
    licensePlate: "",
    annualCard: false,
    avatar: null, 
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const url = import.meta.env.VITE_URL;

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const resp = await fetch(url + "users", {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: formDataToSend,
      });

      if (resp.ok) {
        const result = await resp.json();
        dispatch(updateUserAction(result)); 
        navigate("/profile");
      } else {
        throw new Error("Errore nell'aggiornamento dei dati!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="text-white">Modifica Profilo</h2>
      <Form onSubmit={handleSubmit}>
        {[
          { label: "Username", name: "username", type: "text" },
          { label: "Nome", name: "name", type: "text" },
          { label: "Cognome", name: "surname", type: "text" },
          { label: "Email", name: "email", type: "email" },
          { label: "Data di nascita", name: "dateOfBirthday", type: "date" },
          { label: "Targa del veicolo", name: "licensePlate", type: "text" },
        ].map(({ label, name, type }) => (
          <Form.Group className="mb-3" key={name}>
            <Form.Label className="text-white">{label}</Form.Label>
            <Form.Control
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              required
            />
          </Form.Group>
        ))}
        <Form.Group className="mb-3">
          <Form.Label className="text-white">Immagine del Profilo</Form.Label>
          <Form.Control
            type="file"
            name="avatar"
            accept="image/*"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Check
          type="checkbox"
          label="Acquista Tessera Annuale (€10 con 10 ore di parcheggio in omaggio!)"
          name="annualCard"
          checked={formData.annualCard}
          onChange={handleChange}
          className="mb-3"
        />
        <Button type="submit" className="btn btn-warning">
          Salva Modifiche
        </Button>
      </Form>
    </Container>
  );
};

export default EditProfilePage;
