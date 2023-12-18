import React, {useState} from 'react';
import './Rules.css';
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Navbar from '../components/Navbar';

function RulesManagement({rules, comments, handleCommentChange, handleToggleStatus}) {
  const navigate = useNavigate();
    const handle_goback = () => {
      navigate("/home");
    }

  
  return (
    <div className="rules-management">
        <Navbar/>
        <div className="main-title">
        <h1>Rules And Management</h1>
        <h2>Welcome Aboard</h2>
      </div>
      <h3>Existing Rules List</h3>
      <div className="filters">
        <select>
          <option value="rule-type">Rule Type</option>
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
      </div>
      <div className="content-area">
        <table className="rules-table">
          <tbody>
            {rules.map((rule, index) => (
              <tr key={index}>
                 <td>
                 <button 
                    onClick={() => handleToggleStatus(index)}
                    className={rule.status === 'Active' ? 'active' : 'inactive'}
                  >
                    {rule.status}
                  </button>
                </td>
                <td>{rule.name}</td>
                <td>
                  <textarea 
                    value={comments[index]} 
                    onChange={(event) => handleCommentChange(index, event)}
                    placeholder="Add a comment"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="go-back" onClick={handle_goback}>Go Back</button>
    </div>
  );
}

export default RulesManagement;
