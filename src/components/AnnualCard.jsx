import { useState } from "react";

const AnnualCard = () => {
    // Stato per verificare se l'utente ha una tessera annuale
    const [hasAnnualCard, setHasAnnualCard] = useState(false); // Cambia a true se l'utente ha una tessera

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <div className="card m-3" style={{ width: '30rem', height: 'auto' }}>
                <div className="card-body">
                    <h2 className="card-title">Tessera Annuale</h2>
                    
                    {hasAnnualCard ? (
                        <div className="card-details mb-3">
                            <p><strong>ID:</strong> {/* ID Placeholder */}</p>
                            <p><strong>Utente:</strong> {/* Nome Utente Placeholder */}</p>
                            <p><strong>Data Inizio:</strong> {/* Data Inizio Placeholder */}</p>
                            <p><strong>Data Fine:</strong> {/* Data Fine Placeholder */}</p>
                            <p><strong>Prezzo:</strong> {/* Prezzo Placeholder */}</p>
                            <p><strong>Parcheggi Gratuiti Rimanenti:</strong> {/* Numero Placeholder */}</p>
                            <p><strong>Parcheggio Assegnato:</strong> {/* Parcheggio Assegnato Placeholder */}</p>
                        </div>
                    ) : (
                        <div className="alert" role="alert">
                            Non hai una tessera annuale. <br />
                            <button className="btn btn-warning mt-3" onClick={() => setHasAnnualCard(true)}>Acquista Abbonamento a 10€</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AnnualCard;
