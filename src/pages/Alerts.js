import React, { useEffect, useState } from "react";
import "./Alerts.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Navbar from "../components/Navbar";
import PacketTable from "../components/PacketTable";

function AlertsManagement({ rules, logs }) {
  console.log("logs", logs);
  console.log("rules", rules);
  const navigate = useNavigate();
  const [filteredLogs, setFilteredLogs] = useState(null);
  useEffect(() => {
    if (logs) {
      const filteredLogs = rules.reduce((acc, rule) => {
        const filtered = logs
          .filter((log) => {
            const logFlags = log.flags.split(",").map((flag) => flag.trim());
            return (
              (rule.sourceIP ? log.source === rule.sourceIP : true) &&
              (rule.destinationIP
                ? log.destination === rule.destinationIP
                : true) &&
              (rule.flags.length > 0
                ? rule.flags.every((flag) => logFlags.includes(flag))
                : true) &&
              (rule.payloadSize.greater
                ? log.payload_size >= rule.payloadSize.greater
                : true) &&
              (rule.payloadSize.lesser
                ? log.payload_size <= rule.payloadSize.lesser
                : true)
            );
          })
          .map((log) => ({ ...log, rule_name: rule.ruleName }));

        return [...acc, ...filtered];
      }, []);

      // Remove duplicates
      const uniqueFilteredLogs = Array.from(
        new Set(filteredLogs.map(JSON.stringify))
      ).map(JSON.parse);

      setFilteredLogs(uniqueFilteredLogs);
    }
  }, [logs, rules]);

  console.log("filteredLogs", filteredLogs);

  const handle_goback = () => {
    navigate("/home");
  };

  return (
    <div className="rules-management">
      <Navbar />
      <div className="main-title">
        <h1>Alerts And Violations</h1>
      </div>
      <div style={{ marginTop: "100px" }}>
        <PacketTable logs={filteredLogs} />
      </div>
      <button className="go-back" onClick={handle_goback}>
        Go Back
      </button>
    </div>
  );
}

export default AlertsManagement;
