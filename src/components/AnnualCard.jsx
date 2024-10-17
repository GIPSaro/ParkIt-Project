import { useState, useEffect } from "react";
import PaymentPage from "./PaymentPage";


const AnnualCard = () => {

 
  const [hasAnnualCard, setHasAnnualCard] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [userData, setUserData] = useState(null);
  const [startDate, setStartDate] = useState(null); 
  const [endDate, setEndDate] = useState(null); 

  
  const url = import.meta.env.VITE_URL; 
  const token = localStorage.getItem("token"); 

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(url + "users/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Errore nella richiesta");
        }

        const userData = await response.json();
        setUserData(userData);
        setHasAnnualCard(userData.hasAnnualCard);
      } catch (error) {
        console.error("Errore nella richiesta:", error);
      }
    };

    fetchUser();
  }, [url, token]);

  const handlePaymentSuccess = () => {
    const currentDate = new Date();
    const endDate = new Date(currentDate);
    endDate.setFullYear(endDate.getFullYear() + 1);

    setStartDate(currentDate); 
    setEndDate(endDate); 
    setHasAnnualCard(true);
    setPaymentCompleted(true);
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="card m-3" style={{ width: "30rem", height: "auto" }}>
        <div className="card-body">
          <h2 className="card-title">Carta Fedeltà</h2>

          {hasAnnualCard ? (
            <div className="card-details mb-3">
              <p>
                <strong>ID: </strong> {userData?.id}
              </p>
              <p>
                <strong>Utente:</strong> {userData?.name} {userData?.surname}
              </p>
              <p>
                <strong>Data Inizio:</strong> {startDate?.toLocaleDateString()} {/* Data Inizio */}
              </p>
              <p>
                <strong>Data Fine:</strong> {endDate?.toLocaleDateString()} {/* Data Fine */}
              </p>
              <p>
                <strong>Prezzo:</strong> 10€ {/* Prezzo */}
              </p>
              <p>
                <strong>Parcheggi Gratuiti Rimanenti:</strong> 10 {/* Numero Placeholder */}
              </p>
              <p>
                <strong>Parcheggio Assegnato:</strong> {/* Parcheggio Assegnato Placeholder */}
              </p>
            </div>
          ) : paymentCompleted ? (
            <div className="alert alert-success">
              Pagamento completato! Tessera attivata.
            </div>
          ) : (
            <>
              <div className="alert">
                <p>
                  <strong>Ottieni di più con la nostra Carta Fedeltà!</strong>
                </p>
                <p>
                  Per soli <strong>10€</strong>, puoi acquistare la nostra tessera e sbloccare <strong>10 ore di parcheggio gratuito</strong> come bonus esclusivo!
                </p>
                <ul>
                  <li><strong>Risparmio assicurato:</strong> 10 ore di parcheggio gratuito che coprono già il costo della tessera!</li>
                  <li><strong>Comodità senza pensieri:</strong> Parcheggia senza problemi per tutto l`anno.</li>
                  <li><strong>Accesso prioritario:</strong> Offerte esclusive e sconti per i possessori della tessera.</li>
                </ul>
              </div>
              <PaymentPage onPaymentSuccess={handlePaymentSuccess} amount={10} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnnualCard;
