import React from "react";
import { FiDollarSign, FiPackage, FiUsers, FiAlertCircle, FiTrendingUp } from "react-icons/fi";
import "./StatsCard.css";

function StatsCard() {
  const stats = [
    {
      title: "Total Revenue",
      value: "₦842,500",
      trend: "+18.2%",
      icon: <FiDollarSign />,
      color: "green",
    },
    {
      title: "Total Orders",
      value: "156",
      trend: "+12.5%",
      icon: <FiPackage />,
      color: "green",
    },
    {
      title: "Total Customers",
      value: "89",
      trend: "+8.3%",
      icon: <FiUsers />,
      color: "green",
    },
    {
      title: "Unpaid Balance",
      value: "₦63,200",
      icon: <FiAlertCircle />,
      color: "red",
    },
  ];

  return (
    <div className="stats-container">
      {stats.map((stat, index) => (
        <div key={index} className="card">
          <div className={`icon ${stat.color}`}>{stat.icon}</div>
          <div className="content">
            <p className="title">{stat.title}</p>
            <div className="value-row">
              <h2>{stat.value}</h2>
              {stat.trend && <span className="increase">{stat.trend} <FiTrendingUp /></span>}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StatsCard;