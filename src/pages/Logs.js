// import { Navbar } from '@mantine/core'
import Navbar from '../components/Navbar';
import "./Logs.css";
import React, {useEffect, useState} from 'react';
import PacketTable from '../components/PacketTable';
import { useNavigate } from "react-router-dom"; // Import useNavigate
//import img from '../pics/jugaar.png'


function Logs({logs}) {
 

  const navigate = useNavigate(); // Initialize useNavigate
  const handle_export = () => {
    navigate("/report");
  }
  const handle_analysis = () => {
    navigate("/loganalysis");
  }
  const handle_goback = () => {
    navigate("/home");
  }
  return ( 
    <>
   <div>
      <div className="loganalysis">
      <Navbar /> 
      <div className="main-title">
        
        <h1>N-SAM</h1>
        <h2>Logs</h2>
      </div>
    </div>
    
   
    </div>   
    <PacketTable logs={logs} />

    <div className='footer'>
    <button className="analysis-button" onClick={handle_analysis}>Analysis</button> 

      <button className="export-button" onClick={handle_export}>Export</button> {/* ThisLOG OUT button */}
      <button className="goback-button" onClick={handle_goback}>Go Back</button> {/* This is your LOG OUT button */}
    </div>
    </>
  );
}
export default Logs;
