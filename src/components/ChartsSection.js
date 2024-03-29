import { useState, useEffect } from "react";
import "../assets/css/charts.css";
import "../assets/css/filter.css";

import PieChart from "../components/smallComponents/PieChart";
import LineChart from "../components/smallComponents/LineChart";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";

const ChartsSection = ({ logs }) => {
  const [pieChartData, setPieChartData] = useState([]);
  const [lineChartData, setLineChartData] = useState([]);
  const [ipType, setIpType] = useState("Destination");
  const [date, setDate] = useState("");

  useEffect(() => {
    setPieChartData(getTopIPs(logs, ipType));
    setLineChartData(getPayloadSizePerHour(logs, date));
  }, [logs, ipType, date]);

  const getTopIPs = (filteredLogs, ipType) => {
    // Count the occurrences of each IP address
    if (!filteredLogs) return [];
    const counts = filteredLogs.reduce((acc, log) => {
      const ip = ipType === "Destination" ? log.destination : log.source;
      if (ip !== "N/A") {
        acc[ip] = (acc[ip] || 0) + 1;
      }
      return acc;
    }, {});

    // Sort the IP addresses by their counts and select the top 5
    const topIPs = Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([ip, count]) => ({ y: count, label: ip }));

    return topIPs;
  };

  const getPayloadSizePerHour = (filteredLogs, date) => {
    // Create an array to store the total payload size for each hour
    let payloadSizePerHour = Array(24).fill(0);

    if (!filteredLogs) return [];

    filteredLogs.forEach((log) => {
      // Get the date and hour from the timestamp
      const logDate = new Date(log.timestamp).toISOString().split("T")[0];
      const hour = new Date(log.timestamp).getHours();

      // Check if the date is not an empty string and if the log's date matches the specified date
      if ((date === "" || logDate === date) && log.payload_size !== "N/A") {
        // Add the current log's payload size to the total for that hour
        payloadSizePerHour[hour] += log.payload_size;
      }
    });

    // Convert the array into the desired format
    const formattedPayloadSizePerHour = payloadSizePerHour.map(
      (payloadSize, hour) => ({
        x: hour,
        y: payloadSize,
      })
    );

    return formattedPayloadSizePerHour;
  };

  return (
    <>
      <div className="chart-parameter-container">
        <Dropdown
          className="set-filter-dropdown"
          value="Chart Parameters"
          options={["Destination", "Source"]}
          placeholder={ipType}
          onChange={(e) => setIpType(e.value)}
        />
        <InputText
          className="input-text"
          placeholder="2023-12-11"
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div className="chart-container filter-container">
        <div className=""></div>
        {pieChartData.length > 0 && (
          <PieChart ipType={ipType} chartData={pieChartData} />
        )}
        {lineChartData.length > 0 && <LineChart chartData={lineChartData} />}
      </div>
    </>
  );
};

export default ChartsSection;
