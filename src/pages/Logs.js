import Navbar from "../components/Navbar";
import "./Logs.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "primereact/checkbox";

import PacketTable from "../components/PacketTable";

function Logs({ logs, fetchLogs, toggle, setToggle }) {
  const navigate = useNavigate(); // Initialize useNavigate

  const handle_export = () => {
    navigate("/report");
  };
  const handle_analysis = () => {
    navigate("/loganalysis");
  };
  const handle_goback = () => {
    navigate("/home");
  };

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

      <div className="footer">
      <Checkbox
        className="toggle"
        onChange={(e) => setToggle(e.checked)}
        checked={toggle}
      ></Checkbox>
        <button className="analysis-button" onClick={handle_analysis}>
          Analysis
        </button>
        <button className="export-button" onClick={handle_export}>
          Export
        </button>
        <button className="goback-button" onClick={handle_goback}>
          Go Back
        </button>{" "}
      </div>
    </>
  );
}
export default Logs;
