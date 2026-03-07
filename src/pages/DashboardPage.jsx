import { useEffect, useState } from "react";
import DashboardLayout from "../component/DashboardLayout";
import {
  FiDollarSign,
  FiPackage,
  FiUsers,
  FiShoppingBag,
  FiDownload,
  FiFilter,
  FiCalendar,
  FiArrowRight,
  FiTrendingUp,
} from "react-icons/fi";
// import StatsCard from "./component/StatsCard";
// import RecentOrders from "./component/RecentOrders";
import "./DashboardPage.css";
import StatsCard from "../component/StatsCard";
import RecentOrders from "../component/RecentOrders";
import RecentCustomers from "../component/RecentCustomers";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const recentCustomers = [
    { name: "Amaka Johnson", orders: 5, total: "78,500" },
    { name: "Chidera Okonkwo", orders: 3, total: "25,500" },
    { name: "Blessing Michael", orders: 2, total: "35,000" },
    { name: "Kenneth Adebayo", orders: 4, total: "92,000" },
  ];

  const QuickAction = ({ icon, label }) => (
    <button className="quick-action">
      <div className="icon">{icon}</div>
      <span className="label">{label}</span>
    </button>
  );

  const ListItem = ({ avatar, name, info, status, time }) => (
    <div className="list-item">
      <div className="avatar">{avatar}</div>
      <div className="details">
        <div className="name">{name}</div>
        <div className="info">{info}</div>
      </div>
      {status && (
        <div className={`status ${status}`}>
          <span className="status-dot"></span>
          <span className="status-text">{status}</span>
          {time && (
            <span style={{ color: "#94a3b8", fontSize: "0.625rem" }}>
              {time}
            </span>
          )}
        </div>
      )}
    </div>
  );

  return (
    <DashboardLayout pageTitle="Dashboard Overview">
      <div className="dashboard-header">
        <div className="button-group">
          <button>
            <FiCalendar /> Today
          </button>
          <button>
            <FiFilter /> Filter
          </button>
        </div>
        <button className="export-button">
          <FiDownload /> Export Report
        </button>
      </div>

      <StatsCard />

      {/* Left Column */}
      <div>
        <RecentOrders />

        {/* Right Column */}
        <div>
          <div className="panels"></div>

          <RecentCustomers />
        </div>
      </div>

      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Dashboard;
