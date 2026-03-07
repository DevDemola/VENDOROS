import React, { useState } from "react";
import DashboardLayout from "../component/DashboardLayout";
import { FiUsers, FiPlus, FiX } from "react-icons/fi";
import "./Customer.css";

const Customer = () => {
  const [showModal, setShowModal] = useState(false);
  const [customers, setCustomers] = useState([
    { name: "Amaka Johnson", email: "amaka@gmail.com", phone: "08012345678" },
    { name: "Chidera Okonkwo", email: "chidera@gmail.com", phone: "08087654321" },
    { name: "Blessing Michael", email: "blessing@gmail.com", phone: "08023456789" },
  ]);

  const [newCustomer, setNewCustomer] = useState({ name: "", email: "", phone: "" });

  const handleAddCustomer = () => {
    if (!newCustomer.name || !newCustomer.email || !newCustomer.phone) return;
    setCustomers([...customers, newCustomer]);
    setNewCustomer({ name: "", email: "", phone: "" });
    setShowModal(false);
  };

  return (
    <DashboardLayout pageTitle="Customers">
      {/* Header */}
      <div className="customer-header">
        <h2>Customers</h2>
        <button className="add-btn" onClick={() => setShowModal(true)}>
          <FiPlus /> Add Customer
        </button>
      </div>

      {/* Customer Table */}
      <div className="customer-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((cust, index) => (
              <tr key={index}>
                <td>{cust.name}</td>
                <td>{cust.email}</td>
                <td>{cust.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Add Customer</h3>
              <button className="close-btn" onClick={() => setShowModal(false)}>
                <FiX />
              </button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                placeholder="Name"
                value={newCustomer.name}
                onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
              />
              <input
                type="email"
                placeholder="Email"
                value={newCustomer.email}
                onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
              />
              <input
                type="text"
                placeholder="Phone"
                value={newCustomer.phone}
                onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
              />
            </div>
            <div className="modal-footer">
              <button className="cancel-btn" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button className="submit-btn" onClick={handleAddCustomer}>
                Add Customer
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Customer;