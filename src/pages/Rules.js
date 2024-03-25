import React, { useState } from "react";
import "./Rules.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Navbar from "../components/Navbar";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Dropdown } from "react-bootstrap";

function RulesManagement({
  rules,
  comments,
  handleCommentChange,
  handleToggleStatus,
}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  const handle_goback = () => {
    navigate("/home");
  };

  const [selectedFlags, setSelectedFlags] = useState([]);
  const flags = ["C++", "Java", "ReactJS", "Spring Boot"];
  const toggleLang = (option) => {
    if (selectedFlags.includes(option)) {
      setSelectedFlags(selectedFlags.filter((item) => item !== option));
    } else {
      setSelectedFlags([...selectedFlags, option]);
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
        </div>
        <div className="table"></div>
      </div>
      <button className="go-back" onClick={handle_goback}>
        Go Back
      </button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Rule</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-body">
            <div>
              <div className="input-wrapper">
                <label>Source IP</label>
                <input type="text" />
              </div>
              <div className="input-wrapper">
                <label>Destination IP</label>
                <input type="text" />
              </div>
            </div>
            <div>
              <div className="input-wrapper">
                <label>Flags</label>
              </div>
              <div className="input-wrapper">
                <label>Payload Size</label>
                <div className="d-flex gap-1">
                  <input type="number" />
                  {">"}
                  <input type="number" />
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default RulesManagement;
