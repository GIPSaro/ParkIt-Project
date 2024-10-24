import { Link } from "react-router-dom";
import myVideo from '../assets/img/Handwritten Love Poster in White Black Background (Twitter Post).mp4';


const MyHome = () => {
  return (
    <div className="container mt-3">
      <h1 className="text-white mb-4">Benvenuto su ParkIt</h1>
      <h1 className="text-white m-4">Trova il tuo parcheggio!</h1>
       <div className="map-container" >
       <video
          src={myVideo}
          alt="Parcheggio"
          controls 
          width="100%" 
          autoPlay
          loop 
          muted 
          playsInline // Evita il play button su mobile
          disablePictureInPicture // Evita il PIP sui browser che lo supportano
          controlsList="nodownload nofullscreen noplaybackrate" // Disabilita i controlli del video
          className="video-animation" // Classe CSS per ulteriori stili
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
