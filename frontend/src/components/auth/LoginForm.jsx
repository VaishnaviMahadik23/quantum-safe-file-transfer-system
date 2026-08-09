import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";

import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
} from "react-icons/fa";

import authApi from "../../api/authApi";

function LoginForm({ onSwitch }) {
  const navigate = useNavigate();

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

      const loginData = {
        email: email.trim(),
        password,
      };

      const response = await authApi.login(loginData);

      // Backend returns the JWT as accessToken.
      const accessToken = response?.accessToken;

      if (!accessToken) {
        throw new Error("Authentication token was not returned by the server.");
      }

      // Store only the token.
      // The JWT is never displayed in the UI.
      localStorage.setItem("accessToken", accessToken);

      // Login succeeded.
      // AuthContext and /users/me restoration will be added
      // in the next authentication steps.
      navigate("/dashboard");
    } catch (error) {
  console.error("========== LOGIN ERROR ==========");
  console.error("Error:", error);
  console.error("Message:", error.message);
  console.error("Code:", error.code);
  console.error("Response:", error.response);
  console.error("Request:", error.request);
  console.error("=================================");

  if (!error.response) {
    setErrorMessage(
      `Backend connection failed: ${error.message || "Unknown error"}`
    );
  } else if (error.response.status === 401) {
    setErrorMessage("Invalid email or password.");
  } else if (error.response.status === 403) {
    setErrorMessage("You are not authorized to access this application.");
  } else if (error.response.status === 400) {
    const backendMessage =
      error.response.data?.message ||
      error.response.data?.error ||
      "Please check your login details.";

    setErrorMessage(backendMessage);
  } else {
    const backendMessage =
      error.response.data?.message ||
      "Login failed. Please try again.";

    setErrorMessage(backendMessage);
  }
} finally {
  setLoading(false);
}
  };

  return (
    <div className="login-form">
      <h2>Welcome Back</h2>

      <p>
        Sign in to access your secure file transfer dashboard.
      </p>

      <form onSubmit={handleSubmit}>
        {/* Error Message */}

        {errorMessage && (
          <div
            style={{
              padding: "12px 14px",
              borderRadius: "10px",
              background: "rgba(239, 68, 68, 0.12)",
              border: "1px solid rgba(239, 68, 68, 0.35)",
              color: "#FCA5A5",
              fontSize: "14px",
            }}
            role="alert"
          >
            {errorMessage}
          </div>
        )}

        {/* Email */}

        <div className="input-group">
          <FaEnvelope className="input-icon" />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            disabled={loading}
            required
          />
        </div>

        {/* Password */}

        <div className="input-group">
          <FaLock className="input-icon" />

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            disabled={loading}
            required
          />

          <button
            type="button"
            className="eye-btn"
            onClick={() => setShowPassword(!showPassword)}
            disabled={loading}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <div className="login-options">
          <label>
            <input type="checkbox" disabled={loading} />
            Remember Me
          </label>

          <button
            type="button"
            className="forgot-btn"
            disabled={loading}
          >
            Forgot Password?
          </button>
        </div>

        <button
          className="login-btn"
          type="submit"
          disabled={loading}
        >
          {loading ? "Signing In..." : "Sign In"}

          {!loading && <FaArrowRight />}
        </button>
      </form>

      <button
        className="register-switch"
        onClick={onSwitch}
        disabled={loading}
      >
        Create New Account
      </button>
    </div>
  );
}

export default LoginForm;