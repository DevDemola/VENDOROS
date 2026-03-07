// components/dashboard/RecentCustomersSimple.jsx
import React from "react";
import { FiArrowRight } from "react-icons/fi";

const RecentCustomers = () => {
  const customers = [
    { initial: "A", name: "Amaka Johnson", orders: 5, total: "₦78,500" },
    { initial: "C", name: "Chidera Okonkwo", orders: 3, total: "₦25,500" },
    { initial: "B", name: "Blessing Michael", orders: 2, total: "₦35,000" },
    { initial: "K", name: "Kenneth Adebayo", orders: 4, total: "₦92,000" }
  ];

  return (
    <div style={{
      background: "white",
      padding: "1.5rem",
      borderRadius: "16px",
      border: "1px solid #edf2f7"
    }}>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "1.5rem"
      }}>
        <h3 style={{ color: "#1e293b", fontSize: "1.125rem", fontWeight: "600" }}>
          Recent Customers
        </h3>
        <button style={{
          background: "none",
          border: "none",
          color: "#10b981",
          fontSize: "0.875rem",
          fontWeight: "500",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "0.25rem"
        }}>
          View All <FiArrowRight />
        </button>
      </div>

      {customers.map((customer, index) => (
        <div key={index} style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          padding: "0.75rem 0",
          borderBottom: index < customers.length - 1 ? "1px solid #f1f5f9" : "none"
        }}>
          <div style={{
            width: "44px",
            height: "44px",
            background: "#f0fdf4",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#10b981",
            fontWeight: "600",
            fontSize: "1rem"
          }}>
            {customer.initial}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: "600", color: "#1e293b", fontSize: "0.9375rem" }}>
              {customer.name}
            </div>
            <div style={{ color: "#64748b", fontSize: "0.75rem" }}>
              {customer.orders} orders • {customer.total}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentCustomers;