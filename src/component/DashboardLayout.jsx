// DashboardLayout.jsx
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const DashboardLayout = ({ children, pageTitle }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div style={{ display: "flex", height: "100vh", background: "#f8fafc" }}>
      <Sidebar collapsed={!sidebarOpen} />
      
      <div style={{ 
        display: "flex", 
        flexDirection: "column", 
        flex: 1,
        overflow: "hidden"
      }}>
        <Navbar toggleSidebar={toggleSidebar} pageTitle={pageTitle} />
        
        <main style={{ 
          flex: 1, 
          padding: "2rem", 
          overflowY: "auto",
          background: "#f8fafc"
        }}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;