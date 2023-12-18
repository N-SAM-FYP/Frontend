// import { Navbar } from '@mantine/core'
import Navbar from '../components/Navbar';
import "./LogAnalysis.css";
import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom"; // Import useNavigate
import PacketTable from '../components/PacketTable';
//import img from '../pics/jugaar.png'

function LogAnalysis() {

  const [logs, setLogs] = useState(null)

  useEffect(() => {
    const fetchData = () => {
      fetch('http://localhost:3001/logs')
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setLogs(data);
        })
        .catch(err => {
          console.log(err.message);
        });
    };

    fetchData(); // Initial fetch
  }, []);



  const navigate = useNavigate(); // Initialize useNavigate
  const handle_export = () => {
    navigate("/report");
  }
  return ( 
    <>
   <div>
      <div className="loganalysis">
      <Navbar /> 
      <div className="main-title">
        <h1>N-SAM</h1>
        <h2>Log Analysis</h2>
      </div>
    </div>
    <PacketTable logs={logs} />
    </div>
      <button className="export-button" onClick={handle_export}>Export</button> {/* This is your LOG OUT button */}
    </>
  );
}
export default LogAnalysis;
