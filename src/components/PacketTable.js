import React, { useEffect, useState, useRef } from "react";
import moment from "moment";

import "../assets/css/PacketTable.css";

const PacketTable = ({ logs }) => {
  const [selectedTimestamp, setSelectedTimestamp] = useState("24h");
  const [selectedProtocol, setSelectedProtocol] = useState("All");
  const [filteredLogs, setFilteredLogs] = useState([]);
  console.log("PacketTable -> logs", logs);

  const endOfTableRef = useRef(null);

  useEffect(() => {
    if (endOfTableRef.current) {
      endOfTableRef.current.scrollIntoView({ behavior: "smooth" });
    }

    if (logs) {
      const filtered = logs.filter((log) => {
        if (selectedProtocol === "TCP") return log.tcp;
        if (selectedProtocol === "UDP") return log.udp;
        return true; // If 'All' is selected
      });

      setFilteredLogs(filtered);
    }
  }, [logs, selectedProtocol]);

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Time Stamp:</th>
            <th>Type</th>
            <th>Destination</th>
            <th>Protocol</th>
            <th>Source</th>
            <th>Time To Live</th>
            <th>Acknowledge</th>
            <th>Destination port</th>
            <th>Flags</th>
            <th>Payload Size</th>
            <th>Sequence</th>
            <th>Source Port</th>
          </tr>
        </thead>
        <tbody>
          {filteredLogs &&
            filteredLogs.map((log, index) => (
              <tr
                key={index}
                ref={index === filteredLogs.length - 1 ? endOfTableRef : null}
              >
                <td>{moment(log.timestamp).format("lll")}</td>
                <td>{log.type}</td>
                <td>{log.destination}</td>
                <td>{log.protocol}</td>
                <td>{log.source}</td>
                <td>{log.ttl}</td>
                <td>{log.acknowledge}</td>
                <td>{log.destination_port}</td>
                <td>{log.flags}</td>
                <td>{log.payload_size}</td>
                <td>{log.sequence}</td>
                <td>{log.source_port}</td>
                {log.rule_name && <td>{log.rule_name}</td>}
              </tr>
            ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="100%">
              {" "}
              {/* Ensure the covers all columns */}
              Total Rows: {logs ? filteredLogs.length : 0}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default PacketTable;
