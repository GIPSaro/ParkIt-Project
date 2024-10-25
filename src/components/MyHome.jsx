import { Link } from "react-router-dom";
import myVideo from '../assets/img/Handwritten Love Poster in White Black Background (Twitter Post).mp4';


const MyHome = () => {
  return (
    <div className="container mt-3">
      <h1 className="text-white mb-4">Welcome To Parkit!</h1>
      <h1 className="text-white m-4">Find your Parking Space!</h1>
       <div className="map-containers" >
       <video
          src={myVideo}
          alt="Parcheggio"
          controls 
          width="100%" 
          autoPlay
          loop 
          muted 
        
       />
       </div>
    <div className="container container-home">
      
      <div className="card">
        <h2>Login</h2>
        <p>Discover the best parking available in your area.</p>
        <Link to="/login" className="ml-2">
        <button className="btn-primary">Login</button>
        </Link>
      </div>
      <div className="card">
        <h2>Register</h2>
        <p>Sign up to receive exclusive offers.</p>
        <Link to="/register" className="ml-2">
        <button className="btn-primary">Sign Up</button>
        </Link>
      </div>
    </div>
    </div>
  );
};

export default MyHome;
