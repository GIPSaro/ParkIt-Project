import { useEffect, useState } from "react";
import { Container, Dropdown, DropdownButton, Form, Table } from "react-bootstrap";
import { toast } from "react-toastify";


const AdminPage = () => {
    const [users, setUsers] = useState([]);
    const [sortBy, setSortBy] = useState("username");
    const [hasAnnualCard, setHasAnnualCard] = useState("");
    const [loading, setLoading] = useState(true);
    const [filterValue, setFilterValue] = useState("");
    const [showFilterInput, setShowFilterInput] = useState(false);
    const [filterField, setFilterField] = useState("");

    const url = import.meta.env.VITE_URL; 

    const notifyError = (errorMsg) => {
        toast.error(errorMsg, {
            className: "text-white bg-danger m-4",
        });
    };
      function formatDate(dateString) {
    const [day, month, year] = dateString.split('/');
    return `${year}-${month}-${day}`;
}


useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, [sortBy, hasAnnualCard, filterField, filterValue]);

const fetchUsers = async () => {
    setLoading(true);
    try {
        let queryParams = `?sortBy=${sortBy}`;
        if (hasAnnualCard !== "") {
            queryParams += `&hasAnnualCard=${hasAnnualCard}`;
        }
        if (filterField && filterValue) {
            queryParams += `&${filterField}=${filterValue}`;
        }

        const response = await fetch(url + `users` + queryParams, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        });
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setUsers(data.content);
    } catch (error) {
        console.error("Error fetching users", error);
        notifyError("Errore nel reperimento dei dati");
    } finally {
        setLoading(false);
    }
};

    const handleFilterChange = (e) => {
        setFilterValue(e.target.value);
    };

    const handleFilterFieldChange = (field) => {
        setFilterField(field);
        setShowFilterInput(true);
    };

    const handleAnnualCardChange = (value) => {
        setHasAnnualCard(value);
    };

    const handleSortChange = (value) => {
        setSortBy(value);
    };

    return (
        <Container className="mt-5">
            
            <h1>Admin User Management</h1>

            <DropdownButton className="mb-2" id="dropdown-basic-button" title="Sort By">
                <Dropdown.Item onClick={() => handleSortChange("username")}>Username</Dropdown.Item>
                <Dropdown.Item onClick={() => handleSortChange("name")}>Name</Dropdown.Item>
                <Dropdown.Item onClick={() => handleSortChange("surname")}>Surname</Dropdown.Item>
                <Dropdown.Item onClick={() => handleSortChange("dateOfRegister")}>Date of Registration</Dropdown.Item>
            </DropdownButton>

            <DropdownButton className="mb-2" id="dropdown-basic-button" title="Fidelity Card">
                <Dropdown.Item onClick={() => handleAnnualCardChange("")}>All</Dropdown.Item>
                <Dropdown.Item onClick={() => handleAnnualCardChange("true")}>With Fidelity Card</Dropdown.Item>
                <Dropdown.Item onClick={() => handleAnnualCardChange("false")}>Without Fidelity Card</Dropdown.Item>
            </DropdownButton>

            <DropdownButton className="mb-2" id="dropdown-basic-button" title="Filters" onSelect={handleFilterFieldChange}>
                <Dropdown.Item eventKey="username">Username</Dropdown.Item>
                <Dropdown.Item eventKey="name">Name</Dropdown.Item>
                <Dropdown.Item eventKey="surname">Surname</Dropdown.Item>
                <Dropdown.Item eventKey="dateOfRegister">Date of Registration</Dropdown.Item>
            </DropdownButton>

            {showFilterInput && (
                <Form className="mb-3">
                    <Form.Group controlId="formBasicFilter">
                        <Form.Label>Filter Value</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter value"
                            value={filterValue}
                            onChange={handleFilterChange}
                        />
                    </Form.Group>
                </Form>
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
                                        <a href={`/annualCard/${user.annualCard.id}`}>
                                            View Fidelity Card
                                        </a>
                                    ) : (
                                        "No Fidelity Card"
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Container>
    );
};

export default AdminPage;
