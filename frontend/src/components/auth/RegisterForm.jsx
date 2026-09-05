import { useState } from "react";

import "./RegisterForm.css";

import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
  FaShieldAlt,
  FaCircle,
  FaCheck,
} from "react-icons/fa";

import authApi from "../../api/authApi";

function RegisterForm({ onSwitch }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);

  const [errorMessage, setErrorMessage] =
    useState("");

  const [successMessage, setSuccessMessage] =
    useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !username.trim() ||
      !email.trim() ||
      !password ||
      !confirmPassword
    ) {
      setErrorMessage(
        "Please complete all required fields."
      );
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage(
        "Passwords do not match."
      );
      return;
    }

    if (password.length < 8) {
      setErrorMessage(
        "Password must contain at least 8 characters."
      );
      return;
    }

    try {
      setLoading(true);

      await authApi.register({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        username: username.trim(),
        email: email.trim(),
        password,
      });

      setSuccessMessage(
        "Identity created successfully. Redirecting to secure login..."
      );

      setPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        onSwitch();
      }, 1400);

    } catch (error) {
      console.error("REGISTRATION ERROR:", error);

      if (!error.response) {
        setErrorMessage(
          "Unable to connect to the backend. Please make sure the server is running."
        );
      } else if (
        error.response.status === 400
      ) {
        setErrorMessage(
          error.response.data?.message ||
            error.response.data?.error ||
            "Please check the information entered."
        );
      } else if (
        error.response.status === 409
      ) {
        setErrorMessage(
          error.response.data?.message ||
            "An account with these details already exists."
        );
      } else if (
        error.response.status === 422
      ) {
        setErrorMessage(
          error.response.data?.message ||
            "The registration information is invalid."
        );
      } else {
        setErrorMessage(
          error.response.data?.message ||
            "Registration failed. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-form">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="register-top">

        <div className="auth-brand-mark register-brand">

          <div className="auth-brand-icon">
            <FaShieldAlt />
          </div>

          <div>
            <span>QUANTUMSAFE</span>
            <small>IDENTITY INITIALIZATION</small>
          </div>

        </div>

        <div className="register-code">
          02 / 02
        </div>

      </div>

      <div className="register-heading">

        <div className="register-eyebrow">
          <FaCircle />
          NEW SECURITY IDENTITY
        </div>

        <h2>
          Create <span>Account.</span>
        </h2>

        <p>
          Initialize your secure identity and
          enter the QuantumSafe network.
        </p>

      </div>

      <form onSubmit={handleSubmit}>

        {/* =================================================
            MESSAGES
        ================================================= */}

        {errorMessage && (
          <div
            className="auth-message register-error"
            role="alert"
          >
            <span className="message-dot"></span>
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div
            className="auth-message register-success"
            role="status"
          >
            <FaCheck />
            {successMessage}
          </div>
        )}

        {/* =================================================
            NAME ROW
        ================================================= */}

        <div className="register-two-column">

          <div className="auth-field">

            <label htmlFor="first-name">
              FIRST NAME
            </label>

            <div className="input-group">

              <FaUser className="input-icon" />

              <input
                id="first-name"
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={(e) =>
                  setFirstName(e.target.value)
                }
                autoComplete="given-name"
                disabled={loading}
                required
              />

            </div>

          </div>

          <div className="auth-field">

            <label htmlFor="last-name">
              LAST NAME
            </label>

            <div className="input-group">

              <FaUser className="input-icon" />

              <input
                id="last-name"
                type="text"
                placeholder="Last name"
                value={lastName}
                onChange={(e) =>
                  setLastName(e.target.value)
                }
                autoComplete="family-name"
                disabled={loading}
                required
              />

            </div>

          </div>

        </div>

        {/* USERNAME */}

        <div className="auth-field">

          <label htmlFor="username">
            USERNAME
          </label>

          <div className="input-group">

            <FaUser className="input-icon" />

            <input
              id="username"
              type="text"
              placeholder="Choose a username"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
              autoComplete="username"
              disabled={loading}
              required
            />

          </div>

        </div>

        {/* EMAIL */}

        <div className="auth-field">

          <label htmlFor="register-email">
            EMAIL ADDRESS
          </label>

          <div className="input-group">

            <FaEnvelope className="input-icon" />

            <input
              id="register-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              autoComplete="email"
              disabled={loading}
              required
            />

          </div>

        </div>

        {/* PASSWORD */}

        <div className="register-password-row">

          <div className="auth-field">

            <label htmlFor="register-password">
              PASSWORD
            </label>

            <div className="input-group">

              <FaLock className="input-icon" />

              <input
                id="register-password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Min. 8 characters"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
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
              >
                {showPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>

            </div>

          </div>

          <div className="auth-field">

            <label htmlFor="confirm-password">
              CONFIRM
            </label>

            <div className="input-group">

              <FaLock className="input-icon" />

              <input
                id="confirm-password"
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                placeholder="Repeat password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
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
              >
                {showConfirmPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>

            </div>

          </div>

        </div>

        {/* PASSWORD STATUS */}

        <div className="password-security">

          <div className="password-security-line">
            <span
              className={
                password.length >= 8
                  ? "active"
                  : ""
              }
            ></span>

            <span
              className={
                password.length >= 12
                  ? "active"
                  : ""
              }
            ></span>

            <span
              className={
                /[A-Z]/.test(password) &&
                /[0-9]/.test(password)
                  ? "active"
                  : ""
              }
            ></span>
          </div>

          <span>
            {password.length >= 8
              ? "PASSWORD REQUIREMENTS SATISFIED"
              : "MINIMUM 8 CHARACTERS"}
          </span>

        </div>

        {/* BUTTON */}

        <button
          className="register-btn"
          type="submit"
          disabled={loading}
        >

          <span>
            {loading
              ? "Initializing Identity..."
              : "Create Secure Account"}
          </span>

          {!loading && <FaArrowRight />}

        </button>

      </form>

      {/* SWITCH */}

      <div className="auth-switch">

        <span>
          Already have a QuantumSafe identity?
        </span>

        <button
          type="button"
          onClick={onSwitch}
          disabled={loading}
        >
          Sign In
        </button>

      </div>

      <div className="auth-security-footer">

        <FaShieldAlt />

        <span>HYBRID ENCRYPTION</span>

        <i></i>

        <span>QUANTUM-RESISTANT</span>

      </div>

    </div>
  );
}

export default RegisterForm;