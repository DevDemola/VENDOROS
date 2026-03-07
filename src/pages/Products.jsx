import { useEffect, useState } from "react";
import DashboardLayout from "../component/DashboardLayout";
import {
  FiBox,
  FiSearch,
  FiFilter,
  FiDownload,
  FiPlus,
  FiEdit,
  FiTrash2,
  FiEye,
  FiTrendingUp,
  FiPackage,
  FiAlertCircle,
  FiDollarSign,
  FiShoppingBag,
  FiArrowLeft,
  FiArrowRight,
  FiGrid,
  FiList,
  FiStar,
  FiClock
} from "react-icons/fi";
import "./Products.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const productsPerPage = 12;

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 1000);
  }, []);

  const mockProducts = [
    {
      id: "PRD-001",
      name: "Ankara Set",
      category: "Fashion",
      price: 45000,
      cost: 28000,
      stock: 23,
      sold: 156,
      rating: 4.8,
      image: null,
      status: "active",
      sku: "ANK-001",
      description: "Complete Ankara outfit with blouse, wrapper and headtie"
    },
    {
      id: "PRD-002",
      name: "Body Butter - Shea",
      category: "Beauty",
      price: 12500,
      cost: 6500,
      stock: 45,
      sold: 342,
      rating: 4.9,
      image: null,
      status: "active",
      sku: "BB-002",
      description: "Natural shea butter with coconut oil"
    },
    {
      id: "PRD-003",
      name: "Birthday Cake (Large)",
      category: "Food",
      price: 25000,
      cost: 12000,
      stock: 3,
      sold: 28,
      rating: 4.7,
      image: null,
      status: "low-stock",
      sku: "CAKE-003",
      description: "Custom birthday cake serves 20 people"
    },
    {
      id: "PRD-004",
      name: "Men's Wear Set",
      category: "Fashion",
      price: 38000,
      cost: 22000,
      stock: 12,
      sold: 89,
      rating: 4.6,
      image: null,
      status: "active",
      sku: "MEN-004",
      description: "Complete men's outfit with shirt and trousers"
    },
    {
      id: "PRD-005",
      name: "Lipstick Set",
      category: "Beauty",
      price: 8500,
      cost: 4000,
      stock: 67,
      sold: 234,
      rating: 4.5,
      image: null,
      status: "active",
      sku: "LIP-005",
      description: "Set of 4 matte lipstick shades"
    },
    {
      id: "PRD-006",
      name: "Aso Oke Fabric",
      category: "Fashion",
      price: 15000,
      cost: 9000,
      stock: 0,
      sold: 45,
      rating: 4.4,
      image: null,
      status: "out-of-stock",
      sku: "ASO-006",
      description: "Traditional Yoruba woven fabric per yard"
    },
    {
      id: "PRD-007",
      name: "Beaded Necklace",
      category: "Accessories",
      price: 5500,
      cost: 2500,
      stock: 18,
      sold: 67,
      rating: 4.3,
      image: null,
      status: "active",
      sku: "NECK-007",
      description: "Handmade beaded necklace"
    },
    {
      id: "PRD-008",
      name: "Kaftan Set",
      category: "Fashion",
      price: 42000,
      cost: 25000,
      stock: 8,
      sold: 34,
      rating: 4.8,
      image: null,
      status: "low-stock",
      sku: "KAF-008",
      description: "Embroidered kaftan with matching cap"
    },
    {
      id: "PRD-009",
      name: "Face Scrub",
      category: "Beauty",
      price: 7500,
      cost: 3500,
      stock: 42,
      sold: 189,
      rating: 4.7,
      image: null,
      status: "active",
      sku: "FS-009",
      description: "Gentle exfoliating face scrub"
    },
    {
      id: "PRD-010",
      name: "Small Chops Tray",
      category: "Food",
      price: 18500,
      cost: 9000,
      stock: 6,
      sold: 23,
      rating: 4.6,
      image: null,
      status: "low-stock",
      sku: "SC-010",
      description: "Assorted small chops serves 10"
    },
    {
      id: "PRD-011",
      name: "Handbag",
      category: "Accessories",
      price: 22500,
      cost: 13000,
      stock: 15,
      sold: 42,
      rating: 4.5,
      image: null,
      status: "active",
      sku: "BAG-011",
      description: "Leather handbag"
    },
    {
      id: "PRD-012",
      name: "Perfume Oil",
      category: "Beauty",
      price: 9500,
      cost: 4800,
      stock: 28,
      sold: 156,
      rating: 4.9,
      image: null,
      status: "active",
      sku: "PER-012",
      description: "Long-lasting perfume oil"
    }
  ];

  // Calculate stats
  const totalProducts = products.length;
  const totalValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0);
  const lowStock = products.filter(p => p.status === "low-stock").length;
  const outOfStock = products.filter(p => p.status === "out-of-stock").length;
  const totalSold = products.reduce((sum, p) => sum + p.sold, 0);
  const totalRevenue = products.reduce((sum, p) => sum + (p.price * p.sold), 0);
  const totalProfit = products.reduce((sum, p) => sum + ((p.price - p.cost) * p.sold), 0);

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter;
    
    const matchesStock = stockFilter === "all" || 
      (stockFilter === "low" && product.status === "low-stock") ||
      (stockFilter === "out" && product.status === "out-of-stock") ||
      (stockFilter === "active" && product.status === "active");
    
    return matchesSearch && matchesCategory && matchesStock;
  });

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Categories for filter
  const categories = [...new Set(products.map(p => p.category))];

  const StatusBadge = ({ status }) => {
    const config = {
      active: { bg: "#f0fdf4", color: "#10b981", label: "Active" },
      "low-stock": { bg: "#fffbeb", color: "#f59e0b", label: "Low Stock" },
      "out-of-stock": { bg: "#fef2f2", color: "#ef4444", label: "Out of Stock" }
    };

    const style = config[status] || config.active;

    return (
      <span style={{
        padding: "0.25rem 0.5rem",
        background: style.bg,
        color: style.color,
        borderRadius: "9999px",
        fontSize: "0.75rem",
        fontWeight: "500"
      }}>
        {style.label}
      </span>
    );
  };

  const ProductGridItem = ({ product }) => (
    <div style={{
      background: "white",
      borderRadius: "12px",
      border: "1px solid #edf2f7",
      overflow: "hidden",
      transition: "all 0.2s",
      cursor: "pointer"
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = "translateY(-4px)";
      e.currentTarget.style.boxShadow = "0 10px 25px -5px rgba(0,0,0,0.1)";
      e.currentTarget.style.borderColor = "#10b981";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow = "none";
      e.currentTarget.style.borderColor = "#edf2f7";
    }}>
      {/* Product Image Placeholder */}
      <div style={{
        height: "160px",
        background: "#f1f5f9",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#94a3b8",
        fontSize: "2rem",
        position: "relative"
      }}>
        <FiPackage />
        <div style={{
          position: "absolute",
          top: "0.5rem",
          right: "0.5rem"
        }}>
          <StatusBadge status={product.status} />
        </div>
      </div>

      {/* Product Details */}
      <div style={{ padding: "1rem" }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "start",
          marginBottom: "0.5rem"
        }}>
          <div>
            <div style={{ fontWeight: "600", color: "#1e293b", fontSize: "1rem" }}>
              {product.name}
            </div>
            <div style={{ color: "#64748b", fontSize: "0.75rem" }}>
              {product.category} • SKU: {product.sku}
            </div>
          </div>
        </div>

        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "0.25rem",
          marginBottom: "0.75rem"
        }}>
          {[...Array(5)].map((_, i) => (
            <FiStar key={i} style={{
              color: i < Math.floor(product.rating) ? "#fbbf24" : "#cbd5e1",
              fill: i < Math.floor(product.rating) ? "#fbbf24" : "none",
              fontSize: "0.75rem"
            }} />
          ))}
          <span style={{ color: "#64748b", fontSize: "0.75rem", marginLeft: "0.25rem" }}>
            ({product.sold} sold)
          </span>
        </div>

        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "0.75rem"
        }}>
          <div>
            <span style={{ fontSize: "1.125rem", fontWeight: "700", color: "#1e293b" }}>
              ₦{product.price.toLocaleString()}
            </span>
            <span style={{ color: "#94a3b8", fontSize: "0.75rem", marginLeft: "0.5rem" }}>
              Cost: ₦{product.cost.toLocaleString()}
            </span>
          </div>
          <div style={{
            background: product.stock < 10 ? "#fee2e2" : "#f0fdf4",
            color: product.stock < 10 ? "#ef4444" : "#10b981",
            padding: "0.25rem 0.5rem",
            borderRadius: "6px",
            fontSize: "0.75rem",
            fontWeight: "500"
          }}>
            Stock: {product.stock}
          </div>
        </div>

        <p style={{
          color: "#64748b",
          fontSize: "0.75rem",
          marginBottom: "1rem",
          lineHeight: "1.5"
        }}>
          {product.description}
        </p>

        <div style={{
          display: "flex",
          gap: "0.5rem",
          borderTop: "1px solid #f1f5f9",
          paddingTop: "1rem"
        }}>
          <button style={{
            flex: 1,
            padding: "0.5rem",
            background: "#f8fafc",
            border: "1px solid #edf2f7",
            borderRadius: "6px",
            color: "#475569",
            fontSize: "0.75rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.25rem"
          }}>
            <FiEdit /> Edit
          </button>
          <button style={{
            flex: 1,
            padding: "0.5rem",
            background: "#f8fafc",
            border: "1px solid #edf2f7",
            borderRadius: "6px",
            color: "#475569",
            fontSize: "0.75rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.25rem"
          }}>
            <FiEye /> View
          </button>
        </div>
      </div>
    </div>
  );

  const ProductListItem = ({ product }) => (
    <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
      <td style={{ padding: "1rem" }}>
        <input type="checkbox" style={{ cursor: "pointer" }} />
      </td>
      <td style={{ padding: "1rem" }}>
        <div style={{ fontWeight: "600", color: "#1e293b", fontSize: "0.875rem" }}>
          {product.name}
        </div>
        <div style={{ color: "#64748b", fontSize: "0.75rem" }}>SKU: {product.sku}</div>
      </td>
      <td style={{ padding: "1rem", fontSize: "0.875rem", color: "#475569" }}>
        {product.category}
      </td>
      <td style={{ padding: "1rem" }}>
        <StatusBadge status={product.status} />
      </td>
      <td style={{ padding: "1rem", fontSize: "0.875rem", fontWeight: "600", color: "#1e293b" }}>
        ₦{product.price.toLocaleString()}
      </td>
      <td style={{ padding: "1rem", fontSize: "0.875rem", color: "#475569" }}>
        {product.stock}
      </td>
      <td style={{ padding: "1rem", fontSize: "0.875rem", color: "#475569" }}>
        {product.sold}
      </td>
      <td style={{ padding: "1rem", textAlign: "center" }}>
        <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center" }}>
          <button style={{
            padding: "0.25rem",
            background: "none",
            border: "none",
            color: "#64748b",
            cursor: "pointer"
          }}>
            <FiEdit />
          </button>
          <button style={{
            padding: "0.25rem",
            background: "none",
            border: "none",
            color: "#64748b",
            cursor: "pointer"
          }}>
            <FiEye />
          </button>
          <button style={{
            padding: "0.25rem",
            background: "none",
            border: "none",
            color: "#ef4444",
            cursor: "pointer"
          }}>
            <FiTrash2 />
          </button>
        </div>
      </td>
    </tr>
  );

  if (loading) {
    return (
      <DashboardLayout pageTitle="Products">
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "60vh"
        }}>
          <div style={{
            width: "40px",
            height: "40px",
            border: "3px solid #f1f5f9",
            borderTopColor: "#10b981",
            borderRadius: "50%",
            animation: "spin 1s linear infinite"
          }} />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout pageTitle="Products">
      {/* Stats Cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
        gap: "1rem",
        marginBottom: "2rem"
      }}>
        <div style={{
          background: "white",
          padding: "1.25rem",
          borderRadius: "12px",
          border: "1px solid #edf2f7"
        }}>
          <div style={{ color: "#64748b", fontSize: "0.75rem", marginBottom: "0.5rem" }}>
            Total Products
          </div>
          <div style={{ fontSize: "1.5rem", fontWeight: "700", color: "#1e293b" }}>
            {totalProducts}
          </div>
          <div style={{ color: "#94a3b8", fontSize: "0.75rem", marginTop: "0.25rem" }}>
            {categories.length} categories
          </div>
        </div>

        <div style={{
          background: "white",
          padding: "1.25rem",
          borderRadius: "12px",
          border: "1px solid #edf2f7"
        }}>
          <div style={{ color: "#64748b", fontSize: "0.75rem", marginBottom: "0.5rem" }}>
            Inventory Value
          </div>
          <div style={{ fontSize: "1.5rem", fontWeight: "700", color: "#1e293b" }}>
            ₦{totalValue.toLocaleString()}
          </div>
          <div style={{ color: "#94a3b8", fontSize: "0.75rem", marginTop: "0.25rem" }}>
            Cost value
          </div>
        </div>

        <div style={{
          background: "white",
          padding: "1.25rem",
          borderRadius: "12px",
          border: "1px solid #edf2f7"
        }}>
          <div style={{ color: "#64748b", fontSize: "0.75rem", marginBottom: "0.5rem" }}>
            Total Sold
          </div>
          <div style={{ fontSize: "1.5rem", fontWeight: "700", color: "#1e293b" }}>
            {totalSold}
          </div>
          <div style={{ color: "#10b981", fontSize: "0.75rem", marginTop: "0.25rem" }}>
            ₦{totalRevenue.toLocaleString()} revenue
          </div>
        </div>

        <div style={{
          background: "white",
          padding: "1.25rem",
          borderRadius: "12px",
          border: "1px solid #edf2f7"
        }}>
          <div style={{ color: "#64748b", fontSize: "0.75rem", marginBottom: "0.5rem" }}>
            Total Profit
          </div>
          <div style={{ fontSize: "1.5rem", fontWeight: "700", color: "#1e293b" }}>
            ₦{totalProfit.toLocaleString()}
          </div>
          <div style={{ color: "#94a3b8", fontSize: "0.75rem", marginTop: "0.25rem" }}>
            Margin: {Math.round((totalProfit / totalRevenue) * 100)}%
          </div>
        </div>

        <div style={{
          background: "#fef2f2",
          padding: "1.25rem",
          borderRadius: "12px",
          border: "1px solid #fee2e2"
        }}>
          <div style={{ color: "#ef4444", fontSize: "0.75rem", marginBottom: "0.5rem" }}>
            Low/Out of Stock
          </div>
          <div style={{ fontSize: "1.5rem", fontWeight: "700", color: "#1e293b" }}>
            {lowStock + outOfStock}
          </div>
          <div style={{ color: "#ef4444", fontSize: "0.75rem", marginTop: "0.25rem" }}>
            {lowStock} low • {outOfStock} out
          </div>
        </div>
      </div>

      {/* Actions Bar */}
      <div style={{
        background: "white",
        padding: "1rem",
        borderRadius: "12px",
        border: "1px solid #edf2f7",
        marginBottom: "1.5rem",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1rem"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flex: 1 }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            background: "#f8fafc",
            padding: "0.5rem 1rem",
            borderRadius: "8px",
            border: "1px solid #edf2f7",
            flex: 1,
            maxWidth: "400px"
          }}>
            <FiSearch style={{ color: "#94a3b8" }} />
            <input
              type="text"
              placeholder="Search products by name, category, or SKU..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                border: "none",
                background: "none",
                outline: "none",
                width: "100%",
                fontSize: "0.875rem"
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
              cursor: "pointer"
            }}
          >
            <FiFilter /> Filters
          </button>

          <div style={{
            display: "flex",
            gap: "0.25rem",
            border: "1px solid #edf2f7",
            borderRadius: "8px",
            padding: "0.25rem"
          }}>
            <button
              onClick={() => setViewMode("grid")}
              style={{
                padding: "0.5rem",
                background: viewMode === "grid" ? "#f0fdf4" : "transparent",
                border: "none",
                borderRadius: "6px",
                color: viewMode === "grid" ? "#10b981" : "#64748b",
                cursor: "pointer"
              }}
            >
              <FiGrid />
            </button>
            <button
              onClick={() => setViewMode("list")}
              style={{
                padding: "0.5rem",
                background: viewMode === "list" ? "#f0fdf4" : "transparent",
                border: "none",
                borderRadius: "6px",
                color: viewMode === "list" ? "#10b981" : "#64748b",
                cursor: "pointer"
              }}
            >
              <FiList />
            </button>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <button style={{
            padding: "0.5rem 1rem",
            background: "white",
            border: "1px solid #edf2f7",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            color: "#475569",
            cursor: "pointer"
          }}>
            <FiDownload /> Export
          </button>
          <button style={{
            padding: "0.5rem 1.5rem",
            background: "#10b981",
            border: "none",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            color: "white",
            fontWeight: "500",
            cursor: "pointer"
          }}>
            <FiPlus /> Add Product
          </button>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div style={{
          background: "white",
          padding: "1.5rem",
          borderRadius: "12px",
          border: "1px solid #edf2f7",
          marginBottom: "1.5rem",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1rem"
        }}>
          <div>
            <label style={{ display: "block", color: "#475569", fontSize: "0.75rem", marginBottom: "0.25rem" }}>
              Category
            </label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              style={{
                width: "100%",
                padding: "0.5rem",
                border: "1px solid #edf2f7",
                borderRadius: "6px",
                outline: "none",
                fontSize: "0.875rem"
              }}
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: "block", color: "#475569", fontSize: "0.75rem", marginBottom: "0.25rem" }}>
              Stock Status
            </label>
            <select
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value)}
              style={{
                width: "100%",
                padding: "0.5rem",
                border: "1px solid #edf2f7",
                borderRadius: "6px",
                outline: "none",
                fontSize: "0.875rem"
              }}
            >
              <option value="all">All Stock</option>
              <option value="active">In Stock</option>
              <option value="low">Low Stock</option>
              <option value="out">Out of Stock</option>
            </select>
          </div>

          <div>
            <label style={{ display: "block", color: "#475569", fontSize: "0.75rem", marginBottom: "0.25rem" }}>
              Sort By
            </label>
            <select
              style={{
                width: "100%",
                padding: "0.5rem",
                border: "1px solid #edf2f7",
                borderRadius: "6px",
                outline: "none",
                fontSize: "0.875rem"
              }}
            >
              <option>Name (A-Z)</option>
              <option>Price (Low to High)</option>
              <option>Price (High to Low)</option>
              <option>Best Selling</option>
              <option>Highest Rated</option>
            </select>
          </div>
        </div>
      )}

      {/* Products Display */}
      {viewMode === "grid" ? (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "1.5rem",
          marginBottom: "2rem"
        }}>
          {currentProducts.map(product => (
            <ProductGridItem key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div style={{
          background: "white",
          borderRadius: "12px",
          border: "1px solid #edf2f7",
          overflow: "auto",
          marginBottom: "2rem"
        }}>
          <table style={{
            width: "100%",
            borderCollapse: "collapse",
            minWidth: "1000px"
          }}>
            <thead>
              <tr style={{ background: "#f8fafc", borderBottom: "1px solid #edf2f7" }}>
                <th style={{ padding: "1rem", width: "30px" }}>
                  <input type="checkbox" style={{ cursor: "pointer" }} />
                </th>
                <th style={{ padding: "1rem", textAlign: "left", color: "#475569", fontSize: "0.75rem", fontWeight: "600" }}>
                  Product
                </th>
                <th style={{ padding: "1rem", textAlign: "left", color: "#475569", fontSize: "0.75rem", fontWeight: "600" }}>
                  Category
                </th>
                <th style={{ padding: "1rem", textAlign: "left", color: "#475569", fontSize: "0.75rem", fontWeight: "600" }}>
                  Status
                </th>
                <th style={{ padding: "1rem", textAlign: "left", color: "#475569", fontSize: "0.75rem", fontWeight: "600" }}>
                  Price
                </th>
                <th style={{ padding: "1rem", textAlign: "left", color: "#475569", fontSize: "0.75rem", fontWeight: "600" }}>
                  Stock
                </th>
                <th style={{ padding: "1rem", textAlign: "left", color: "#475569", fontSize: "0.75rem", fontWeight: "600" }}>
                  Sold
                </th>
                <th style={{ padding: "1rem", textAlign: "center", color: "#475569", fontSize: "0.75rem", fontWeight: "600" }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map(product => (
                <ProductListItem key={product.id} product={product} />
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div style={{
          background: "white",
          padding: "3rem",
          borderRadius: "12px",
          border: "1px solid #edf2f7",
          textAlign: "center",
          marginBottom: "2rem"
        }}>
          <FiPackage style={{ fontSize: "3rem", color: "#cbd5e1", marginBottom: "1rem" }} />
          <h3 style={{ color: "#1e293b", marginBottom: "0.5rem" }}>No products found</h3>
          <p style={{ color: "#64748b", fontSize: "0.875rem", marginBottom: "1.5rem" }}>
            Try adjusting your search or filter to find what you're looking for.
          </p>
          <button style={{
            padding: "0.75rem 1.5rem",
            background: "#10b981",
            border: "none",
            borderRadius: "8px",
            color: "white",
            fontWeight: "500",
            cursor: "pointer"
          }}>
            <FiPlus /> Add New Product
          </button>
        </div>
      )}

      {/* Pagination */}
      {filteredProducts.length > 0 && (
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1rem"
        }}>
          <div style={{ color: "#64748b", fontSize: "0.875rem" }}>
            Showing {indexOfFirstProduct + 1} to {Math.min(indexOfLastProduct, filteredProducts.length)} of {filteredProducts.length} products
          </div>
          
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
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
                gap: "0.25rem"
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
                  cursor: "pointer"
                }}
              >
                {i + 1}
              </button>
            ))}
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
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
                gap: "0.25rem"
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

export default Products;