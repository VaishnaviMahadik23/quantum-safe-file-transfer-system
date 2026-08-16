import {
  FaUser,
  FaEnvelope,
  FaIdBadge,
  FaShieldAlt,
  FaCheckCircle,
  FaKey,
  FaFingerprint,
  FaEdit,
  FaInfoCircle,
} from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";

import "./Profile.css";
import MainLayout from "../../layouts/MainLayout";

function Profile() {
  const { user, loading, isAuthenticated } = useAuth();

  /*
   * AuthContext restores the authenticated user using:
   *
   * GET /api/v1/users/me
   *
   * The JWT itself is never displayed on this page.
   */

  if (loading) {
    return (
      <div className="profile-page">
        <div className="profile-loading">
          <div className="profile-loading-spinner"></div>

          <p>
            Loading your profile...
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="profile-page">
        <div className="profile-empty">
          <div className="profile-empty-icon">
            <FaInfoCircle />
          </div>

          <h2>
            Profile Unavailable
          </h2>

          <p>
            Your authenticated user information could not
            be loaded. Please sign in again.
          </p>
        </div>
      </div>
    );
  }

  const firstName = user.firstName || "";
  const lastName = user.lastName || "";

  const fullName =
    `${firstName} ${lastName}`.trim() ||
    user.username ||
    "User";

  const initials =
    `${firstName.charAt(0)}${lastName.charAt(0)}`
      .toUpperCase() ||
    user.username?.charAt(0).toUpperCase() ||
    "U";

  const role = user.role || "USER";
  const status = user.status || "ACTIVE";

  return (
    <MainLayout>
    <div className="profile-page">

      {/* =========================
          PAGE HEADER
      ========================== */}

      <div className="profile-header">

        <div>

          <span className="profile-eyebrow">
            ACCOUNT MANAGEMENT
          </span>

          <h1>
            My Profile
          </h1>

          <p>
            View your authenticated account information
            and security status.
          </p>

        </div>

        <div className="profile-security-badge">

          <FaShieldAlt />

          <span>
            Quantum-Safe Account
          </span>

        </div>

      </div>

      {/* =========================
          PROFILE OVERVIEW
      ========================== */}

      <section className="profile-overview">

        <div className="profile-avatar">
          {initials}
        </div>

        <div className="profile-main-info">

          <h2>
            {fullName}
          </h2>

          <p>
            @{user.username || "username"}
          </p>

          <div className="profile-meta">

            <span className="profile-role">
              <FaIdBadge />
              {role}
            </span>

            <span
              className={`profile-status ${status.toLowerCase()}`}
            >
              <FaCheckCircle />
              {status}
            </span>

          </div>

        </div>

        <div className="profile-auth-status">

          <div className="profile-auth-icon">
            <FaShieldAlt />
          </div>

          <div>

            <span>
              Authentication
            </span>

            <strong>
              Secure
            </strong>

          </div>

        </div>

      </section>

      {/* =========================
          ACCOUNT INFORMATION
      ========================== */}

      <section className="profile-section">

        <div className="profile-section-header">

          <div>

            <h2>
              Account Information
            </h2>

            <p>
              Information associated with your account.
            </p>

          </div>

          <div className="profile-readonly-badge">
            Read Only
          </div>

        </div>

        <div className="profile-info-grid">

          {/* First Name */}

          <div className="profile-info-card">

            <div className="profile-info-icon">
              <FaUser />
            </div>

            <div className="profile-info-content">

              <span>
                First Name
              </span>

              <strong>
                {user.firstName || "—"}
              </strong>

            </div>

          </div>

          {/* Last Name */}

          <div className="profile-info-card">

            <div className="profile-info-icon">
              <FaUser />
            </div>

            <div className="profile-info-content">

              <span>
                Last Name
              </span>

              <strong>
                {user.lastName || "—"}
              </strong>

            </div>

          </div>

          {/* Username */}

          <div className="profile-info-card">

            <div className="profile-info-icon">
              <FaIdBadge />
            </div>

            <div className="profile-info-content">

              <span>
                Username
              </span>

              <strong>
                {user.username || "—"}
              </strong>

            </div>

          </div>

          {/* Email */}

          <div className="profile-info-card">

            <div className="profile-info-icon">
              <FaEnvelope />
            </div>

            <div className="profile-info-content">

              <span>
                Email Address
              </span>

              <strong className="profile-email">
                {user.email || "—"}
              </strong>

            </div>

          </div>

          {/* Role */}

          <div className="profile-info-card">

            <div className="profile-info-icon">
              <FaShieldAlt />
            </div>

            <div className="profile-info-content">

              <span>
                Account Role
              </span>

              <strong>
                {role}
              </strong>

            </div>

          </div>

          {/* Status */}

          <div className="profile-info-card">

            <div className="profile-info-icon">
              <FaCheckCircle />
            </div>

            <div className="profile-info-content">

              <span>
                Account Status
              </span>

              <strong className="profile-active">
                {status}
              </strong>

            </div>

          </div>

        </div>

      </section>

      {/* =========================
          USER IDENTIFIER
      ========================== */}

      <section className="profile-section">

        <div className="profile-section-header">

          <div>

            <h2>
              Account Identifier
            </h2>

            <p>
              Unique identifier assigned to your account.
            </p>

          </div>

        </div>

        <div className="profile-user-id">

          <div className="profile-user-id-icon">
            <FaFingerprint />
          </div>

          <div className="profile-user-id-content">

            <span>
              User ID
            </span>

            <strong>
              {user.userId || "Not available"}
            </strong>

          </div>

        </div>

      </section>

      {/* =========================
          SECURITY SECTION
      ========================== */}

      <section className="profile-security-section">

        <div className="profile-security-section-icon">
          <FaShieldAlt />
        </div>

        <div className="profile-security-section-content">

          <h2>
            Authentication & Security
          </h2>

          <p>
            Your account is authenticated using a
            JSON Web Token issued by the Spring Boot
            backend. The authentication token is kept
            out of the visible interface.
          </p>

          <div className="profile-security-grid">

            <div className="profile-security-item">

              <FaKey />

              <div>

                <span>
                  Authentication
                </span>

                <strong>
                  JWT
                </strong>

              </div>

            </div>

            <div className="profile-security-item">

              <FaShieldAlt />

              <div>

                <span>
                  Password Protection
                </span>

                <strong>
                  BCrypt
                </strong>

              </div>

            </div>

            <div className="profile-security-item">

              <FaFingerprint />

              <div>

                <span>
                  Account Verification
                </span>

                <strong>
                  Backend Verified
                </strong>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =========================
          FUTURE PROFILE EDITING
      ========================== */}

      <div className="profile-future-note">

        <FaInfoCircle />

        <div>

          <strong>
            Profile editing
          </strong>

          <span>
            Profile update functionality will be enabled
            when the corresponding backend API is available.
          </span>

        </div>

        <button
          type="button"
          disabled
          title="Profile update API is not available yet"
        >
          <FaEdit />
          Edit Profile
        </button>

      </div>

    </div>
  </MainLayout>
  );
}

export default Profile;