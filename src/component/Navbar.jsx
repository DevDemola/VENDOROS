// Navbar.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiMenu,
  FiSearch,
  FiBell,
  FiMail,
  FiCalendar,
  FiUser,
  FiSettings,
  FiHelpCircle,
  FiLogOut,
  FiChevronDown,
} from "react-icons/fi";
import "./Navbar.css";

const Navbar = ({ toggleSidebar, pageTitle = "Dashboard" }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    // Implement search logic
  };

  return (
    <nav className="navbar">
      {/* Left Section */}
      <div className="navbar-left">
        <button className="menu-toggle" onClick={toggleSidebar}>
          <FiMenu />
        </button>
        <span className="page-title">{pageTitle}</span>
      </div>

      {/* Search Section */}
      <div className="navbar-search">
        <form onSubmit={handleSearch} className="search-container">
          <FiSearch />
          <input
            type="text"
            placeholder="Search orders, customers, products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
      </div>

      {/* Right Section */}
      <div className="navbar-right">
        <div className="navbar-actions">
          <button className="action-btn">
            <FiBell />
            <span className="action-badge">3</span>
          </button>
          <button className="action-btn">
            <FiMail />
            <span className="action-badge">5</span>
          </button>
          <button className="action-btn">
            <FiCalendar />
          </button>
        </div>

        <div className="navbar-divider" />

        {/* User Menu */}
        <div
          className="user-menu"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <div className="user-avatar">JD</div>
          <div className="user-details">
            <span className="user-name">John Doe</span>
            <span className="user-role">Vendor</span>
          </div>
          <FiChevronDown />
        </div>

        {/* Dropdown Menu */}
        <div className={`user-dropdown ${showDropdown ? "show" : ""}`}>
          <div className="dropdown-header">
            <div className="dropdown-user-name">John Doe</div>
            <div className="dropdown-user-email">john@vendoros.com</div>
          </div>

          <div className="dropdown-items">
            <div
              className="dropdown-item"
              onClick={() => navigate("/dashboard/profile")}
            >
              <FiUser /> Your Profile
            </div>

            <div
              className="dropdown-item"
              onClick={() => navigate("/dashboard/help")}
            >
              <FiHelpCircle /> Help & Support
            </div>

            <div className="dropdown-divider" />

            <div className="dropdown-item" onClick={() => navigate("/login")}>
              <FiLogOut /> Logout
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
