import { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import {
  Container,
  Dropdown,
  DropdownButton,
  Form,
  Table,
  Button,
  Modal,
} from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import { FaEdit, FaTrash } from "react-icons/fa";

const AdminPage = () => {
  const user = useSelector((state) => state.auth.user);
  const [users, setUsers] = useState([]);
  const [sortBy, setSortBy] = useState("username");
  const [hasAnnualCard, setHasAnnualCard] = useState("");
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const url = import.meta.env.VITE_URL;

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      let queryParams = `?page=0&size=10&sortBy=${sortBy}`;
      if (hasAnnualCard !== "") {
        queryParams += `&hasAnnualCard=${hasAnnualCard}`;
      }

      const response = await fetch(`${url}users${queryParams}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setUsers(data.content);
    } catch (error) {
      console.error("Error fetching users", error);
      toast.error("Errore nel reperimento dei dati");
    } finally {
      setLoading(false);
    }
  }, [url, sortBy, hasAnnualCard]);

  useEffect(() => {
    if (user) {
      setIsAdmin(user.role === "ADMIN");
      fetchUsers();
    }
  }, [user, fetchUsers]);

  const handleAnnualCardChange = (value) => {
    setHasAnnualCard(value);
  };

  const handleSortChange = (value) => {
    setSortBy(value);
  };

  const viewFidelityCard = (annualCardId) => {
    console.log("Fetching annual card with ID:", annualCardId); 
    if (annualCardId) {
      navigate(`/annualCards/${annualCardId}`);
    } else {
   
      toast.error("No Fidelity Card available for this user.");
    }
  };
  

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const response = await fetch(`${url}users/${userId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!response.ok) throw new Error("Delete failed");
        fetchUsers();
        toast.success("User deleted successfully");
      } catch (error) {
        toast.error("Error deleting user", error);
      }
    }
  };

  const [selectedUser, setSelectedUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${url}users/${selectedUser.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(selectedUser),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      fetchUsers();
      setShowEditModal(false);
      toast.success("Utente aggiornato con successo!");
    } catch (error) {
      console.error("Error updating user", error);
      toast.error("Errore nell'aggiornamento dell'utente");
    }
  };

  return (
    <Container className="mt-5">
      <h1>Admin User Management</h1>
      {isAdmin ? (
        <div className="d-flex justify-content-center">
          <DropdownButton
            className="mb-2"
            id="dropdown-basic-button"
            title="Sort By"
          >
            <Dropdown.Item onClick={() => handleSortChange("username")}>
              Username
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleSortChange("name")}>
              Name
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleSortChange("surname")}>
              Surname
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleSortChange("dateOfRegister")}>
              Date of Registration
            </Dropdown.Item>
          </DropdownButton>

          <DropdownButton
            className="mb-2"
            id="dropdown-basic-button"
            title="Fidelity Card"
          >
            <Dropdown.Item onClick={() => handleAnnualCardChange("")}>
              All
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleAnnualCardChange("true")}>
              With Fidelity Card
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleAnnualCardChange("false")}>
              Without Fidelity Card
            </Dropdown.Item>
          </DropdownButton>
        </div>
      ) : (
        <p>You do not have permission to access this page.</p>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Username</th>
              <th>Name</th>
              <th>Surname</th>
              <th>Date of Birth</th>
              <th>Date of Register</th>
              <th>License Plate</th>
              <th>Fidelity Card</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.name}</td>
                <td>{user.surname}</td>
                <td>{user.dateOfBirthday}</td>
                <td>{user.dateOfRegister}</td>
                <td>{user.licensePlate}</td>
                <td>
                {user.annualCard ? (
  <Button
    variant="link"
    className="text-dark no-underline"
    onClick={() => viewFidelityCard(user.annualCard.id)} 
  >
    View Fidelity Card
  </Button>
) : (
  "No Fidelity Card"
)}

</td>
                <td>
                  {isAdmin && (
                    <>
                      <Button
                        variant="link"
                        className="text-dark no-underline"
                        onClick={() => handleEditUser(user)}
                      >
                        <FaEdit /> Edit
                      </Button>
                      <Button
                        variant="link"
                        className="text-dark no-underline"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        <FaTrash /> Delete
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Ediit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdateUser}>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={selectedUser?.username || ""}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, username: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={selectedUser?.name || ""}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, name: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group controlId="formSurname">
              <Form.Label>Surname</Form.Label>
              <Form.Control
                type="text"
                value={selectedUser?.surname || ""}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, surname: e.target.value })
                }
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Update User
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default AdminPage;
