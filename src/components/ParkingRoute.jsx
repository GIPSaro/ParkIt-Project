import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const API_MAPS = import.meta.env.VITE_API_MAPS;
let googleMapsApiLoaded = false;

const loadGoogleMapsApi = () => {
    return new Promise((resolve, reject) => {
        if (googleMapsApiLoaded || (window.google && window.google.maps)) {
            googleMapsApiLoaded = true;
            resolve();
        } else {
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=${API_MAPS}`;
            script.async = true;
            script.defer = true;
            script.onload = () => {
                googleMapsApiLoaded = true;
                resolve();
            };
            script.onerror = reject;
            document.head.appendChild(script);
        }
    });
};

const ParkingRoute = () => {
    const { search } = useLocation();
    const query = new URLSearchParams(search);
    const origin = query.get('origin');
    const destination = query.get('destination');

    const [timer, setTimer] = useState(900);
    const [isTimerActive, setIsTimerActive] = useState(true);
    const [duration, setDuration] = useState(0);
    const pricePerHalfHour = 0.50;

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

    useEffect(() => {
        loadGoogleMapsApi()
            .then(() => {
                if (origin && destination) {
                    const service = new window.google.maps.DirectionsService();
                    const mapElement = document.getElementById('map');

                    if (mapElement) {
                        const map = new window.google.maps.Map(mapElement, {
                            center: { lat: 38.1615485, lng: 14.745763 },
                            zoom: 15,
                        });

                        const request = {
                            origin: origin,
                            destination: destination,
                            travelMode: window.google.maps.TravelMode.DRIVING,
                        };

                        service.route(request, (result, status) => {
                            if (status === window.google.maps.DirectionsStatus.OK) {
                                const directionsRenderer = new window.google.maps.DirectionsRenderer();
                                directionsRenderer.setMap(map);
                                directionsRenderer.setDirections(result);
                            } else {
                                console.error('Errore durante il calcolo del percorso:', status);
                            }
                        });
                    }
                }
            })
            .catch((error) => console.error('Errore nel caricamento dell’API Google Maps:', error));
    }, [origin, destination]);

    const calculateTotalPrice = () => {
        return (duration / 30) * pricePerHalfHour;
    };

    const handleDurationChange = (event) => {
        setDuration(parseInt(event.target.value, 10));
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', backgroundColor: 'black', color: 'white', padding: '20px' }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: '20px' }}>
                <div id="map" style={{ width: '100%', height: '50vh', marginBottom: '20px' }} />
                <div className="timer-container" style={{ width: '100px' }}>
                    <h4>Tempo rimasto per arrivare:</h4>
                    <CircularProgressbar
                        value={percentage}
                        text={`${Math.floor(timer / 60)}:${('0' + (timer % 60)).slice(-2)}`}
                        styles={buildStyles({
                            pathColor: '##6a0dad',
                            textColor: '#FFFFFF',
                            trailColor: '##6a0dad',
                        })}
                    />
                </div>
            </div>
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                <div className="card" style={{ width: '100%', border: '1px solid #555', borderRadius: '8px', padding: '20px' }}>
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
                    <button className="btn btn-dark text-white"  onClick={() => alert('Procedura di pagamento avviata!')}>
                        Acquista Ticket
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ParkingRoute;
