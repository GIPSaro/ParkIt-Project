import { Link } from "react-router-dom";



const MyHome = () => {
  return (
    <div className="container mt-5">
      <h1 className="text-white m-4">Benvenuto su ParkIt</h1>
      <div className="map-container" style={{ width: '100%', height: '400px' }}>
        <Link to="/login" style={{ display: 'block', width: '100%', height: '100%' }}>
        <iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3209.8014468594987!2d14.736405915815947!3d38.15732217969527!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x131591b3701cf663%3A0x6d2f0027dcb4fa5b!2sCapo%20d&#39;Orlando%20(ME)!5e0!3m2!1sit!2sit!4v1696688901468!5m2!1sit!2sit"
  width="100%"
  height="400"
  style={{ border: 20 }}
  allowFullScreen=""
  loading="lazy"
></iframe>

        </Link>
      </div>
    <div className="container container-home">
      <h1 className="text-white m-4">Trova il tuo parcheggio!</h1>
      <div className="card">
        <h2>Le nostre Offerte</h2>
        <p>Scopri i migliori parcheggi disponibili nella tua zona.</p>
        <Link to="/register" className="ml-2">
        <button className="btn-primary">Scopri di più</button>
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
