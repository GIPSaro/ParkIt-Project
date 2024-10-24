import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setAnnualCard } from "../Redux/actions/cardAction";
import PaymentPage from "./PaymentPage";

const AnnualCard = () => {
  const [hasAnnualCard, setHasAnnualCard] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true); 
  const url = import.meta.env.VITE_URL; 
  const token = localStorage.getItem("token"); 
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${url}users/me`, {
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
        // Controllo se 'hasAnnualCard' è definito in userData
        if (userData.hasAnnualCard !== undefined) {
          setHasAnnualCard(userData.hasAnnualCard);
        }
      } catch (error) {
        console.error("Errore nella richiesta:", error);
      } finally {
        setLoading(false); // Imposta loading a false dopo la richiesta
      }
    };
  
    fetchUser();
  }, [url, token]);
  
  const handlePaymentSuccess = () => {
 
    if (hasAnnualCard) return;
  
    const currentDate = new Date();
    const endDate = new Date(currentDate);
    endDate.setFullYear(endDate.getFullYear() + 1);
  
    setHasAnnualCard(true);
    setPaymentCompleted(true);
  
  
    dispatch(setAnnualCard({ 
      id: userData.id, 
      startDate: currentDate, 
      endDate: endDate,
      price: 10,
      remainingParking: 10 
    }));
  };
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
        <h3>Caricamento...</h3>
      </div>
    );
  }

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="card m-3" style={{ width: "30rem" }}>
        <div className="card-body">
          <h2 className="card-title">Carta Fedeltà</h2>

          {hasAnnualCard ? (
            <div className="card-details mb-3">
              <p><strong>ID: </strong> {userData?.id}</p>
              <p><strong>Utente:</strong> {userData?.name} {userData?.surname}</p>
              <p><strong>Data Inizio:</strong> {new Date().toLocaleDateString()}</p>
              <p><strong>Data Fine:</strong> {new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toLocaleDateString()}</p>
              <p><strong>Prezzo:</strong> {10} €</p>
              <p><strong>Parcheggi Gratuiti Rimanenti:</strong> 10</p>
              <p><strong>Parcheggio Assegnato:</strong></p>
            </div>
          ) : paymentCompleted ? (
            <div className="alert alert-success">Pagamento completato! Tessera attivata.</div>
          ) : (
            <>
              <div className="alert text-white">
                <p><strong>Ottieni di più con la nostra Carta Fedeltà!</strong></p>
                <p>Per soli <strong>10€</strong>, puoi acquistare la nostra tessera e sbloccare <strong>10 ore di parcheggio gratuito</strong> come bonus esclusivo!</p>
                <ul>
                  <li><strong>Risparmio assicurato:</strong> 10 ore di parcheggio gratuito che coprono già il costo della tessera!</li>
                  <li><strong>Comodità senza pensieri:</strong> Parcheggia senza problemi per tutto l'anno.</li>
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
