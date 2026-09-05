import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./LoginForm.css";

import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
  FaShieldAlt,
  FaCircle,
} from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";

function LoginForm({ onSwitch }) {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    setErrorMessage("");

    if (!email.trim() || !password) {
      setErrorMessage("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      await login({
        email: email.trim(),
        password,
      });

      navigate("/dashboard");
    } catch (error) {
      console.error("LOGIN ERROR:", error);

      if (!error.response) {
        if (error.message?.includes("token")) {
          setErrorMessage(
            "Login succeeded, but authentication could not be completed."
          );
        } else {
          setErrorMessage(
            "Unable to connect to the backend. Please make sure the server is running."
          );
        }
      } else if (error.response.status === 401) {
        setErrorMessage("Invalid email or password.");
      } else if (error.response.status === 403) {
        setErrorMessage(
          "You are not authorized to access this application."
        );
      } else if (error.response.status === 400) {
        setErrorMessage(
          error.response.data?.message ||
            error.response.data?.error ||
            "Please check your login details."
        );
      } else {
        setErrorMessage(
          error.response.data?.message ||
            "Login failed. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-form">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="auth-brand-mark">
        <div className="auth-brand-icon">
          <FaShieldAlt />
        </div>

        <div>
          <span>QUANTUMSAFE</span>
          <small>SECURE FILE TRANSFER</small>
        </div>
      </div>

      <div className="login-heading">

        <div className="auth-eyebrow">
          <FaCircle />
          SECURE AUTHENTICATION
        </div>

        <h2>
          Welcome <span>Back.</span>
        </h2>

        <p>
          Sign in to access your quantum-safe
          file transfer workspace.
        </p>

      </div>

      {/* =================================================
          FORM
      ================================================= */}

      <form onSubmit={handleSubmit}>

        {errorMessage && (
          <div className="auth-message auth-error" role="alert">
            <span className="message-dot"></span>
            {errorMessage}
          </div>
        )}

        {/* EMAIL */}

        <div className="auth-field">

          <label htmlFor="login-email">
            EMAIL ADDRESS
          </label>

          <div className="input-group">

            <FaEnvelope className="input-icon" />

            <input
              id="login-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              autoComplete="email"
              disabled={loading}
              required
            />

          </div>

        </div>

        {/* PASSWORD */}

        <div className="auth-field">

          <div className="field-header">

            <label htmlFor="login-password">
              PASSWORD
            </label>

            <button
              type="button"
              className="forgot-btn"
              disabled={loading}
              onClick={() =>
                navigate("/forgot-password")
              }
            >
              Forgot password?
            </button>

          </div>

          <div className="input-group">

            <FaLock className="input-icon" />

            <input
              id="login-password"
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="Enter your password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              autoComplete="current-password"
              disabled={loading}
              required
            />

            <button
              type="button"
              className="eye-btn"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              disabled={loading}
              aria-label={
                showPassword
                  ? "Hide password"
                  : "Show password"
              }
            >
              {showPassword ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
            </button>

          </div>

        </div>

        {/* OPTIONS */}

        <div className="login-options">

          <label className="remember-option">

            <input
              type="checkbox"
              disabled={loading}
            />

            <span className="custom-checkbox"></span>

            Remember this device

          </label>

          <div className="session-status">
            <span></span>
            SESSION ENCRYPTED
          </div>

        </div>

        {/* BUTTON */}

        <button
          className="login-btn"
          type="submit"
          disabled={loading}
        >

          <span>
            {loading
              ? "Authenticating..."
              : "Sign In Securely"}
          </span>

          {!loading && <FaArrowRight />}

        </button>

      </form>

      {/* =================================================
          FOOTER
      ================================================= */}

      <div className="auth-switch">

        <span>
          Don't have a QuantumSafe account?
        </span>

        <button
          type="button"
          onClick={onSwitch}
          disabled={loading}
        >
          Create Account
        </button>

      </div>

      <div className="auth-security-footer">
        <FaLock />
        <span>AES-256</span>

        <i></i>

        <span>KYBER KEM</span>

        <i></i>

        <span>DILITHIUM</span>
      </div>

    </div>
  );
}

export default LoginForm;