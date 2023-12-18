import React, { useEffect, useState, useRef } from 'react';

import '../assets/css/PacketTable.css'; 

const dummyData = [
  
  { timestamp: '216929', protocol: 'Android.lo...', ipAddress: '209.18.47.62', packets: '236', destination: '86.6867' },
 
];

const PacketTable = ({logs}) => {
  const [selectedTimestamp, setSelectedTimestamp] = useState('24h');
  const [selectedProtocol, setSelectedProtocol] = useState('All');
  const [filteredLogs, setFilteredLogs] = useState([]);

  const endOfTableRef = useRef(null);

  
  useEffect(() => {
    if (endOfTableRef.current) {
        endOfTableRef.current.scrollIntoView({ behavior: "smooth" });
    }

    if (logs) {
        const filtered = logs.filter(log => {
            if (selectedProtocol === 'TCP') return log.tcp;
            if (selectedProtocol === 'UDP') return log.udp;
            return true; // If 'All' is selected
        });

        setFilteredLogs(filtered);
    }
}, [logs, selectedProtocol]);

  const handleTimestampChange = (event) => {
      setSelectedTimestamp(event.target.value);
  };

  const handleProtocolChange = (event) => {
      setSelectedProtocol(event.target.value);
  };

  
    return (
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>
                Time Stamp:
                <select className= "select-option"value={selectedTimestamp} onChange={handleTimestampChange}>
                  <option value="24h">24 hours</option>
                  <option value="1h">1 hour</option>
                  {/* Add more options as needed */}
                </select>
              </th>
              <th>
              Type
            <select className= "select-option"value={selectedProtocol} onChange={handleProtocolChange}>
              <option value="All">All</option>
                  <option value="TCP">TCP</option>
                  <option value="UDP">UDP</option>
                </select></th>
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
          {filteredLogs && filteredLogs.map((log, index) => (
                        <tr key={index} ref={index === filteredLogs.length - 1 ? endOfTableRef : null}>
                            <td>{log.timestamp}</td>
                            {log.tcp && <td>TCP</td>}
                            {log.udp && <td>UDP</td>}
                            <td>{log.ip ? log.ip.dst : 'N/A'}</td>
                            <td>{log.ip ? log.ip.protocol : 'N/A'}</td>
                            <td>{log.ip ? log.ip.src : 'N/A'}</td>
                            <td>{log.ip ? log.ip.ttl : 'N/A'}</td>
                            <td>{log.tcp ? log.tcp.ack : 'N/A'}</td>
                            <td>{log.tcp ? log.tcp.dest_port : 'N/A'}</td>
                            <td>{log.tcp ? log.tcp.flags : 'N/A'}</td>
                            <td>{log.tcp ? log.tcp.payload_size : 'N/A'}</td>
                            <td>{log.tcp ? log.tcp.seq : 'N/A'}</td>
                            <td>{log.tcp ? log.tcp.source_port : 'N/A'}</td>
                        </tr>
                    ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="100%"> {/* Ensure the colSpan covers all columns */}
                Total Rows: {logs ? filteredLogs.length : 0}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    );
};

export default PacketTable;
