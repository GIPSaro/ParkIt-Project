import { useEffect, useState } from 'react';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useLoadScript } from '@react-google-maps/api';


const libraries = ['marker'];

const ParkingReservation = () => {
  const [availableSpots, setAvailableSpots] = useState([]);
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [timer, setTimer] = useState(900); 
  const [duration, setDuration] = useState(0);
  const pricePerHalfHour = 0.50;
  const [isTimerActive, setIsTimerActive] = useState(false);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCoST6ay0prp_AMnUKxXRJI9BoOU8qxBK8",
    libraries, 
  });

  useEffect(() => {
    const fetchedSpots = [
      { id: 1, name: 'Parcheggio A', location: 'Capo d\'Orlando', coordinates: { lat: 38.1345, lng: 14.7288 } },
      { id: 2, name: 'Parcheggio B', location: 'Capo d\'Orlando', coordinates: { lat: 38.1350, lng: 14.7290 } },
      { id: 3, name: 'Parcheggio C', location: 'Capo d\'Orlando', coordinates: { lat: 38.1355, lng: 14.7300 } }
    ];
    setAvailableSpots(fetchedSpots);
  }, []);

  const handleSelectSpot = (spot) => {
    setSelectedSpot(spot);
  };

  const handleConfirmReservation = () => {
    const userConfirmed = window.confirm(`Confermi la prenotazione per ${selectedSpot.name}?`);
    if (userConfirmed) {
      setIsTimerActive(true);
      setTimer(900);

      
      fetch(`/api/parking/${selectedSpot.id}/occupy`, { method: 'POST' })
        .then(response => {
          if (!response.ok) {
            throw new Error('Errore durante la prenotazione del parcheggio');
          }
          alert(`Prenotazione confermata per ${selectedSpot.name}`);
        })
        .catch(error => {
          console.error('Errore:', error);
        });
    }
  };

  const handleDurationChange = (e) => {
    const selectedDuration = e.target.value;
    setDuration(selectedDuration);
  };

  const calculateTotalPrice = () => {
    return (duration / 30) * pricePerHalfHour;
  };

  useEffect(() => {
    let interval = null;
    if (isTimerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsTimerActive(false);
      alert('Tempo scaduto! Devi arrivare al parcheggio.');
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timer]);

  const percentage = (timer / 900) * 100;

  const handlePurchaseTicket = () => {
    fetch(`/api/parking/${selectedSpot.id}/purchase`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ duration }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Errore durante l\'acquisto del biglietto');
      }
      alert(`Prenotazione effettuata per ${duration} minuti!`);
    })
    .catch(error => {
      console.error('Errore:', error);
    });
  };

  useEffect(() => {
    if (isLoaded && availableSpots.length > 0) {
      const map = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat: 38.1350, lng: 14.7290 },
        zoom: 15,
        mapId: 'eef3774626da8ae7', 
      });
  
      availableSpots.forEach((spot) => {
        const marker = new window.google.maps.marker.AdvancedMarkerElement({
          position: spot.coordinates,
          map: map,
          title: spot.name,
        });
  
        marker.addListener('click', () => {
          handleSelectSpot(spot);
        });
      });
    }
  }, [isLoaded, availableSpots]);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="reservation-container">
      <div className="reservation-header">Prenotazione Parcheggio</div>
      
      <h2 className='text-dark'>Parcheggi Disponibili</h2>
      <div id="map" style={{ width: '100%', height: '300px' }}></div>

      <ul className="parking-list">
        {availableSpots.map((spot) => (
          <li key={spot.id} className="parking-item" onClick={() => handleSelectSpot(spot)}>
            <h3>{spot.name}</h3>
            <p>{spot.location}</p>
          </li>
        ))}
      </ul>

      {selectedSpot && (
        <div className="reservation-content">
          <h3>Hai selezionato: {selectedSpot.name}</h3>
          <div className="timer-container">
            <h4>Tempo rimasto per arrivare:</h4>
            <div style={{ width: '100px', height: '100px' }}>
              <CircularProgressbar 
                value={percentage} 
                text={`${Math.floor(timer / 60)}:${(timer % 60).toString().padStart(2, '0')}`}
                styles={buildStyles({
                  pathColor: '#6a0dad',
                  textColor: 'black', 
                  trailColor: '#d6d6d6', 
                })}
              />
            </div>
          </div>
          
          <h1 className='text-dark'>Seleziona il tuo orario di prenotazione</h1>
          <div className="form-group">
            <label htmlFor="duration">Durata (minuti):</label>
            <select
              id="duration"
              value={duration}
              onChange={handleDurationChange}
              className="form-control"
              required
            >
              <option value="">Seleziona...</option>
              <option value="30">30 minuti</option>
              <option value="60">1 ora</option>
              <option value="90">1 ora e 30 minuti</option>
              <option value="120">2 ore</option>
              <option value="150">2 ore e 30 minuti</option>
              <option value="180">3 ore</option>
            </select>
          </div>
          <h2 className='text-dark'>Prezzo Totale: € {calculateTotalPrice().toFixed(2)}</h2>
          <button className="btn btn-warning" onClick={handleConfirmReservation}>
            Conferma Prenotazione
          </button>
          <button className="btn btn-success" onClick={handlePurchaseTicket} disabled={!isTimerActive || timer === 0}>
            Acquista Biglietto
          </button>
        </div>
      )}
    </div>
  );
};

export default ParkingReservation;
