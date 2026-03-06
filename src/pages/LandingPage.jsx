// LandingPage.jsx
import React, { useState, useEffect } from "react";
import {
  FiTrendingUp,
  FiDollarSign,
  FiPackage,
  FiShoppingBag,
  FiPlay,
  FiCheck,
  FiArrowRight,
  FiMenu,
  FiX,
  FiTwitter,
  FiLinkedin,
  FiGithub,
  FiStar,
  FiAlertCircle,
  FiClock,
  FiCreditCard,
  FiBox,
  FiUsers,
  FiBarChart2,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import "./LandingPage.css";
import { useNavigate } from "react-router-dom";

// Reusable Button Component
const Button = ({
  children,
  variant = "primary",
  size = "small",
  onClick,
  icon,
}) => {
  return (
    <button className={`btn btn-${variant} btn-${size}`} onClick={onClick}>
      {icon && <span className="btn-icon">{icon}</span>}
      <span>{children}</span>
      {variant === "primary" && <FiArrowRight className="btn-arrow" />}
    </button>
  );
};

// Feature Card Component
const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="feature-card">
      <div className="feature-icon-wrapper">
        <div className="feature-icon">{icon}</div>
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="feature-card-glow"></div>
    </div>
  );
};

// Testimonial Card Component
const TestimonialCard = ({ quote, author, role, rating = 5 }) => {
  return (
    <div className="testimonial-card">
      <div className="quote-mark">"</div>
      <p className="testimonial-quote">{quote}</p>
      <div className="testimonial-rating">
        {[...Array(rating)].map((_, i) => (
          <FiStar key={i} className="star filled" />
        ))}
      </div>
      <div className="testimonial-author">
        <div className="author-avatar">{author.charAt(0)}</div>
        <div className="author-info">
          <div className="author-name">{author}</div>
          <div className="author-role">{role}</div>
        </div>
      </div>
    </div>
  );
};

// Dashboard Mock Component
const DashboardMock = () => {
  return (
    <div className="dashboard-mock">
      <div className="dashboard-header">
        <div className="dashboard-controls">
          <span className="control red"></span>
          <span className="control yellow"></span>
          <span className="control green"></span>
        </div>
        <span className="dashboard-title">VendorOS • Dashboard Overview</span>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon green-bg">
            <FiDollarSign />
          </div>
          <div className="stat-content">
            <div className="stat-label">Total Revenue</div>
            <div className="stat-value">₦842.5K</div>
            <div className="stat-trend positive">
              <FiTrendingUp /> +18.2%
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon orange-bg">
            <FiAlertCircle />
          </div>
          <div className="stat-content">
            <div className="stat-label">Unpaid Balance</div>
            <div className="stat-value">₦63.2K</div>
            <div className="stat-trend negative">12 customers</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon blue-bg">
            <FiPackage />
          </div>
          <div className="stat-content">
            <div className="stat-label">Active Orders</div>
            <div className="stat-value">34</div>
            <div className="stat-trend positive">↑ 8 new</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon purple-bg">
            <FiBox />
          </div>
          <div className="stat-content">
            <div className="stat-label">Products</div>
            <div className="stat-value">27</div>
            <div className="stat-trend warning">3 low stock</div>
          </div>
        </div>
      </div>

      <div className="dashboard-recent">
        <div className="recent-header">
          <h4>Recent Orders</h4>
          <a href="#" className="view-all">
            View All <FiArrowRight />
          </a>
        </div>

        <div className="order-list">
          <OrderItem
            customer="Amaka J."
            item="Ankara Set × 2"
            amount="₦45,000"
            status="paid"
            icon={<FiCheck />}
          />
          <OrderItem
            customer="Chidera O."
            item="Body Butter"
            amount="₦12,500"
            status="unpaid"
            icon={<FiAlertCircle />}
          />
          <OrderItem
            customer="Blessing M."
            item="Birthday Cake"
            amount="₦25,000"
            status="pending"
            icon={<FiClock />}
          />
          <OrderItem
            customer="Kenneth A."
            item="Men's Wear Set"
            amount="₦38,000"
            status="paid"
            icon={<FiCheck />}
          />
        </div>
      </div>
    </div>
  );
};

// Order Item Component
const OrderItem = ({ customer, item, amount, status, icon }) => {
  const statusColors = {
    paid: { bg: "#10b98115", color: "#10b981", dot: "#10b981" },
    unpaid: { bg: "#ef444415", color: "#ef4444", dot: "#ef4444" },
    pending: { bg: "#f59e0b15", color: "#f59e0b", dot: "#f59e0b" },
  };

  return (
    <div className="order-item">
      <div className="order-info">
        <div className="order-customer">
          <div className="customer-avatar">{customer.charAt(0)}</div>
          <div>
            <div className="customer-name">{customer}</div>
            <div className="order-details">
              {item} • {amount}
            </div>
          </div>
        </div>
      </div>
      <div
        className="order-status"
        style={{ backgroundColor: statusColors[status].bg }}
      >
        <span
          className="status-dot"
          style={{ backgroundColor: statusColors[status].dot }}
        ></span>
        <span style={{ color: statusColors[status].color }}>{status}</span>
      </div>
    </div>
  );
};

