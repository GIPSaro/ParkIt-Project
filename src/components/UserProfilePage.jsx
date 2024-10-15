import { useEffect, useState } from "react";
import { Button, Container, Card, Modal, Form, Table } from "react-bootstrap";
import store from "../Redux/store/index";

const UserProfilePage = () => {
  const [user, setUser] = useState({
    id: "",
    username: "",
    email: "",
    password: "",
    name: "",
    surname: "",
    dateOfBirthday: "",
    licensePlate: "",
    avatar: "",
    hasAnnualCard: false,
    role: "",
    authorities: [],
  });

  const [tickets, setTickets] = useState([]);
  const [showTickets, setShowTickets] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editData, setEditData] = useState({ ...user });

  const url = import.meta.env.VITE_URL;
  const token = store.getState().auth.token;

  // Funzione per recuperare i ticket dell'utente
  const fetchUserTickets = async () => {
    try {
      const resp = await fetch(url + "users/me/tickets", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (resp.ok) {
        const result = await resp.json();
        setTickets(result);
      } else {
        const errorText = await resp.text();
        console.error("Errore nel recupero dei ticket:", errorText);
      }
    } catch (error) {
      console.error("Errore nella richiesta dei ticket:", error);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchUserTickets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // toggle della visibilità della tabella

  const toggleTicketsTable = () => {
    setShowTickets((prev) => !prev);
  };
  const fetchUser = async () => {
    try {
      const resp = await fetch(url + "users/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (resp.ok) {
        const result = await resp.json();
        if (result.id) {
          setUser(result);
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
    fetchUserTickets();
  }, []);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const response = await fetch(url + "users/me/avatar", {
        method: "POST",
        body: formData,
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const responseText = await response.text();
      console.log("Response Text:", responseText);

      if (!response.ok) {
        const errorResponse = JSON.parse(responseText || "{}");
        throw new Error(
          errorResponse.error || `HTTP error! status: ${response.status}`
        );
      }

      if (responseText) {
        const result = JSON.parse(responseText);
        setUser((prevUser) => ({
          ...prevUser,
          avatar: result.avatar || prevUser.avatar,
        }));
      } else {
        console.error("No content returned from server");
      }

      console.log("File uploaded successfully");
    } catch (error) {
      console.error("Error uploading avatar:", error);
    }
  };

  const handleShowModal = () => {
    setEditData({ ...user });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSaveChanges = async () => {
    const payload = {
      ...editData,
      email: editData.email === user.email ? user.email : editData.email,
    };

    try {
      const resp = await fetch(url + "users/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (resp.ok) {
        setUser((prevUser) => ({
          ...prevUser,
          ...editData,
          avatar: editData.avatar || prevUser.avatar,
        }));
        handleCloseModal();
      } else {
        const errorText = await resp.text();
        console.error("Errore nell'aggiornamento:", errorText);
      }
    } catch (error) {
      console.error("Errore nella richiesta:", error);
    }
  };

  const handleDeleteUser = async () => {
    try {
      const resp = await fetch(url + "users/me", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (resp.ok) {
        alert("Profilo eliminato con successo!");
        window.location.href = "/login";
      } else {
        const errorText = await resp.text();
        console.error("Errore nell'eliminazione:", errorText);
      }
    } catch (error) {
      console.error("Errore nella richiesta di eliminazione:", error);
    } finally {
      setShowDeleteModal(false);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Container className="user-profile-page mt-5 container flex-grow-1">
        <Card className="p-4 text-center">
          <Card.Img
            variant="top"
            src={user.avatar}
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
              <Card.Text>{user.username}</Card.Text>
            </Card.Title>
            <Card.Text>
              {user.name} {user.surname}
            </Card.Text>

            {/* <Card.Text>
              {user.hasAnnualCard
                ? "Hai una tessera annuale"
                : "Non hai una tessera annuale"}
            </Card.Text> */}
            <Button
              variant="primary"
              className="mt-3"
              onClick={handleShowModal}
            >
              Modifica Profilo
            </Button>
          </Card.Body>
        </Card>
        {/* mostrare/nascondere la tabella */}
        <h4
          className="mt-4"
          onClick={toggleTicketsTable}
          style={{ cursor: "pointer" }}
        >
          {showTickets ? "Nascondi" : "Cronologia Tickets"}
        </h4>

        {/* Tabella della cronologia dei tickets */}
        {showTickets && (
          <Table className="table-transparent" striped bordered hover>
            <thead>
              <tr>
                <th>Parking Slot</th>
                <th>Giorno</th>
                <th>Prezzo</th>
              </tr>
            </thead>
            <tbody>
              {tickets.length > 0 ? (
                tickets.map((ticket) => (
                  <tr key={ticket.id}>
                    <td>{ticket.parkingSlot}</td>
                    <td>{new Date(ticket.day).toLocaleDateString()}</td>
                    <td>{ticket.price} €</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center">
                    Nessun ticket trovato
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        )}
      </Container>

      {/* Modale per la modifica del profilo */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Modifica Profilo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Avatar</Form.Label>
              <Form.Control
                type="file"
                name="avatar"
                accept="image/*"
                onChange={handleFileChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={editData.username}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={editData.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Cognome</Form.Label>
              <Form.Control
                type="text"
                name="surname"
                value={editData.surname}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Data di Nascita</Form.Label>
              <Form.Control
                type="date"
                name="dateOfBirthday"
                value={editData.dateOfBirthday}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Targa del Veicolo</Form.Label>
              <Form.Control
                type="text"
                name="licensePlate"
                value={editData.licensePlate}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Chiudi
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Salva Modifiche
          </Button>
          <Button variant="danger" onClick={() => setShowDeleteModal(true)}>
            Elimina Profilo
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modale per conferma eliminazione */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Conferma Eliminazione</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Sei sicuro di voler eliminare il tuo profilo? Questa azione è
          irreversibile.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Annulla
          </Button>
          <Button variant="danger" onClick={handleDeleteUser}>
            Elimina
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserProfilePage;
