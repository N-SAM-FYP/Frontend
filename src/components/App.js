import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, Router } from "react-router-dom"; // Removed BrowserRouter
import { AuthProvider } from "../contexts/AuthContext";
import { refactorLogs } from "../Utils/helperFunction";

import Signup from "./Signup";
import Dashboard from "./Dashboard";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";
import Home from "../pages/Home";
import PrivateRoute from "./PrivateRoute"; // Ensure this is updated for v6
import RulesManagement from "../pages/Rules";
import AlertsManagement from "../pages/Alerts";

import LogAnalysis from "../pages/LogAnalysis";
import Logs from "../pages/Logs";

const App = () => {
  const [logs, setLogs] = useState(null);
  const [filteredLogs1, setFilteredLogs1] = useState(null);
  const [filteredLogs2, setFilteredLogs2] = useState(null);

  const [rules, setRules] = useState([]);

  const fetchLogs = () => {
    fetch("http://localhost:3001/logs")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setLogs(refactorLogs(data));
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    fetchLogs(); // Initial fetch
  }, []);

  return (
    <AuthProvider>
      <Routes>
        {/* 
Set the login route as the default route */}
        <Route path="/" element={<Navigate replace to="/login" />} />

        <Route path="/login" element={<Login />} />

        {/* Other routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route
          path="/rules"
          element={
            <PrivateRoute>
              <RulesManagement rules={rules} setRules={setRules} />
            </PrivateRoute>
          }
        />

        <Route
          path="/loganalysis"
          element={
            <PrivateRoute>
              <LogAnalysis />
            </PrivateRoute>
          }
        />

        <Route
          path="/logs"
          element={
            <PrivateRoute>
              <Logs logs={logs} fetchLogs={fetchLogs} />
            </PrivateRoute>
          }
        />
        <Route
          path="/update-profile"
          element={
            <PrivateRoute>
              <UpdateProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/alerts"
          element={<AlertsManagement rules={rules} logs={logs} />}
        />
      </Routes>
    </AuthProvider>
  );
};

export default App;