// Navigation Component
const Navigation = ({ scrolled }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-container">
        <div className="nav-logo">
          <div className="logo-icon">
            <FiShoppingBag />
          </div>
          <span className="logo-text">
            Vendor<span>OS</span>
          </span>
        </div>

        <div className={`nav-links ${mobileMenuOpen ? "open" : ""}`}>
          <a href="#problem">Why VendorOS</a>
          <a href="#features">Features</a>
          <a href="#how">How It Works</a>
          <a href="#testimonials">Reviews</a>
        </div>

        <div className="nav-actions">
          <Button
            variant="primary"
            size="medium"
            onClick={() => navigate("/signup")}
          >
            Start Free Trial
          </Button>
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>
    </nav>
  );
};

// Main Landing Page Component
const LandingPage = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const navigate = useNavigate();
  return (
    <div className="landing-page">
      <Navigation scrolled={scrolled} />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <FaWhatsapp className="whatsapp-icon" />
              <span>Built for Nigerian Vendors</span>
            </div>

            <h1 className="hero-title">
              Stop Losing Money From <br />
              <span className="gradient-texts">WhatsApp Sales.</span>
            </h1>

            <p className="hero-description">
              VendorOS helps social media vendors track orders, manage
              inventory, and monitor unpaid customers — all in one simple
              dashboard.
            </p>

            <div className="hero-actions">
              <Button
                variant="primary"
                size="medium"
                onClick={() => navigate("/signup")}
              >
                Start Free Trial
              </Button>
            </div>

            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-number">2,400+</div>
                <div className="stat-label">Active Vendors</div>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <div className="stat-number">₦124M+</div>
                <div className="stat-label">Sales Tracked</div>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <div className="stat-number">4.9/5</div>
                <div className="stat-label">Vendor Rating</div>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <DashboardMock />
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <div className="trust-bar">
        <div className="trust-container">
          <p className="trust-text">
            Trusted by vendors across{" "}
            <span>Lagos • Abuja • Port Harcourt • Ibadan • Kano</span>
          </p>
          <div className="trust-flags">
            <span>🇳🇬</span>
            <span>🇳🇬</span>
            <span>🇳🇬</span>
          </div>
        </div>
      </div>

      {/* Problem Section */}
      <section className="problem-section" id="problem">
        <div className="section-tag">The Problem</div>
        <h2 className="section-title">
          Running Your Business From <br />
          <span className="gradient-texts">WhatsApp Isn't Enough.</span>
        </h2>
        <p className="section-subtitle">
          Managing everything in chat threads and voice notes is costing you
          money and peace of mind.
        </p>

        <div className="problem-grid">
          <FeatureCard
            icon={<FiCreditCard />}
            title="Customers Forget to Pay"
            description="You send the item and they promise to transfer later — but later never comes. Track every unpaid order automatically."
          />
          <FeatureCard
            icon={<FiPackage />}
            title="You Lose Track of Inventory"
            description="Sell something and forget to update your notes? Never oversell again with real-time inventory tracking."
          />
          <FeatureCard
            icon={<FiBarChart2 />}
            title="You Don't Know Your Profit"
            description="At month end, you can't clearly tell what you actually earned. Get instant profit reports with one click."
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section" id="features">
        <div className="section-tag">The Solution</div>
        <h2 className="section-title">
          Your Business <br />
          <span className="gradient-texts">Control Center.</span>
        </h2>

        <div className="features-showcase">
          <div className="features-grid-large">
            <div className="feature-main">
              <div className="feature-main-icon">
                <FiShoppingBag />
              </div>
              <h3>Track Orders Easily</h3>
              <p>
                Create orders in seconds. No more digging through chat history.
              </p>
              <ul className="feature-list">
                <li>
                  <FiCheck /> Create orders in under 30 seconds
                </li>
                <li>
                  <FiCheck /> Automatic customer profiles
                </li>
                <li>
                  <FiCheck /> Order history at your fingertips
                </li>
              </ul>
            </div>

            <div className="feature-main">
              <div className="feature-main-icon">
                <FiUsers />
              </div>
              <h3>Monitor Customer Debts</h3>
              <p>See exactly who owes you and how much.</p>
              <ul className="feature-list">
                <li>
                  <FiCheck /> Real-time debt tracking
                </li>
                <li>
                  <FiCheck /> Automatic payment reminders
                </li>
                <li>
                  <FiCheck /> Payment status dashboard
                </li>
              </ul>
            </div>

            <div className="feature-main">
              <div className="feature-main-icon">
                <FiPackage />
              </div>
              <h3>Auto-Update Inventory</h3>
              <p>Stock updates automatically after every sale.</p>
              <ul className="feature-list">
                <li>
                  <FiCheck /> Low stock alerts
                </li>
                <li>
                  <FiCheck /> Bulk product upload
                </li>
                <li>
                  <FiCheck /> Restock predictions
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-section" id="how">
        <div className="section-tag">Simple Process</div>
        <h2 className="section-title">
          Up and Running in <br />
          <span className="gradient-texts">3 Simple Steps</span>
        </h2>

        <div className="steps-container">
          <div className="step-item">
            <div className="step-number">01</div>
            <div className="step-content">
              <h3>Add Your Products</h3>
              <p>
                Import or add your products in bulk. Set prices, track stock
                levels, and organize categories.
              </p>
            </div>
            <div className="step-connector"></div>
          </div>

          <div className="step-item">
            <div className="step-number">02</div>
            <div className="step-content">
              <h3>Create Orders</h3>
              <p>
                Create orders directly from WhatsApp or manually. Add customer
                details and products in seconds.
              </p>
            </div>
            <div className="step-connector"></div>
          </div>

          <div className="step-item">
            <div className="step-number">03</div>
            <div className="step-content">
              <h3>Track Payments</h3>
              <p>
                Monitor paid/unpaid orders, send reminders, and get paid faster
                with payment links.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section" id="testimonials">
        <div className="section-tag">Real Vendors, Real Results</div>
        <h2 className="section-title">
          What Sellers Are <br />
          <span className="gradient-texts">Saying</span>
        </h2>

        <div className="testimonials-grid">
          <TestimonialCard
            quote="VendorOS changed how I track my sales completely. I used to lose money every month, now I know exactly what I'm earning."
            author="Adaeze N."
            role="Fashion Vendor • Lagos"
            rating={5}
          />
          <TestimonialCard
            quote="Now I never forget unpaid orders. The automatic reminders alone have helped me recover over ₦150k in owed payments."
            author="Fatima B."
            role="Beauty Products • Abuja"
            rating={5}
          />
          <TestimonialCard
            quote="I can finally see my actual profit clearly. Best decision I made for my business this year!"
            author="Tolu A."
            role="Food Vendor • Ibadan"
            rating={5}
          />
        </div>

        <div className="testimonial-cta">
          <div className="rating-badge">
            <div className="stars">
              <FiStar className="star filled" />
              <FiStar className="star filled" />
              <FiStar className="star filled" />
              <FiStar className="star filled" />
              <FiStar className="star filled" />
            </div>
            <span className="rating-text">4.9/5 from 500+ reviews</span>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="cta-section">
        <div className="cta-container">
          <h2 className="cta-title">
            Ready to Take Control <br />
            <span className="gradient-texts">of Your Sales?</span>
          </h2>

          <p className="cta-description">
            Join thousands of vendors already running smarter businesses with
            VendorOS.
          </p>

          <div className="cta-actions">
            <Button
              variant="primary"
              size="medium"
              onClick={() => navigate("/signup")}
            >
              Start Using VendorOS Today
            </Button>
          </div>

          <div className="cta-features">
            <div className="cta-feature">
              <FiCheck className="check" /> Free to start
            </div>
            <div className="cta-feature">
              <FiCheck className="check" /> No credit card
            </div>
            <div className="cta-feature">
              <FiCheck className="check" /> Setup in 5 minutes
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="footer-logo">
                <div className="logo-icon">
                  <FiShoppingBag />
                </div>
                <span className="logo-text">
                  Vendor<span>OS</span>
                </span>
              </div>
              <p className="footer-description">
                The all-in-one operating system for modern Nigerian vendors.
              </p>
            </div>

            <div className="footer-links">
              <h4>Product</h4>
              <a href="#">Features</a>
              <a href="#">Pricing</a>
              <a href="#">Integrations</a>
            </div>

            <div className="footer-links">
              <h4>Company</h4>
              <a href="#">About</a>
              <a href="#">Blog</a>
              <a href="#">Careers</a>
            </div>

            <div className="footer-links">
              <h4>Support</h4>
              <a href="#">Help Center</a>
              <a href="#">Contact</a>
              <a href="#">API Docs</a>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} VendorOS. All rights reserved.</p>
            <div className="footer-social">
              <a href="#" aria-label="Twitter">
                <FiTwitter />
              </a>
              <a href="#" aria-label="LinkedIn">
                <FiLinkedin />
              </a>
              <a href="#" aria-label="GitHub">
                <FiGithub />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
