import React, {useState} from 'react';
import './Alerts.css';
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Navbar from '../components/Navbar';
import PacketTable from '../components/PacketTable';


function AlertsManagement({filteredLogs1, filteredLogs2 ,rules,selectedRule,  handleRuleChange}) {

  const navigate = useNavigate();
 
console.log(filteredLogs1)
    const handle_goback = () => {
      navigate("/home");
    }

    const getFilteredLogs = () => {
      if (selectedRule === 'Rule 1') {
        return filteredLogs1;
      } else if (selectedRule === 'Rule 2') {
        return filteredLogs2;
      } else {
        return []; // Default case, can be adjusted as needed
      }
    }

  return (
    <div className="rules-management">
        <Navbar/>
        <div className="main-title">
        <h1>Alerts And Violations</h1>
      </div>
      <div className="filters">
        <select>
          <option value="rule-type">Alert Type</option>
          <option value="rule-type">Critical</option>
          <option value="rule-type">Alert</option>
          {/* Other options */}
        </select>
        <select>
          <option value="enabled">Status</option>
          <option value="enabled">Active rules</option>
          <option value="enabled">Disabled</option>

        </select>
        <select>
          <option value="action">Action</option>
          <option vaue ="addnew">Add new rule</option>
          <option vaue ="addnew">Modify rule</option>

        </select>
        <select onChange={handleRuleChange}>
          {rules.map((rule, index) => (
            <option key={index} value={rule.name}>{rule.name}</option>
          ))}
        </select>
      </div>
      <PacketTable logs={getFilteredLogs()} />
      <button className="go-back" onClick={handle_goback}>Go Back</button>
    </div>
  );
}

export default AlertsManagement;
