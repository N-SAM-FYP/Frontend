// import { Navbar } from '@mantine/core'
import Navbar from "../components/Navbar";
import "./LogAnalysis.css";
import "../assets/css/filter.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
//import img from '../pics/jugaar.png'
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { refactorLogs } from "../Utils/helperFunction";
import crossIcon from "../assets/svg/cross.svg";
import Spinner from "../components/smallComponents/Spinner";
import plusIcon from "../assets/svg/plus.svg";
import ChartsSection from "../components/ChartsSection";

function LogAnalysis() {
  const [logs, setLogs] = useState(null);
  const [filteredLogs, setFilteredLogs] = useState(null);
  const [isLoading, setIsloading] = useState(false);
  const [filters, setFilters] = useState([]);

  const [selectedTimeStamps, setSelectedTimeStamps] = useState({
    start: null,
    end: null,
  });

  const [sourceIps, setSourceIps] = useState([]);
  const [destinationIps, setDestinationIps] = useState([]);
  const [singleIp, setSingleIp] = useState("");
  const [flags, setFlags] = useState("");

  useEffect(() => {
    const fetchData = () => {
      fetch("http://localhost:3001/logs")
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setIsloading(false);
          setLogs(refactorLogs(data));
          setFilteredLogs(refactorLogs(data));
        })
        .catch((err) => {
          console.log(err.message);
        });
    };

    fetchData(); // Initial fetch
  }, []);

  const navigate = useNavigate(); // Initialize useNavigate
  const handle_export = () => {
    navigate("/report");
  };

  const handleFilterSet = (field) => {
    console.log("field", field.value);

    setFilters((prevState) => {
      let newFilters = [];
      if (prevState.length > 0) {
        newFilters = [...prevState];
      }

      if (!newFilters.includes(field.value)) {
        newFilters.push(field.value);
      }
      console.log("filter", newFilters);
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
    console.log("resultLogs", resultLogs);
    if (filters) {
      console.log("selectedTimeStamps", selectedTimeStamps);
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
    console.log("resultLogs", resultLogs);
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
        {isLoading ? (
          <Spinner />
        ) : (
          <DataTable
            value={filteredLogs}
            paginator
            rows={15}
            showGridlines
            tableStyle={{ minWidth: "50rem", backgroundColor: "white" }}
            // filters={filters}
            filterDisplay="row"
            // globalFilterFields={["type", "destination", "payload_size", "source"]}
            emptyMessage="No logs found."
          >
            <Column
              field="timestamp"
              header="Time Stamp"
              showFilterMenu={false}
              // filterMenuStyle={{ width: "14rem" }}
              // filter
              // filterPlaceholder="IP Address"
              sortable
              style={{ minWidth: "12rem" }}
            ></Column>
            <Column
              field="type"
              header="Type"
              // showFilterMenu={false}
              // filterMenuStyle={{ width: "14rem" }}
              // filter
              // filterElement={typeRowFilterTemplate}
              sortable
            ></Column>
            <Column
              field="destination"
              header="Destination"
              // showFilterMenu={false}
              // filterMenuStyle={{ width: "14rem" }}
              // filter
              // filterPlaceholder="IP Address"
              sortable
              style={{ minWidth: "12rem" }}
            ></Column>
            <Column field="protocol" header="Protocol" sortable></Column>
            <Column
              field="source"
              header="Source"
              // howFilterMenu={false}
              // filterMenuStyle={{ width: "14rem" }}
              // filter
              // filterPlaceholder="IP Address"
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
            <Column
              field="payload_size"
              header="Payload Size"
              // filter
              // filterMenuStyle={{ width: "3rem" }}
              sortable
            ></Column>
            <Column field="sequence" header="Sequence" sortable></Column>
            <Column field="source_port" header="Source Port" sortable></Column>
          </DataTable>
        )}
      </div>
      <button className="export-button" onClick={handle_export}>
        Export
      </button>{" "}
      {/* This is your LOG OUT button */}
    </>
  );
}
export default LogAnalysis;
