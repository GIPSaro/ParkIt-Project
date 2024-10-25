import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Card } from "react-bootstrap";
import { toast } from "react-toastify";

const AdminAnnualCard = () => {
    const { annualCardId } = useParams(); 
    const [cardData, setCardData] = useState(null);
    const url = import.meta.env.VITE_URL;

    useEffect(() => {
        const fetchAnnualCard = async () => {
            try {
                const response = await fetch(`${url}annualCards/${annualCardId}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("token")}`
                    }
                });
                if (!response.ok) throw new Error("Failed to fetch annual card data");
                const data = await response.json();
                setCardData(data);
            } catch (error) {
                console.error("Error fetching annual card:", error);
                toast.error("Errore nel caricamento della tessera fedeltà");
            }
        };

        fetchAnnualCard();
    }, [url, annualCardId]);

    return (
        <Container className="mt-5">
            <h2>Dettagli Tessera Fedeltà</h2>
            {cardData ? (
                <Card className="card-details mb-3 p-3">
                    <p><strong>ID Tessera: </strong>{cardData.id}</p>
                    <p><strong>Utente:</strong> {cardData.userName} {cardData.userSurname}</p>
                    <p><strong>Data Inizio:</strong> {new Date(cardData.startDate).toLocaleDateString()}</p>
                    <p><strong>Data Fine:</strong> {new Date(cardData.endDate).toLocaleDateString()}</p>
                    <p><strong>Parcheggi Gratuiti Rimanenti:</strong> {cardData.remainingFreeParking}</p>
                   
                </Card>
            ) : (
                <p>Caricamento...</p>
            )}
        </Container>
    );
};

export default AdminAnnualCard;
