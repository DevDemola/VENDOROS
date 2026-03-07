// components/dashboard/StatsCard.jsx
import React from "react";
import { FiDollarSign, FiPackage, FiUsers, FiClock } from "react-icons/fi";
import "./StatsCard.css";

const OrdersStats = () => {
  const stats = [
    {
      icon: <FiDollarSign />,
      label: "Total Revenue",
      value: "$261,000",
      bgColor: "#f0fdf4",
      iconColor: "#10b981"
    },
    {
      icon: <FiPackage />,
      label: "Total Orders",
      value: "8",
      bgColor: "#f0fdf4",
      iconColor: "#10b981"
    },
    {
      icon: <FiUsers />,
      label: "Unique Customers",
      value: "8",
      bgColor: "#f0fdf4",
      iconColor: "#10b981"
    },
    {
      icon: <FiClock />,
      label: "Pending/Unpaid",
      value: "4",
      bgColor: "#fef2f2",
      iconColor: "#ef4444"
    }
  ];

  return (
    <div className="stats-grid">
      {stats.map((stat, index) => (
        <div key={index} className="stat-card">
          <div className="stat-icon" style={{ 
            background: stat.bgColor,
            color: stat.iconColor 
          }}>
            {stat.icon}
          </div>
          <div className="stat-content">
            <div className="stat-label">{stat.label}</div>
            <div className="stat-value">{stat.value}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrdersStats;