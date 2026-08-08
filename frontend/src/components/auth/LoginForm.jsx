import { useState } from "react";
import "./LoginForm.css";

import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
} from "react-icons/fa";

function LoginForm({ onSwitch }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="login-form">

      <h2>Welcome Back</h2>

      <p>
        Sign in to access your secure file transfer dashboard.
      </p>

      <form>

        {/* Email */}

        <div className="input-group">

          <FaEnvelope className="input-icon" />

          <input
            type="email"
            placeholder="Email Address"
          />

        </div>

        {/* Password */}

        <div className="input-group">

          <FaLock className="input-icon" />

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
          />

          <button
            type="button"
            className="eye-btn"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>

        </div>

        <div className="login-options">

          <label>

            <input type="checkbox" />

            Remember Me

          </label>

          <button
            type="button"
            className="forgot-btn"
          >
            Forgot Password?
          </button>

        </div>

        <button
          className="login-btn"
          type="submit"
        >
          Sign In

          <FaArrowRight />

        </button>

      </form>

      <button
        className="register-switch"
        onClick={onSwitch}
      >
        Create New Account
      </button>

    </div>
  );
}

export default LoginForm;