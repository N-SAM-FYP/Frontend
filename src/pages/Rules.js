import React, { useState } from "react";
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

  const [show, setShow] = useState(false);
  const [ruleData, setRuleData] = useState(defaultRulesValue);
  console.log(ruleData);
  console.log("rules", rules);

  const handleClose = () => setShow(false);
  const handleSave = () => {
    setRules([...rules, ruleData]);
    setRuleData(defaultRulesValue);
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const handleRemove = (ruleToRemove) => {
    setRules(rules.filter((rule) => rule !== ruleToRemove));
  };
  const navigate = useNavigate();
  const handle_goback = () => {
    navigate("/home");
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
        </div>
        {/* <table className="table">
          <thead>
            <tr>
              <th>Rule Name</th>
              <th>Source IP</th>
              <th>Destination IP</th>
              <th>Flags</th>
              <th>Payload Size</th>
            </tr>
          </thead>
          <tbody>
            {rules.map((rule, index) => (
              <tr key={index}>
                <td>{rule.ruleName}</td>
                <td>{rule.sourceIP}</td>
                <td>{rule.destinationIP}</td>
                <td>{rule.flags.join(", ")}</td>
                <td>{`${rule.payloadSize.greater} > ${rule.payloadSize.lesser}`}</td>
              </tr>
            ))}
          </tbody>
        </table> */}
        <DataTable
          value={rules}
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
          <Column field="flags" header="Flags" sortable></Column>
          <Column
            field="payloadSize"
            header="Payload Size"
            sortable
            body={(rowData) =>
              `${rowData.payloadSize.lesser} >= Payload >=  ${rowData.payloadSize.greater}`
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
        <Modal.Header closeButton>
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
                          greater: e.target.value,
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
                          lesser: e.target.value,
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
    </div>
  );
}

export default RulesManagement;
