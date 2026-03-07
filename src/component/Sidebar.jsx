// Sidebar.jsx
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FiShoppingBag,
  FiHome,
  FiPackage,
  FiBox,
  FiUsers,
  FiBarChart2,
  FiCreditCard,
  FiSettings,
  FiLogOut,
  FiBell,
  FiStar,
} from "react-icons/fi";
import "./Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    { path: "/dashboard", icon: <FiHome />, label: "Dashboard" },
    { path: "/orders", icon: <FiPackage />, label: "Orders", badge: "12" },
    { path: "/products", icon: <FiBox />, label: "Products" },
    { path: "/customer", icon: <FiUsers />, label: "Customers" },
    { path: "reports", icon: <FiBarChart2 />, label: "Reports" },
    { path: "payments", icon: <FiCreditCard />, label: "Payments" },
  ];

  const secondaryItems = [
    {
      path: "/dashboard/notifications",
      icon: <FiBell />,
      label: "Notifications",
      badge: "3",
    },
    { path: "/dashboard/settings", icon: <FiSettings />, label: "Settings" },
  ];

  return (
    <>
      <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
        {/* Logo with Icon */}
        <div className="sidebar-logo" onClick={() => navigate("/dashboard")}>
          <FiShoppingBag />
          <span>VendorOS</span>
        </div>

        {/* Main Navigation */}
        <div className="sidebar-nav">
          {navItems.map((item) => (
            <div
              key={item.path}
              className={`sidebar-link ${location.pathname === item.path ? "active" : ""}`}
              onClick={() => navigate(item.path)}
            >
              {item.icon}
              <span>{item.label}</span>
              {item.badge && (
                <span className="sidebar-badge">{item.badge}</span>
              )}
            </div>
          ))}

          <div className="sidebar-divider" />

          {/* Secondary Navigation */}
          {secondaryItems.map((item) => (
            <div
              key={item.path}
              className={`sidebar-link ${location.pathname === item.path ? "active" : ""}`}
              onClick={() => navigate(item.path)}
            >
              {item.icon}
              <span>{item.label}</span>
              {item.badge && (
                <span className="sidebar-badge">{item.badge}</span>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="sidebar-footer">
          <div className="sidebar-link" onClick={() => navigate("/login")}>
            <FiLogOut />
            <span>Logout</span>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      <div
        className={`sidebar-overlay ${collapsed ? "active" : ""}`}
        onClick={() => setCollapsed(false)}
      />
    </>
  );
};

export default Sidebar;
