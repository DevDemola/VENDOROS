// ForgotPasswordPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiMail, 
  FiShoppingBag,
  FiArrowLeft,
  FiCheckCircle,
  FiAlertCircle
} from 'react-icons/fi';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
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
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSubmitted(true);
    } catch (error) {
      setErrors({ form: 'Something went wrong. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="forgot-page">
      <div className="forgot-bg">
        <div className="bg-pattern"></div>
      </div>

      <div className="forgot-container">
        <div className="forgot-card">
          <Link to="/" className="back-link">
            <FiArrowLeft /> Back to home
          </Link>

          <div className="forgot-header">
            <div className="header-icon">
              <FiMail />
            </div>
            <h1>Forgot password?</h1>
            <p className="header-subtitle">
              No worries, we'll send you reset instructions.
            </p>
          </div>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="forgot-form">
              {errors.form && (
                <div className="form-error">
                  <FiAlertCircle />
                  <span>{errors.form}</span>
                </div>
              )}

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrors({});
                  }}
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && (
                  <span className="error-message">{errors.email}</span>
                )}
              </div>

              <button
                type="submit"
                className="submit-btn"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="spinner"></span>
                    Sending...
                  </>
                ) : (
                  'Reset password'
                )}
              </button>
            </form>
          ) : (
            <div className="success-state">
              <div className="success-icon">
                <FiCheckCircle />
              </div>
              <h3>Check your email</h3>
              <p className="success-text">
                We've sent a password reset link to <strong>{email}</strong>
              </p>
              <div className="success-actions">
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="resend-btn"
                >
                  Resend email
                </button>
                <Link to="/login" className="back-to-login">
                  Back to login
                </Link>
              </div>
            </div>
          )}

          <div className="forgot-footer">
            <p>
              Remember your password? <Link to="/login">Log in</Link>
            </p>
          </div>
        </div>

        <div className="forgot-brand">
          <div className="brand-logo">
            <div className="logo-icon">
              <FiShoppingBag />
            </div>
            <span className="logo-text">Vendor<span>OS</span></span>
          </div>
          <p className="brand-text">
            Your all-in-one operating system for modern vendors
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;