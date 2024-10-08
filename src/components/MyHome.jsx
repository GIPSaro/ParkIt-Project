import { Link } from "react-router-dom";
import myImage from '../assets/img/IMG_2143.jpeg';


const MyHome = () => {
  return (
    <div className="container mt-3">
      <h1 className="text-white mb-4">Benvenuto su ParkIt</h1>
      <h1 className="text-white m-4">Trova il tuo parcheggio!</h1>
       <div className="map-container" >
       <img
            src={myImage}
            alt="Parcheggio"
          />
       </div>
    <div className="container container-home">
      
      <div className="card">
        <h2>Accedi</h2>
        <p>Scopri i migliori parcheggi disponibili nella tua zona.</p>
        <Link to="/login" className="ml-2">
        <button className="btn-primary">Accedi</button>
        </Link>
      </div>
      <div className="card">
        <h2>Registrati</h2>
        <p>Iscriviti per ricevere offerte esclusive.</p>
        <Link to="/register" className="ml-2">
        <button className="btn-primary">Registrati ora</button>
        </Link>
      </div>
    </div>
    </div>
  );
};

export default MyHome;
