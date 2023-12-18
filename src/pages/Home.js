import React from 'react';
import "./Home.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Card from '../components/Card';
/*import Header from './components/Header'; // Assuming Header is your Navbar
*/
import { useAuth } from "../contexts/AuthContext";
import logo from '../pics/logo.png.png'
import alertImage from '../pics/alert.png';
import blockImage from '../pics/block.png';
import logsImage from '../pics/logs.png';
import loganalysisImage from '../pics/loganalysis.png';
import Navbar from '../components/Navbar';


function Home() {
  const navigate = useNavigate(); // Initialize useNavigate
  const { logout } = useAuth(); // Get logout function from context

  const handlelogout = async () => {
    try {
      await logout();
      navigate("/login"); // Navigate to login page after successful logout
    } catch (error) {
      // Handle logout error (e.g., show an alert to the user)
    }
  };
  

const handleloganalysis = () => {
  navigate("/loganalysis");  
}
const handlerules = () => {
  navigate("/rules")
}
const handle_logs = () => {
  navigate("/logs")
}
const handle_alerts = () => {
  navigate("/alerts")
}

  return (
    <>
    <div>
      <div className="Home">
      <Navbar /> 
      <div className="main-title">
        <h1>N-SAM</h1>
        <h2>Welcome Aboard</h2>
      </div>
      <div className="p-5 bg-image" 
     style={{ 
       backgroundImage: `url(${logo})`, 
       backgroundSize: '100px', // or 'cover' to fill the entire div
       backgroundPosition: 'center center',
       backgroundRepeat: 'no-repeat',
       marginTop:'-110px',
       height: '200px',
       
     }}>
    </div>
      <div className="card-container">
      
        <Card title="Log Analysis" onClick={handleloganalysis} image={loganalysisImage} />
        <Card title="Logs" onClick={handle_logs}image={logsImage} />
        <Card title="Alerts" onClick={handle_alerts} image={alertImage} />
        <Card title="Rules and Management" onClick={handlerules}image={blockImage} />
      </div>
      <button className="logout-button" onClick={handlelogout}>LOG OUT</button> {/* This is your LOG OUT button */}
    </div>

    </div>
    </>
  )
}
export default Home;
