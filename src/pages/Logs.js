import Navbar from "../components/Navbar";
import "./Logs.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import { FilterMatchMode, FilterOperator } from "primereact/api";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";

function Logs({ logs }) {
  const navigate = useNavigate(); // Initialize useNavigate

  const handle_export = () => {
    navigate("/report");
  };
  const handle_analysis = () => {
    navigate("/loganalysis");
  };
  const handle_goback = () => {
    navigate("/home");
  };

  // const [globalFilterValue, setGlobalFilterValue] = useState("");

  const [filters, setFilters] = useState({
    timestamp: { value: null, matchMode: FilterMatchMode.BETWEEN },
    type: { value: null, matchMode: FilterMatchMode.EQUALS },
    destination: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    payload_size: { value: null, matchMode: FilterMatchMode.GREATER_THAN },
    source: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  });

  const typeRowFilterTemplate = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={["TCP", "UDP"]}
        onChange={(e) => options.filterApplyCallback(e.value)}
        placeholder="Select One"
        className="p-column-filter"
        showClear
        style={{ minWidth: "12rem" }}
      />
    );
  };

  return (
    <>
      <div>
        <div className="loganalysis">
          <Navbar />
          <div className="main-title">
            <h1>N-SAM</h1>
            <h2>Logs</h2>
          </div>
        </div>
      </div>

      <DataTable
        value={logs}
        paginator
        rows={15}
        showGridlines
        tableStyle={{ minWidth: "50rem", backgroundColor: "white" }}
        filters={filters}
        filterDisplay="row"
        globalFilterFields={["type", "destination", "payload_size", "source"]}
        emptyMessage="No logs found."
      >
        <Column
          field="timestamp"
          header="Time Stamp"
          showFilterMenu={false}
          filterMenuStyle={{ width: "14rem" }}
          filter
          filterPlaceholder="IP Address"
          style={{ minWidth: "12rem" }}
        ></Column>
        <Column
          field="type"
          header="Type"
          showFilterMenu={false}
          filterMenuStyle={{ width: "14rem" }}
          filter
          filterElement={typeRowFilterTemplate}
        ></Column>
        <Column
          field="destination"
          header="Destination"
          showFilterMenu={false}
          filterMenuStyle={{ width: "14rem" }}
          filter
          filterPlaceholder="IP Address"
          style={{ minWidth: "12rem" }}
        ></Column>
        <Column field="protocol" header="Protocol"></Column>
        <Column
          field="source"
          header="Source"
          howFilterMenu={false}
          filterMenuStyle={{ width: "14rem" }}
          filter
          filterPlaceholder="IP Address"
          style={{ minWidth: "12rem" }}
        ></Column>
        <Column field="ttl" header="Time to live"></Column>
        <Column field="acknowledge" header="Acknowledge"></Column>
        <Column field="destination_port" header="Destination Port"></Column>
        <Column field="flags" header="Flags"></Column>
        <Column field="payload_size" header="Payload Size" filter></Column>
        <Column field="sequence" header="Sequence"></Column>
        <Column field="source_port" header="Source Port"></Column>
      </DataTable>

      <div className="footer">
        <button className="analysis-button" onClick={handle_analysis}>
          Analysis
        </button>
        <button className="export-button" onClick={handle_export}>
          Export
        </button>
        {/* This export button */}
        <button className="goback-button" onClick={handle_goback}>
          Go Back
        </button>{" "}
        {/* This is your LOG OUT button */}
      </div>
    </>
  );
}
export default Logs;
