import { useEffect, useState } from "react";
import DashboardLayout from "../component/DashboardLayout";
import {
  FiPackage,
  FiSearch,
  FiFilter,
  FiDownload,
  FiPlus,
  FiMoreVertical,
  FiEye,
  FiEdit,
  FiTrash2,
  FiCheckCircle,
  FiXCircle,
  FiClock,
  FiDollarSign,
  FiUsers,
  FiCalendar,
  FiArrowLeft,
  FiArrowRight,
} from "react-icons/fi";
import "./Orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [dateRange, setDateRange] = useState("today");

  const ordersPerPage = 10;

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setOrders(mockOrders);
      setLoading(false);
    }, 1000);
  }, []);

  const mockOrders = [
    {
      id: "ORD-001",
      customer: "Amaka Johnson",
      items: "Ankara Set × 2, Headwrap × 1",
      amount: "₦45,000",
      status: "paid",
      date: "2024-01-15",
      paymentMethod: "Bank Transfer",
      phone: "+234 801 234 5678",
    },
    {
      id: "ORD-002",
      customer: "Chidera Okonkwo",
      items: "Body Butter × 3, Lipstick × 2",
      amount: "₦12,500",
      status: "unpaid",
      date: "2024-01-15",
      paymentMethod: "Pending",
      phone: "+234 802 345 6789",
    },
    {
      id: "ORD-003",
      customer: "Blessing Michael",
      items: "Birthday Cake (Large)",
      amount: "₦25,000",
      status: "pending",
      date: "2024-01-14",
      paymentMethod: "Cash on Delivery",
      phone: "+234 803 456 7890",
    },
    {
      id: "ORD-004",
      customer: "Kenneth Adebayo",
      items: "Men's Wear Set, Shoes",
      amount: "₦38,000",
      status: "paid",
      date: "2024-01-14",
      paymentMethod: "Bank Transfer",
      phone: "+234 804 567 8901",
    },
    {
      id: "ORD-005",
      customer: "Fatima Bello",
      items: "Lipstick × 4, Foundation × 2",
      amount: "₦8,500",
      status: "paid",
      date: "2024-01-13",
      paymentMethod: "Card Payment",
      phone: "+234 805 678 9012",
    },
    {
      id: "ORD-006",
      customer: "Oluwaseun Adeleke",
      items: "Aso Oke × 5",
      amount: "₦75,000",
      status: "pending",
      date: "2024-01-13",
      paymentMethod: "Pending",
      phone: "+234 806 789 0123",
    },
    {
      id: "ORD-007",
      customer: "Ngozi Eze",
      items: "Beaded Necklace × 3",
      amount: "₦15,000",
      status: "unpaid",
      date: "2024-01-12",
      paymentMethod: "Pending",
      phone: "+234 807 890 1234",
    },
    {
      id: "ORD-008",
      customer: "Musa Abdullahi",
      items: "Kaftan Set",
      amount: "₦42,000",
      status: "paid",
      date: "2024-01-12",
      paymentMethod: "Bank Transfer",
      phone: "+234 808 901 2345",
    },
  ];

  // Filter orders based on search and status
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.phone.includes(searchTerm);

    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Pagination
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder,
  );
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  // Stats
  const totalRevenue = orders.reduce((sum, order) => {
    const amount = parseInt(order.amount.replace(/[₦,]/g, ""));
    return sum + amount;
  }, 0);

  const paidOrders = orders.filter((o) => o.status === "paid").length;
  const unpaidOrders = orders.filter((o) => o.status === "unpaid").length;
  const pendingOrders = orders.filter((o) => o.status === "pending").length;

  // Handlers
  const handleSelectAll = () => {
    if (selectedOrders.length === currentOrders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(currentOrders.map((o) => o.id));
    }
  };

  const handleSelectOrder = (orderId) => {
    if (selectedOrders.includes(orderId)) {
      setSelectedOrders(selectedOrders.filter((id) => id !== orderId));
    } else {
      setSelectedOrders([...selectedOrders, orderId]);
    }
  };

  const handleBulkAction = (action) => {
    console.log(`Bulk ${action} for:`, selectedOrders);
    // Implement bulk actions
  };

  const StatusBadge = ({ status }) => {
    const statusConfig = {
      paid: {
        bg: "#f0fdf4",
        color: "#10b981",
        label: "Paid",
        icon: <FiCheckCircle />,
      },
      unpaid: {
        bg: "#fef2f2",
        color: "#ef4444",
        label: "Unpaid",
        icon: <FiXCircle />,
      },
      pending: {
        bg: "#fffbeb",
        color: "#f59e0b",
        label: "Pending",
        icon: <FiClock />,
      },
    };

    const config = statusConfig[status] || statusConfig.pending;

    return (
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.25rem",
          padding: "0.25rem 0.5rem",
          background: config.bg,
          color: config.color,
          borderRadius: "9999px",
          fontSize: "0.75rem",
          fontWeight: "500",
        }}
      >
        {config.icon}
        {config.label}
      </span>
    );
  };

  if (loading) {
    return (
      <DashboardLayout pageTitle="Orders">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "60vh",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              border: "3px solid #f1f5f9",
              borderTopColor: "#10b981",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout pageTitle="Orders">
      {/* Stats Cards */}

      {/* Actions Bar */}
      <div
        style={{
          background: "white",
          padding: "1rem",
          borderRadius: "12px",
          border: "1px solid #edf2f7",
          marginBottom: "1.5rem",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            flex: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "#f8fafc",
              padding: "0.5rem 1rem",
              borderRadius: "8px",
              border: "1px solid #edf2f7",
              flex: 1,
              maxWidth: "400px",
            }}
          >
            <FiSearch style={{ color: "#94a3b8" }} />
            <input
              type="text"
              placeholder="Search orders by ID, customer, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                border: "none",
                background: "none",
                outline: "none",
                width: "100%",
                fontSize: "0.875rem",
              }}
            />
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            style={{
              padding: "0.5rem 1rem",
              background: showFilters ? "#f0fdf4" : "white",
              border: "1px solid #edf2f7",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              color: showFilters ? "#10b981" : "#475569",
              cursor: "pointer",
            }}
          >
            <FiFilter /> Filters
          </button>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <button
            style={{
              padding: "0.5rem 1rem",
              background: "white",
              border: "1px solid #edf2f7",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "#475569",
              cursor: "pointer",
            }}
          >
            <FiDownload /> Export
          </button>
          <button
            style={{
              padding: "0.5rem 1.5rem",
              background: "#10b981",
              border: "none",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "white",
              fontWeight: "500",
              cursor: "pointer",
            }}
          >
            <FiPlus /> New Order
          </button>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div
          style={{
            background: "white",
            padding: "1.5rem",
            borderRadius: "12px",
            border: "1px solid #edf2f7",
            marginBottom: "1.5rem",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1rem",
          }}
        >
          <div>
            <label
              style={{
                display: "block",
                color: "#475569",
                fontSize: "0.75rem",
                marginBottom: "0.25rem",
              }}
            >
              Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{
                width: "100%",
                padding: "0.5rem",
                border: "1px solid #edf2f7",
                borderRadius: "6px",
                outline: "none",
                fontSize: "0.875rem",
              }}
            >
              <option value="all">All Status</option>
              <option value="paid">Paid</option>
              <option value="unpaid">Unpaid</option>
              <option value="pending">Pending</option>
            </select>
          </div>

          <div>
            <label
              style={{
                display: "block",
                color: "#475569",
                fontSize: "0.75rem",
                marginBottom: "0.25rem",
              }}
            >
              Date Range
            </label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              style={{
                width: "100%",
                padding: "0.5rem",
                border: "1px solid #edf2f7",
                borderRadius: "6px",
                outline: "none",
                fontSize: "0.875rem",
              }}
            >
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>

          <div>
            <label
              style={{
                display: "block",
                color: "#475569",
                fontSize: "0.75rem",
                marginBottom: "0.25rem",
              }}
            >
              Payment Method
            </label>
            <select
              style={{
                width: "100%",
                padding: "0.5rem",
                border: "1px solid #edf2f7",
                borderRadius: "6px",
                outline: "none",
                fontSize: "0.875rem",
              }}
            >
              <option value="all">All Methods</option>
              <option value="transfer">Bank Transfer</option>
              <option value="card">Card Payment</option>
              <option value="cash">Cash on Delivery</option>
            </select>
          </div>
        </div>
      )}

      {/* Bulk Actions */}
      {selectedOrders.length > 0 && (
        <div
          style={{
            background: "#f0fdf4",
            padding: "0.75rem 1rem",
            borderRadius: "8px",
            marginBottom: "1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            border: "1px solid #10b981",
          }}
        >
          <span style={{ color: "#1e293b", fontSize: "0.875rem" }}>
            {selectedOrders.length} orders selected
          </span>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button
              onClick={() => handleBulkAction("mark-paid")}
              style={{
                padding: "0.25rem 0.75rem",
                background: "white",
                border: "1px solid #10b981",
                borderRadius: "6px",
                color: "#10b981",
                fontSize: "0.75rem",
                cursor: "pointer",
              }}
            >
              Mark as Paid
            </button>
            <button
              onClick={() => handleBulkAction("delete")}
              style={{
                padding: "0.25rem 0.75rem",
                background: "#fee2e2",
                border: "1px solid #fecaca",
                borderRadius: "6px",
                color: "#ef4444",
                fontSize: "0.75rem",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>
        </div>
      )}

      {/* Orders Table */}
      <div
        style={{
          background: "white",
          borderRadius: "12px",
          border: "1px solid #edf2f7",
          overflow: "auto",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            minWidth: "1000px",
          }}
        >
          <thead>
            <tr
              style={{
                background: "#f8fafc",
                borderBottom: "1px solid #edf2f7",
              }}
            >
              <th style={{ padding: "1rem", width: "30px" }}>
                <input
                  type="checkbox"
                  checked={
                    selectedOrders.length === currentOrders.length &&
                    currentOrders.length > 0
                  }
                  onChange={handleSelectAll}
                  style={{ cursor: "pointer" }}
                />
              </th>
              <th
                style={{
                  padding: "1rem",
                  textAlign: "left",
                  color: "#475569",
                  fontSize: "0.75rem",
                  fontWeight: "600",
                }}
              >
                Order ID
              </th>
              <th
                style={{
                  padding: "1rem",
                  textAlign: "left",
                  color: "#475569",
                  fontSize: "0.75rem",
                  fontWeight: "600",
                }}
              >
                Customer
              </th>
              <th
                style={{
                  padding: "1rem",
                  textAlign: "left",
                  color: "#475569",
                  fontSize: "0.75rem",
                  fontWeight: "600",
                }}
              >
                Items
              </th>
              <th
                style={{
                  padding: "1rem",
                  textAlign: "left",
                  color: "#475569",
                  fontSize: "0.75rem",
                  fontWeight: "600",
                }}
              >
                Amount
              </th>
              <th
                style={{
                  padding: "1rem",
                  textAlign: "left",
                  color: "#475569",
                  fontSize: "0.75rem",
                  fontWeight: "600",
                }}
              >
                Status
              </th>
              <th
                style={{
                  padding: "1rem",
                  textAlign: "left",
                  color: "#475569",
                  fontSize: "0.75rem",
                  fontWeight: "600",
                }}
              >
                Date
              </th>
              <th
                style={{
                  padding: "1rem",
                  textAlign: "left",
                  color: "#475569",
                  fontSize: "0.75rem",
                  fontWeight: "600",
                }}
              >
                Payment
              </th>
              <th
                style={{
                  padding: "1rem",
                  textAlign: "center",
                  color: "#475569",
                  fontSize: "0.75rem",
                  fontWeight: "600",
                }}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.map((order) => (
              <tr key={order.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                <td style={{ padding: "1rem" }}>
                  <input
                    type="checkbox"
                    checked={selectedOrders.includes(order.id)}
                    onChange={() => handleSelectOrder(order.id)}
                    style={{ cursor: "pointer" }}
                  />
                </td>
                <td
                  style={{
                    padding: "1rem",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    color: "#1e293b",
                  }}
                >
                  {order.id}
                </td>
                <td style={{ padding: "1rem" }}>
                  <div
                    style={{
                      fontWeight: "500",
                      color: "#1e293b",
                      fontSize: "0.875rem",
                    }}
                  >
                    {order.customer}
                  </div>
                  <div style={{ color: "#64748b", fontSize: "0.75rem" }}>
                    {order.phone}
                  </div>
                </td>
                <td
                  style={{
                    padding: "1rem",
                    fontSize: "0.875rem",
                    color: "#475569",
                  }}
                >
                  {order.items}
                </td>
                <td
                  style={{
                    padding: "1rem",
                    fontSize: "0.875rem",
                    fontWeight: "600",
                    color: "#1e293b",
                  }}
                >
                  {order.amount}
                </td>
                <td style={{ padding: "1rem" }}>
                  <StatusBadge status={order.status} />
                </td>
                <td
                  style={{
                    padding: "1rem",
                    fontSize: "0.875rem",
                    color: "#475569",
                  }}
                >
                  {order.date}
                </td>
                <td
                  style={{
                    padding: "1rem",
                    fontSize: "0.875rem",
                    color: "#475569",
                  }}
                >
                  {order.paymentMethod}
                </td>
                <td style={{ padding: "1rem", textAlign: "center" }}>
                  <div
                    style={{
                      display: "flex",
                      gap: "0.5rem",
                      justifyContent: "center",
                    }}
                  >
                    <button
                      style={{
                        padding: "0.25rem",
                        background: "none",
                        border: "none",
                        color: "#64748b",
                        cursor: "pointer",
                        fontSize: "1rem",
                      }}
                    >
                      <FiEye />
                    </button>
                    <button
                      style={{
                        padding: "0.25rem",
                        background: "none",
                        border: "none",
                        color: "#64748b",
                        cursor: "pointer",
                        fontSize: "1rem",
                      }}
                    >
                      <FiEdit />
                    </button>
                    <button
                      style={{
                        padding: "0.25rem",
                        background: "none",
                        border: "none",
                        color: "#ef4444",
                        cursor: "pointer",
                        fontSize: "1rem",
                      }}
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty State */}
        {filteredOrders.length === 0 && (
          <div
            style={{
              padding: "3rem",
              textAlign: "center",
            }}
          >
            <FiPackage
              style={{
                fontSize: "3rem",
                color: "#cbd5e1",
                marginBottom: "1rem",
              }}
            />
            <h3 style={{ color: "#1e293b", marginBottom: "0.5rem" }}>
              No orders found
            </h3>
            <p style={{ color: "#64748b", fontSize: "0.875rem" }}>
              Try adjusting your search or filter to find what you're looking
              for.
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredOrders.length > 0 && (
        <div
          style={{
            marginTop: "1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div style={{ color: "#64748b", fontSize: "0.875rem" }}>
            Showing {indexOfFirstOrder + 1} to{" "}
            {Math.min(indexOfLastOrder, filteredOrders.length)} of{" "}
            {filteredOrders.length} orders
          </div>

          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              style={{
                padding: "0.5rem 1rem",
                background: "white",
                border: "1px solid #edf2f7",
                borderRadius: "6px",
                color: currentPage === 1 ? "#cbd5e1" : "#475569",
                cursor: currentPage === 1 ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.25rem",
              }}
            >
              <FiArrowLeft /> Previous
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                style={{
                  width: "36px",
                  height: "36px",
                  background: currentPage === i + 1 ? "#10b981" : "white",
                  border: "1px solid",
                  borderColor: currentPage === i + 1 ? "#10b981" : "#edf2f7",
                  borderRadius: "6px",
                  color: currentPage === i + 1 ? "white" : "#475569",
                  cursor: "pointer",
                }}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              style={{
                padding: "0.5rem 1rem",
                background: "white",
                border: "1px solid #edf2f7",
                borderRadius: "6px",
                color: currentPage === totalPages ? "#cbd5e1" : "#475569",
                cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.25rem",
              }}
            >
              Next <FiArrowRight />
            </button>
          </div>
        </div>
      )}

      {/* Add keyframes for spinner */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </DashboardLayout>
  );
};

export default Orders;
