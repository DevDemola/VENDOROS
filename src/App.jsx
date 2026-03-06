import React from "react";
import { Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import "./App.css";
import Signup from "./Auth/Signup";
import Login from "./Auth/Login";
import ForgotPassword from "./Auth/ForgotPassword";

function App() {
  return (
    // <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    // </Router>
  );
}

export default App;
