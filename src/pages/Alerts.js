import React, { useEffect, useState } from "react";
import "./Alerts.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Navbar from "../components/Navbar";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

function AlertsManagement({ rules, logs }) {
  console.log("logs", logs);
  const navigate = useNavigate();
  const [filteredLogs, setFilteredLogs] = useState(null);
  useEffect(() => {
    if (logs) {
      const filteredLogs = rules.reduce((acc, rule) => {
        const filtered = logs.filter((log) => {
          const logFlags = log.flags.split(",").map((flag) => flag.trim());
          return (
            log.source === rule.sourceIP &&
            log.destination === rule.destinationIP &&
            rule.flags.every((flag) => logFlags.includes(flag))
            // log.payload_size >= rule.payloadSize.greater &&
            // log.payload_size <= rule.payloadSize.lesser
          );
        });
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
        <DataTable
          value={filteredLogs}
          paginator
          rows={15}
          showGridlines
          tableStyle={{ minWidth: "50rem", backgroundColor: "white" }}
          filterDisplay="row"
          emptyMessage="No logs found."
        >
          <Column
            field="timestamp"
            header="Time Stamp"
            showFilterMenu={false}
            sortable
            style={{ minWidth: "12rem" }}
          ></Column>
          <Column field="type" header="Type" sortable></Column>
          <Column
            field="destination"
            header="Destination"
            sortable
            style={{ minWidth: "12rem" }}
          ></Column>
          <Column field="protocol" header="Protocol" sortable></Column>
          <Column
            field="source"
            header="Source"
            sortable
            style={{ minWidth: "12rem" }}
          ></Column>
          <Column field="ttl" header="Time to live" sortable></Column>
          <Column field="acknowledge" header="Acknowledge" sortable></Column>
          <Column
            field="destination_port"
            header="Destination Port"
            sortable
          ></Column>
          <Column field="flags" header="Flags" sortable></Column>
          <Column field="payload_size" header="Payload Size" sortable></Column>
          <Column field="sequence" header="Sequence" sortable></Column>
          <Column field="source_port" header="Source Port" sortable></Column>
        </DataTable>
      </div>
      <button className="go-back" onClick={handle_goback}>
        Go Back
      </button>
    </div>
  );
}

export default AlertsManagement;
