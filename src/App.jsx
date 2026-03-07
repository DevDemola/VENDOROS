import React from "react";
import { Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import "./App.css";
import Signup from "./Auth/Signup";
import Login from "./Auth/Login";
import ForgotPassword from "./Auth/ForgotPassword";

import Dashboard from "./pages/DashboardPage";
import Orders from "./pages/Orders";
import Products from "./pages/Products";
import Customer from "./pages/Customer";

function App() {
  return (
    // <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

         <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/products" element={<Products />} />
        <Route path="/customer" element={<Customer />} />
      </Routes>
    // </Router>
  );
}

export default App;
