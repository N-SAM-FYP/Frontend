// import { Navbar } from '@mantine/core'
import Navbar from "../components/Navbar";
import "./LogAnalysis.css";
import "../assets/css/filter.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import PacketTable from "../components/PacketTable";
//import img from '../pics/jugaar.png'
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { refactorLogs } from "../Utils/helperFunction";
import crossIcon from "../assets/svg/cross.svg";
import moment from "moment";

function LogAnalysis() {
  const [logs, setLogs] = useState(null);
  const [filteredLogs, setFilteredLogs] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      fetch("http://localhost:3001/logs")
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
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

  const [filters, setFilters] = useState([]);
  console.log("filters", filters);

  const [selectedFilter, setSelectedFilter] = useState();
  const [selectedTimeStamps, setSelectedTimeStamps] = useState({
    start: null,
    end: null,
  });

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
      const newFilters = { ...prevState };
      delete newFilters[field];
      return newFilters;
    });
  };

  const handleFilterReset = () => {
    setFilters([]);
    setFilteredLogs(logs);
  };

  const handleFilterSubmit = () => {
    if (filters) {
      let resultLogs = logs;
      if (filters.includes("Timestamp")) {
        resultLogs = logs.filter(
          (log) =>
            moment(log.timestamp).format("lll") >= selectedTimeStamps.start &&
            moment(log.timestamp).format("lll") <= selectedTimeStamps.end
        );
      }
      setFilteredLogs(refactorLogs(resultLogs));
    }
  };

  // const typeRowFilterTemplate = (options) => {
  //   return (
  //     <Dropdown
  //       value={options.value}
  //       options={["TCP", "UDP"]}
  //       onChange={(e) => options.filterApplyCallback(e.value)}
  //       placeholder="Select One"
  //       className="p-column-filter"
  //       showClear
  //       style={{ minWidth: "12rem" }}
  //     />
  //   );
  // };
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
                        value={selectedTimeStamps.start}
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
                        value={selectedTimeStamps.end}
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
                </div>
              ))}
          </div>
          <Button
            className="filter-submit-button"
            label="Submit"
            onClick={handleFilterSubmit}
          />
          <Button
            className="filter-remove-button"
            label="Reset Filter"
            onClick={handleFilterReset}
          />
        </div>
        <DataTable
          value={filteredLogs}
          paginator
          rows={10}
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
      </div>
      <button className="export-button" onClick={handle_export}>
        Export
      </button>{" "}
      {/* This is your LOG OUT button */}
    </>
  );
}
export default LogAnalysis;
