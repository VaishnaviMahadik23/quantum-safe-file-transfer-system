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

import authApi from "../../api/authApi";

function RegisterForm({ onSwitch }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    // Validate required fields
    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !username.trim() ||
      !email.trim() ||
      !password ||
      !confirmPassword
    ) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    // Validate password confirmation
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    // Basic password validation
    if (password.length < 8) {
      setErrorMessage(
        "Password must contain at least 8 characters."
      );
      return;
    }

    try {
      setLoading(true);

      const registrationData = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        username: username.trim(),
        email: email.trim(),
        password,
      };

      console.log("========== REGISTRATION ==========");
      console.log("Registering user:", {
        firstName: registrationData.firstName,
        lastName: registrationData.lastName,
        username: registrationData.username,
        email: registrationData.email,
      });
      console.log("===================================");

      // Call the real Spring Boot registration API.
      await authApi.register(registrationData);

      /*
       * Registration succeeded.
       *
       * We do NOT automatically log the user in because
       * the backend registration and login APIs are separate.
       *
       * Auth.jsx controls the Login/Register flip card.
       * Calling onSwitch() changes the card back to Login.
       */
      setSuccessMessage(
        "Account created successfully! Please login."
      );

      // Clear password fields.
      setPassword("");
      setConfirmPassword("");

      // Give the user a moment to see the success message,
      // then switch to the Login form.
      setTimeout(() => {
        onSwitch();
      }, 1000);

    } catch (error) {
      console.error("========== REGISTRATION ERROR ==========");
      console.error("Error:", error);
      console.error("Message:", error.message);
      console.error("Code:", error.code);
      console.error("Response:", error.response);
      console.error("Request:", error.request);
      console.error("========================================");

      if (!error.response) {
        setErrorMessage(
          "Unable to connect to the backend. Please make sure the server is running."
        );
      } else if (error.response.status === 400) {
        const backendMessage =
          error.response.data?.message ||
          error.response.data?.error ||
          "Please check the information you entered.";

        setErrorMessage(backendMessage);
      } else if (error.response.status === 409) {
        const backendMessage =
          error.response.data?.message ||
          "An account with these details already exists.";

        setErrorMessage(backendMessage);
      } else if (error.response.status === 422) {
        const backendMessage =
          error.response.data?.message ||
          "The provided registration information is invalid.";

        setErrorMessage(backendMessage);
      } else {
        const backendMessage =
          error.response.data?.message ||
          "Registration failed. Please try again.";

        setErrorMessage(backendMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-form">

      <h2>Create Account</h2>

      <form onSubmit={handleSubmit}>

        {/* Error Message */}

        {errorMessage && (
          <div
            style={{
              padding: "12px 14px",
              marginBottom: "15px",
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

        {/* Success Message */}

        {successMessage && (
          <div
            style={{
              padding: "12px 14px",
              marginBottom: "15px",
              borderRadius: "10px",
              background: "rgba(34, 197, 94, 0.12)",
              border: "1px solid rgba(34, 197, 94, 0.35)",
              color: "#86EFAC",
              fontSize: "14px",
            }}
            role="status"
          >
            {successMessage}
          </div>
        )}

        {/* First Name */}

        <div className="input-group">

          <FaUser className="input-icon" />

          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(event) =>
              setFirstName(event.target.value)
            }
            autoComplete="given-name"
            disabled={loading}
            required
          />

        </div>

        {/* Last Name */}

        <div className="input-group">

          <FaUser className="input-icon" />

          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(event) =>
              setLastName(event.target.value)
            }
            autoComplete="family-name"
            disabled={loading}
            required
          />

        </div>

        {/* Username */}

        <div className="input-group">

          <FaUser className="input-icon" />

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(event) =>
              setUsername(event.target.value)
            }
            autoComplete="username"
            disabled={loading}
            required
          />

        </div>

        {/* Email */}

        <div className="input-group">

          <FaEnvelope className="input-icon" />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
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
            onChange={(event) =>
              setPassword(event.target.value)
            }
            autoComplete="new-password"
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

        {/* Confirm Password */}

        <div className="input-group">

          <FaLock className="input-icon" />

          <input
            type={
              showConfirmPassword
                ? "text"
                : "password"
            }
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(event) =>
              setConfirmPassword(event.target.value)
            }
            autoComplete="new-password"
            disabled={loading}
            required
          />

          <button
            type="button"
            className="eye-btn"
            onClick={() =>
              setShowConfirmPassword(
                !showConfirmPassword
              )
            }
            disabled={loading}
            aria-label={
              showConfirmPassword
                ? "Hide confirm password"
                : "Show confirm password"
            }
          >
            {showConfirmPassword ? (
              <FaEyeSlash />
            ) : (
              <FaEye />
            )}
          </button>

        </div>

        {/* Register Button */}

        <button
          className="register-btn"
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Creating Account..."
            : "Create Account"}

          {!loading && <FaArrowRight />}
        </button>

      </form>

      {/* Switch to Login */}

      <button
        className="login-switch"
        type="button"
        onClick={onSwitch}
        disabled={loading}
      >
        Already have an account?
      </button>

    </div>
  );
}

export default RegisterForm;