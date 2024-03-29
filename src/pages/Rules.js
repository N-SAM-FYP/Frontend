import React, { useEffect, useState } from "react";
import "./Rules.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Navbar from "../components/Navbar";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Select from "react-select";
import { FLAGS } from "../Utils/constants";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const defaultRulesValue = {
  id: "",
  ruleName: "",
  sourceIP: "",
  destinationIP: "",
  flags: [],
  payloadSize: {
    greater: 0,
    lesser: 1000000,
  },
};

function RulesManagement({ rules, setRules }) {
  const OPTIONS = FLAGS.map((flag) => ({ value: flag, label: flag }));
  console.log("rules", rules);
  const [tableData, setTableData] = useState();
  console.log("tableData", tableData);

  const [show, setShow] = useState(false);
  const [showIpBlacklist, setShowIpBlacklist] = useState(false);
  const [ruleData, setRuleData] = useState(defaultRulesValue);
  const fetchBlockedIPs = () => {
    fetch("http://localhost:3001/block-ip")
      .then((response) => response.json())
      .then((data) => {
        console.log("Blocked IPS", data);

        const tableDataTemp = data.map((item) => ({
          id: item._id,
          sourceIP: item.ip,
          ruleName: "IP Blacklist",
          destinationIP: "",
          flags: [],
          payloadSize: {
            greater: null,
            lesser: null,
          },
        }));

        setTableData([...rules, ...tableDataTemp]);

        console.log("Table Data", tableData);
      })
      .catch((err) => {
        setTableData([]);
        console.log(err.message);
      });
  };

  useEffect(() => {
    fetchBlockedIPs();
  }, []);

  const handleClose = () => setShow(false);
  const handleCloseIpBlacklist = () => setShowIpBlacklist(false);
  const handleSave = () => {
    setRules([...rules, ruleData]);
    setTableData([...tableData, ruleData]);
    setRuleData(defaultRulesValue);
    setShow(false);
  };
  const handleIpBlockSave = async () => {
    try {
      const data = await postIP(ruleData.sourceIP);
      console.log(data); // Log the response data

      await fetchBlockedIPs();
      setRuleData(defaultRulesValue);
      setShowIpBlacklist(false);
    } catch (error) {
      console.error("There was a problem with the fetch operation: ", error);
    }
  };
  const handleShow = () => setShow(true);
  const handleRemove = async (ruleToRemove) => {
    if (ruleToRemove.ruleName === "IP Blacklist") {
      await deleteRule(ruleToRemove.id);
    }
    setRules(rules.filter((rule) => rule !== ruleToRemove));
    setTableData(tableData.filter((rule) => rule !== ruleToRemove));
  };
  const navigate = useNavigate();
  const handle_goback = () => {
    navigate("/home");
  };

  const postIP = async (ip) => {
    try {
      const response = await fetch("http://localhost:3001/block-ip", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ip }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("There was a problem with the fetch operation: ", error);
    }
  };

  const deleteRule = async (ruleId) => {
    try {
      const response = await fetch(`http://localhost:3001/block-ip/${ruleId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response;
    } catch (error) {
      console.error("There was a problem with the fetch operation: ", error);
    }
  };

  return (
    <div className="rules-management">
      <Navbar />
      <div className="main-title">
        <h1>Rules And Management</h1>
        <h2>Welcome Aboard</h2>
      </div>
      <div className="table-section">
        <div className="d-flex justify-content-end">
          <button className="add-button" onClick={handleShow}>
            Add
          </button>
          <button
            className="add-button"
            onClick={() => setShowIpBlacklist(true)}
          >
            Ip Blacklist
          </button>
        </div>
        <DataTable
          value={tableData}
          paginator
          rows={15}
          showGridlines
          tableStyle={{ minWidth: "50rem", backgroundColor: "white" }}
          filterDisplay="row"
          emptyMessage="No rules found."
        >
          <Column
            field="ruleName"
            header="Name"
            showFilterMenu={false}
            sortable
            style={{ minWidth: "12rem" }}
          ></Column>
          <Column
            field="sourceIP"
            header="Source"
            sortable
            style={{ minWidth: "12rem" }}
          ></Column>
          <Column
            field="destinationIP"
            header="Destination"
            sortable
            style={{ minWidth: "12rem" }}
          ></Column>
          <Column
            field="flags"
            header="Flags"
            sortable
            body={(rowData) => rowData.flags.join(", ")}
          ></Column>
          <Column
            field="payloadSize"
            header="Payload Size"
            sortable
            body={(rowData) =>
              `${
                rowData.payloadSize.lesser
                  ? `${rowData.payloadSize.lesser} >= Payload >=  ${rowData.payloadSize.greater} `
                  : ""
              }`
            }
          />
          <Column
            header="Action"
            body={(rowData) => (
              <button
                className="remove-button"
                onClick={() => handleRemove(rowData)}
              >
                Remove
              </button>
            )}
          />
        </DataTable>
      </div>
      <button className="go-back" onClick={handle_goback}>
        Go Back
      </button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Add Rule</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column">
          <div className="input-wrapper">
            <label className="h2">Rule Name</label>
            <input
              className="h3"
              type="text"
              onChange={(e) =>
                setRuleData({ ...ruleData, ruleName: e.target.value })
              }
            />
          </div>
          <div>
            <div>
              <div className="input-wrapper">
                <label>Source IP</label>
                <input
                  type="text"
                  onChange={(e) =>
                    setRuleData({ ...ruleData, sourceIP: e.target.value })
                  }
                />
              </div>
              <div className="input-wrapper">
                <label>Destination IP</label>
                <input
                  type="text"
                  onChange={(e) =>
                    setRuleData({ ...ruleData, destinationIP: e.target.value })
                  }
                />
              </div>
            </div>
            <div>
              <div className="input-wrapper">
                <label>Flags</label>
                <Select
                  defaultValue={[]}
                  placeholder="Select Flags"
                  isMulti
                  name="flags"
                  options={OPTIONS}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  onChange={(selected) =>
                    setRuleData({
                      ...ruleData,
                      flags: selected.map((flag) => flag.value),
                    })
                  }
                />
                <></>
              </div>
              <div className="input-wrapper">
                <label>Payload Size</label>
                <div className="d-flex gap-1">
                  <input
                    type="number"
                    placeholder="greater than"
                    onChange={(e) =>
                      setRuleData({
                        ...ruleData,
                        payloadSize: {
                          ...ruleData.payloadSize,
                          greater: Number(e.target.value),
                        },
                      })
                    }
                  />
                  <span>
                    {"<"} payload {"<"}
                  </span>
                  <input
                    type="number"
                    placeholder="less than"
                    onChange={(e) =>
                      setRuleData({
                        ...ruleData,
                        payloadSize: {
                          ...ruleData.payloadSize,
                          lesser: Number(e.target.value),
                        },
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showIpBlacklist} onHide={handleCloseIpBlacklist}>
        <Modal.Header>
          <Modal.Title>IP Blacklist</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column">
          <div>
            <div>
              <div className="input-wrapper">
                <label>IP</label>
                <input
                  type="text"
                  onChange={(e) => {
                    setRuleData({
                      ...ruleData,
                      sourceIP: e.target.value,
                      ruleName: "IP Blacklist",
                      payloadSize: {
                        lesser: null,
                        greater: null,
                      },
                    });
                  }}
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseIpBlacklist}>
            Close
          </Button>
          <Button variant="primary" onClick={handleIpBlockSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default RulesManagement;
