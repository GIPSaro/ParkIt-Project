import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container,Card } from "react-bootstrap";

const UserProfilePage = () => {
  const [user, setUser] = useState({
    username: "",
    name: "",
    surname: "",
    email: "",
    dateOfBirthday: "",
    licensePlate: "",
    annualCard: false,
    avatar: "", 
  });

  const url = import.meta.env.VITE_URL;
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const resp = await fetch(url + "users", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
  
      if (resp.ok) {
        const result = await resp.json();
        // console.log("Dati utente recuperati:", result);
        if (result.content.length > 0) {
          setUser(result.content[0]);
        } else {
          console.error("Nessun utente trovato");
        }
      } else {
        const errorText = await resp.text();
        console.error("Errore nel recupero dei dati:", errorText);
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container className="user-profile-page mt-5">
      <Card className="p-4 text-center">
            <Card.Img
              variant="top"
              src={user.avatar || "https://via.placeholder.com/150"}
              alt="profile"
              className="rounded-circle"
              style={{
                width: "150px",
                height: "150px",
                objectFit: "cover",
                margin: "0 auto",
              }}
            />
            <Card.Body>
              <Card.Title>
                {user.name} {user.surname}
              </Card.Title>
              <Card.Text>{user.email}</Card.Text>
              <Card.Text>Data di Nascita: {user.dateOfBirthday}</Card.Text>
              <Card.Text>Numero di Targa: {user.licensePlate}</Card.Text>
              <Card.Text>
                {user.annualCard ? "Hai una tessera annuale" : "Non hai una tessera annuale"}
              </Card.Text>
              <Button variant="primary" className="mt-3" onClick={() => navigate("/editProfile")}>
                Modifica Profilo
              </Button>
            </Card.Body>
          </Card>
    </Container>
  );
};

export default UserProfilePage;
