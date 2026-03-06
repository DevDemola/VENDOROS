// SignupPage.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiMail,
  FiLock,
  FiUser,
  FiShoppingBag,
  FiEye,
  FiEyeOff,
  FiCheck,
  FiArrowLeft,
  FiAlertCircle,
  FiPhone,
  FiBriefcase,
} from "react-icons/fi";
import { FaGoogle, FaWhatsapp } from "react-icons/fa";
import "./Signup.css";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    businessName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  // Password strength checker
  const checkPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    setPasswordStrength(strength);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    // Check password strength
    if (name === "password") {
      checkPasswordStrength(value);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.businessName.trim()) {
      newErrors.businessName = "Business name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{11,14}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Phone number is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "You must agree to the terms";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    // Simulate API call
    try {
    //   await new Promise((resolve) => setTimeout(resolve, 1500));
      // On success, redirect to login or dashboard
      navigate("/login", {
        state: { message: "Account created successfully! Please log in." },
      });
      console.log("Login component mounted");
    } catch (error) {
      setErrors({ form: "Something went wrong. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrengthText = () => {
    switch (passwordStrength) {
      case 0:
        return { text: "Very weak", color: "#ef4444" };
      case 1:
        return { text: "Weak", color: "#f59e0b" };
      case 2:
        return { text: "Fair", color: "#f59e0b" };
      case 3:
        return { text: "Good", color: "#10b981" };
      case 4:
        return { text: "Strong", color: "#10b981" };
      default:
        return { text: "", color: "" };
    }
  };

  return (
    <div className="signup-page">
      {/* Background Pattern */}
      <div className="signup-bg">
        <div className="bg-pattern"></div>
      </div>

      <div className="signup-container">
        {/* Left Side - Branding */}
        <div className="signup-brand">
          <div className="brand-content">
            <Link to="/" className="brand-logo">
              <div className="logo-icon">
                <FiShoppingBag />
              </div>
              <span className="logo-text">
                Vendor<span>OS</span>
              </span>
            </Link>

            <h1 className="brand-title">
              Start your <span className="gradient-text">7-day free trial</span>
            </h1>

            <p className="brand-subtitle">
              Join thousands of Nigerian vendors already growing their business
              with VendorOS.
            </p>

            <div className="brand-features">
              <div className="brand-feature">
                <div className="feature-check">
                  <FiCheck />
                </div>
                <div>
                  <h4>No credit card required</h4>
                  <p>Start for free, upgrade anytime</p>
                </div>
              </div>

              <div className="brand-feature">
                <div className="feature-check">
                  <FiCheck />
                </div>
                <div>
                  <h4>Cancel anytime</h4>
                  <p>No contracts, no hidden fees</p>
                </div>
              </div>

              <div className="brand-feature">
                <div className="feature-check">
                  <FiCheck />
                </div>
                <div>
                  <h4>WhatsApp integration</h4>
                  <p>Works seamlessly with your business</p>
                </div>
              </div>
            </div>

            <div className="brand-testimonial">
              <div className="testimonial-avatars">
                <div className="avatar">A</div>
                <div className="avatar">F</div>
                <div className="avatar">T</div>
                <div className="avatar">K</div>
              </div>
              <p className="testimonial-text">
                <span>2,400+ vendors</span> trust VendorOS
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Signup Form */}
        <div className="signup-form-wrapper">
          <div className="form-header">
            <Link to="/" className="back-link">
              <FiArrowLeft /> Back to home
            </Link>
            <h2>Create your account</h2>
            <p className="form-subtitle">
              Already have an account? <Link to="/login">Log in</Link>
            </p>
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="signup-form">
            {errors.form && (
              <div className="form-error">
                <FiAlertCircle />
                <span>{errors.form}</span>
              </div>
            )}

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="fullName">
                  <FiUser className="input-icon" />
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={errors.fullName ? "error" : ""}
                />
                {errors.fullName && (
                  <span className="error-message">{errors.fullName}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="businessName">
                  <FiBriefcase className="input-icon" />
                  Business Name
                </label>
                <input
                  type="text"
                  id="businessName"
                  name="businessName"
                  placeholder="Enter your business name"
                  value={formData.businessName}
                  onChange={handleChange}
                  className={errors.businessName ? "error" : ""}
                />
                {errors.businessName && (
                  <span className="error-message">{errors.businessName}</span>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">
                  <FiMail className="input-icon" />
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? "error" : ""}
                />
                {errors.email && (
                  <span className="error-message">{errors.email}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="phone">
                  <FiPhone className="input-icon" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="0803 123 4567"
                  value={formData.phone}
                  onChange={handleChange}
                  className={errors.phone ? "error" : ""}
                />
                {errors.phone && (
                  <span className="error-message">{errors.phone}</span>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="password">
                  <FiLock className="input-icon" />
                  Password
                </label>
                <div className="password-input-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                    className={errors.password ? "error" : ""}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
                {formData.password && (
                  <div className="password-strength">
                    <div className="strength-bars">
                      {[1, 2, 3, 4].map((level) => (
                        <div
                          key={level}
                          className={`strength-bar ${level <= passwordStrength ? "active" : ""}`}
                          style={{
                            backgroundColor:
                              level <= passwordStrength
                                ? getPasswordStrengthText().color
                                : "#e5e7eb",
                          }}
                        ></div>
                      ))}
                    </div>
                    <span
                      className="strength-text"
                      style={{ color: getPasswordStrengthText().color }}
                    >
                      {getPasswordStrengthText().text}
                    </span>
                  </div>
                )}
                {errors.password && (
                  <span className="error-message">{errors.password}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">
                  <FiLock className="input-icon" />
                  Confirm Password
                </label>
                <div className="password-input-wrapper">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={errors.confirmPassword ? "error" : ""}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <span className="error-message">
                    {errors.confirmPassword}
                  </span>
                )}
              </div>
            </div>

            <div className="form-checkbox">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                />
                <span className="checkbox-text">
                  I agree to the <Link to="/terms">Terms of Service</Link> and{" "}
                  <Link to="/privacy">Privacy Policy</Link>
                </span>
              </label>
              {errors.agreeTerms && (
                <span className="error-message">{errors.agreeTerms}</span>
              )}
            </div>

            <button type="submit" className="submit-btn" disabled={isLoading} >
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  Creating account...
                </>
              ) : (
                "Create free account"
              )}
            </button>

            <p className="form-note">
              By signing up, you agree to receive updates via WhatsApp about
              your account.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
