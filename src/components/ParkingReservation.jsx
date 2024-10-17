import { useEffect, useState } from 'react';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useLoadScript } from '@react-google-maps/api';
import { useSelector } from 'react-redux';

const libraries = ["marker", "places"];

const ParkingReservation = () => {
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [timer, setTimer] = useState(900);
  const [duration, setDuration] = useState(0);
  const pricePerHalfHour = 0.50;
  const [isTimerActive, setIsTimerActive] = useState(false);
  const API_MAPS = import.meta.env.VITE_API_MAPS;
  const ID_MAPS = import.meta.env.VITE_ID_MAPS;
  const token = useSelector((state) => state.auth.token);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: API_MAPS,
    libraries,
    
  });

  useEffect(() => {
    const fetchedSlots = [
      {
        id: 1,
        name: "Parcheggio A",
        location: "Capo d'Orlando",
        address: "Via Roma, 12",
        coordinates: { lat: 38.159729, lng: 14.7434719 },
      },
      {
        id: 2,
        name: "Parcheggio B",
        location: "Capo d'Orlando",
        address: "Via Nino Bixio, 20",
        coordinates: { lat: 38.1561235, lng: 14.7391766 },
      },
      {
        id: 3,
        name: "Parcheggio C",
        location: "Capo d'Orlando",
        address: "Via Del Piave",
        coordinates: { lat: 38.1589455, lng: 14.7435224 },
      },
      {
        id: 4,
        name: "Parcheggio D",
        location: "Capo d'Orlando",
        address: "Via XXVII Settembre, 102",
        coordinates: { lat: 38.1592435, lng: 14.7429055 },

      },
      {
        id: 5,
        name: "Parcheggio E",
        location: "Capo d'Orlando",
        address: "Via Cristoforo Colombo, 45",
        coordinates: { lat: 38.1468, lng: 14.7559 },
      },
      {
        id: 6,
        name: "Parcheggio F",
        location: "Capo d'Orlando",
        address: "Piazza Duca degli Abruzzi",
        coordinates: { lat: 38.1624474, lng: 14.7466575 } ,
      }

      
    ];
    setAvailableSlots(fetchedSlots);
  }, []);

  const handleSelectSlot = (Slot) => {
    setSelectedSlot(Slot);
  };

  const handleConfirmReservation = () => {
    const userConfirmed = window.confirm(`Confermi la prenotazione per ${selectedSlot.name}?`);
    if (userConfirmed) {
      setIsTimerActive(true);
      setTimer(900);

      fetch(`parkingSlot/${selectedSlot.id}/occupy`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
        },
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Errore durante la prenotazione del parcheggio');
          }
          alert(`Prenotazione confermata per ${selectedSlot.name}`);
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
    fetch(`booking/${selectedSlot.id}/purchase`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ duration }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Errore durante l'acquisto del biglietto");
      }
      alert(`Prenotazione effettuata per ${duration} minuti!`);
    })
    .catch(error => {
      console.error('Errore:', error);
    });
  };

  useEffect(() => {
    if (isLoaded && availableSlots.length > 0) {
      const initMap = async () => {
        const { Map } = await window.google.maps.importLibrary("maps");
        const map = new Map(document.getElementById('map'), {
          center: { lat: 38.1615485, lng: 14.745763 },
          zoom: 15,
          mapId: ID_MAPS,
        });

        availableSlots.forEach((Slot) => {
          const marker = new window.google.maps.marker.AdvancedMarkerElement({
            position: Slot.coordinates,
            map: map,
            title: Slot.name,
          });

          marker.addListener('click', () => {
            handleSelectSlot(Slot);
          });
        });
      };

      initMap();
    }

  }, [isLoaded, availableSlots, ID_MAPS]);

  if (loadError) return <div>Error loading maps: {loadError.message}</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="reservation-container">
      <div className="reservation-header">Prenotazione Parcheggio</div>
      
      <h2 className='text-dark'>Parcheggi Disponibili</h2>
      <div id="map" style={{ width: '100%', height: '300px' }}></div>

      <ul className="parking-list">
        {availableSlots.map((Slot) => (
          <li key={Slot.id} className="parking-item" onClick={() => handleSelectSlot(Slot)}>
            <h3>{Slot.name}</h3>
            <p>{Slot.location}</p>
            <p>{Slot.address}</p>
          </li>
        ))}
      </ul>

      {selectedSlot && (
        <div className="reservation-content">
          <h3>Hai selezionato: {selectedSlot.name}</h3>
          <div className="timer-container">
            <h4>Tempo rimasto per arrivare:</h4>
            <div style={{ width: '100px', height: '100px' }}>
              <CircularProgressbar 
                value={percentage} 
                text={`${Math.floor(timer / 60)}:${('0' + (timer % 60)).slice(-2)}`}
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
