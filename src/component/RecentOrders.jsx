import React from "react";
import "./RecentOrders.css";

function RecentOrders() {
  return (
    <div className="dashboard-grid">

      {/* Recent Orders */}
      <div className="recent-orders">
        <div className="card-header">
          <h3>Recent Orders</h3>
          <span className="view-all">View All →</span>
        </div>

        <div className="order">
          <div className="avatar">A</div>

          <div className="order-info">
            <p className="name">Amaka Johnson</p>
            <p className="product">Ankara Set × 2</p>
          </div>

          <div className="order-right">
            <p className="amount">₦45,000</p>
            <p className="status paid">● paid <span>2 mins ago</span></p>
          </div>
        </div>

        <div className="order">
          <div className="avatar">C</div>

          <div className="order-info">
            <p className="name">Chidera Okonkwo</p>
            <p className="product">Body Butter × 3</p>
          </div>

          <div className="order-right">
            <p className="amount">₦12,500</p>
            <p className="status unpaid">● unpaid <span>15 mins ago</span></p>
          </div>
        </div>

        <div className="order">
          <div className="avatar">B</div>

          <div className="order-info">
            <p className="name">Blessing Michael</p>
            <p className="product">Birthday Cake</p>
          </div>

          <div className="order-right">
            <p className="amount">₦25,000</p>
            <p className="status pending">● pending <span>1 hour ago</span></p>
          </div>
        </div>

        <div className="order">
          <div className="avatar">K</div>

          <div className="order-info">
            <p className="name">Kenneth Adebayo</p>
            <p className="product">Men's Wear Set</p>
          </div>

          <div className="order-right">
            <p className="amount">₦38,000</p>
            <p className="status paid">● paid <span>3 hours ago</span></p>
          </div>
        </div>
      </div>

      {/* Top Products */}
      <div className="top-products">

        <div className="card-header">
          <h3>Top Products</h3>
          <span className="view-all">View All →</span>
        </div>

        <div className="product">
          <div>
            <p className="product-name">Ankara Set</p>
            <p className="sales">45 sales • ₦225,000</p>
          </div>

          <span className="growth">↗ 15%</span>
        </div>

        <div className="product">
          <div>
            <p className="product-name">Body Butter</p>
            <p className="sales">38 sales • ₦95,000</p>
          </div>

          <span className="growth">↗ 22%</span>
        </div>

        <div className="product">
          <div>
            <p className="product-name">Birthday Cake</p>
            <p className="sales">32 sales • ₦160,000</p>
          </div>

          <span className="growth">↗ 8%</span>
        </div>

        <div className="product">
          <div>
            <p className="product-name">Men's Wear</p>
            <p className="sales">28 sales • ₦210,000</p>
          </div>

          <span className="growth">↗ 12%</span>
        </div>

      </div>

    </div>
  );
}

export default RecentOrders;