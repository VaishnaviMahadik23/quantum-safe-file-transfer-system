import { useState } from "react";
import "./RegisterForm.css";

import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
} from "react-icons/fa";

function RegisterForm({ onSwitch }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="register-form">

      <h2>Create Account</h2>

      <form>

        {/* Full Name */}

        <div className="input-group">

          <FaUser className="input-icon" />

          <input
            type="text"
            placeholder="Full Name"
          />

        </div>

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

        {/* Confirm Password */}

        <div className="input-group">

          <FaLock className="input-icon" />

          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
          />

          <button
            type="button"
            className="eye-btn"
            onClick={() =>
              setShowConfirmPassword(!showConfirmPassword)
            }
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </button>

        </div>

        {/* Password Strength */}

        <div className="password-strength">

          <div className="strength-bar"></div>

          <span>Strong Password Recommended</span>

        </div>

        {/* Register Button */}

        <button
          className="register-btn"
          type="submit"
        >
          Create Account

          <FaArrowRight />

        </button>

      </form>


      <button
        className="login-switch"
        onClick={onSwitch}
      >
        Already have an account?
      </button>

    </div>
  );
}

export default RegisterForm;