import React, { useState } from "react";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      return;
    }

    console.log("Reset link requested:", email);
  };

  return (
    <div className="forgot-page">

      {/* Background */}
      <div className="forgot-bg">
        <div className="forgot-circle forgot-circle-one"></div>
        <div className="forgot-circle forgot-circle-two"></div>
      </div>

      <div className="forgot-card">

        {/* LEFT */}
        <div className="forgot-left">

          <div className="forgot-brand">
            <div className="forgot-brand-icon">
              Q
            </div>

            <span>QuantumSafe</span>
          </div>

          <div className="forgot-left-content">

            <div className="forgot-security-icon">
              🔐
            </div>

            <h1>
              Secure your
              <span>account.</span>
            </h1>

            <p>
              Your security is our priority. Advanced encryption
              technology keeps your files and personal information
              protected.
            </p>

          </div>

        </div>


        {/* RIGHT */}
        <div className="forgot-right">

          <div className="forgot-form">

            <div className="forgot-form-icon">
              🔑
            </div>

            <h2>
              Forgot your password?
            </h2>

            <p className="forgot-description">
              Enter your registered email address and we'll send
              you a secure link to reset your password.
            </p>

            <form onSubmit={handleSubmit}>

              <div className="forgot-input-group">

                <label htmlFor="forgot-email">
                  Email Address
                </label>

                <input
                  id="forgot-email"
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

              </div>

              <button
                type="submit"
                className="forgot-reset-btn"
              >
                Send Reset Link

                <span className="forgot-reset-arrow">
                  →
                </span>
              </button>

            </form>


          </div>

        </div>

      </div>

    </div>
  );
};

export default ForgotPassword;