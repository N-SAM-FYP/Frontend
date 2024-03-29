// import { Navbar } from '@mantine/core'
import Navbar from "../components/Navbar";
import "./LogAnalysis.css";
import "../assets/css/filter.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
//import img from '../pics/jugaar.png'
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import crossIcon from "../assets/svg/cross.svg";
import plusIcon from "../assets/svg/plus.svg";
import ChartsSection from "../components/ChartsSection";
import PacketTable from "../components/PacketTable";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function LogAnalysis({ logs }) {
  const [filteredLogs, setFilteredLogs] = useState(logs);
  const [filters, setFilters] = useState([]);

  const [selectedTimeStamps, setSelectedTimeStamps] = useState({
    start: null,
    end: null,
  });

  const [sourceIps, setSourceIps] = useState([]);
  const [destinationIps, setDestinationIps] = useState([]);
  const [singleIp, setSingleIp] = useState("");
  const [flags, setFlags] = useState("");

  const navigate = useNavigate(); // Initialize useNavigate
  const handle_export = () => {
    html2canvas(document.body).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 0, 0);
      pdf.save("download.pdf");
    });
  };

  const handleFilterSet = (field) => {
    setFilters((prevState) => {
      let newFilters = [];
      if (prevState.length > 0) {
        newFilters = [...prevState];
      }

      if (!newFilters.includes(field.value)) {
        newFilters.push(field.value);
      }
      return newFilters;
    });
  };

  const handleFilterRemove = (field) => {
    setFilters((prevState) => {
      const newFilters = prevState.filter((filter) => filter !== field);
      return newFilters;
    });
  };

  const handleFilterReset = () => {
    setSourceIps([]);
    setSingleIp();
    setSelectedTimeStamps({ start: null, end: null });
    setFilters([]);
    setFilteredLogs(logs);
  };

  const handleFilterSubmit = () => {
    let resultLogs = logs;
    if (filters) {
      if (filters.includes("Timestamp")) {
        resultLogs = resultLogs.filter(
          (log) =>
            log.timestamp >= selectedTimeStamps.start &&
            log.timestamp <= selectedTimeStamps.end
        );
      }
      if (filters.includes("Source")) {
        resultLogs = resultLogs.filter((log) => sourceIps.includes(log.source));
      }
      if (filters.includes("Destination")) {
        resultLogs = resultLogs.filter((log) =>
          destinationIps.includes(log.destination)
        );
      }

      if (filters.includes("Flags")) {
        const flagsArray = flags.split(",");
        resultLogs = resultLogs.filter((log) => {
          return flagsArray.every((flag) => log.flags.includes(flag));
        });
      }
    }
    setFilteredLogs(resultLogs);
  };

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
        <ChartsSection logs={filteredLogs} />

        <div className="filter-container">
          <Dropdown
            className="set-filter-dropdown"
            value="Set Filter"
            options={["Timestamp", "Source", "Destination", "Flags", "Payload"]}
            placeholder="Set Filter"
            onChange={(e) => handleFilterSet(e)}
          />
          <div className="filters-row">
            {filters.length > 0 &&
              filters.map((filter, index) => (
                <div key={index} className="filter-wrapper">
                  {filter === "Timestamp" && (
                    <div className="single-filter">
                      <div>{filter}</div>
                      <InputText
                        className="input-text"
                        placeholder="Start"
                        onChange={(e) =>
                          setSelectedTimeStamps({
                            ...selectedTimeStamps,
                            start: e.target.value,
                          })
                        }
                      />
                      <InputText
                        className="input-text"
                        placeholder="End"
                        onChange={(e) =>
                          setSelectedTimeStamps({
                            ...selectedTimeStamps,
                            end: e.target.value,
                          })
                        }
                      />

                      <button
                        onClick={() => {
                          setSelectedTimeStamps({ start: null, end: null });
                          handleFilterRemove(filter);
                        }}
                      >
                        <img
                          className="h-2 w-2"
                          src={crossIcon}
                          alt="cross icon"
                        ></img>
                      </button>
                    </div>
                  )}
                  {filter === "Source" && (
                    <div className="single-filter">
                      <div>{filter}</div>
                      {sourceIps &&
                        sourceIps.map((ip, index) => (
                          <p
                            className="ip-label"
                            key={index}
                            placeholder="IP Address"
                            onClick={() => {
                              setSourceIps(
                                sourceIps.filter(
                                  (ipAddress) => ipAddress !== ip
                                )
                              );
                            }}
                          >
                            {ip}
                          </p>
                        ))}
                      <InputText
                        className="input-text"
                        placeholder="IP Address"
                        onChange={(e) => setSingleIp(e.target.value)}
                      />
                      <button
                        onClick={() => {
                          singleIp !== "" &&
                            setSourceIps((prevState) => {
                              return [...prevState, singleIp];
                            });
                        }}
                      >
                        <img
                          className="h-2 w-2"
                          src={plusIcon}
                          alt="cross icon"
                        ></img>
                      </button>
                      <button
                        onClick={() => {
                          setSourceIps([]);
                          handleFilterRemove(filter);
                        }}
                      >
                        <img
                          className="h-2 w-2"
                          src={crossIcon}
                          alt="cross icon"
                        ></img>
                      </button>
                    </div>
                  )}
                  {filter === "Destination" && (
                    <div className="single-filter">
                      <div>{filter}</div>
                      {destinationIps &&
                        destinationIps.map((ip, index) => (
                          <p
                            className="ip-label"
                            key={index}
                            placeholder="IP Address"
                            onClick={() => {
                              setDestinationIps(
                                destinationIps.filter(
                                  (ipAddress) => ipAddress !== ip
                                )
                              );
                              handleFilterSubmit();
                            }}
                          >
                            {ip}
                          </p>
                        ))}
                      <InputText
                        className="input-text"
                        placeholder="IP Address"
                        onChange={(e) => setSingleIp(e.target.value)}
                      />
                      <button
                        onClick={() => {
                          singleIp !== "" &&
                            setDestinationIps((prevState) => {
                              return [...prevState, singleIp];
                            });
                        }}
                      >
                        <img
                          className="h-2 w-2"
                          src={plusIcon}
                          alt="cross icon"
                        ></img>
                      </button>
                      <button
                        onClick={() => {
                          setDestinationIps([]);
                          handleFilterRemove(filter);
                        }}
                      >
                        <img
                          className="h-2 w-2"
                          src={crossIcon}
                          alt="cross icon"
                        ></img>
                      </button>
                    </div>
                  )}
                  {filter === "Flags" && (
                    <div className="single-filter">
                      <div>{filter}</div>
                      <InputText
                        className="input-text"
                        placeholder="Flags"
                        onChange={(e) => setFlags(e.target.value)}
                      />
                      <button
                        onClick={() => {
                          setFlags("");
                        }}
                      >
                        <img
                          className="h-2 w-2"
                          src={crossIcon}
                          alt="cross icon"
                        ></img>
                      </button>
                    </div>
                  )}
                </div>
              ))}
          </div>
          {filters.length > 0 && (
            <>
              <Button
                className="filter-submit-button"
                label="Submit"
                onClick={handleFilterSubmit}
              />
              <Button
                className="filter-remove-button"
                label="Reset"
                onClick={handleFilterReset}
              />
            </>
          )}
        </div>
        <PacketTable logs={filteredLogs} />
      </div>
      <button className="export-button" onClick={handle_export}>
        Export
      </button>{" "}
      {/* This is your LOG OUT button */}
    </>
  );
}
export default LogAnalysis;
