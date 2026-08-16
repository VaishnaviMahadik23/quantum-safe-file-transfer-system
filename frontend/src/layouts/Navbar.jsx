/*import "./Navbar.css";
import { FaBell, FaSearch, FaUserCircle } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user } = useAuth();

  const displayName =
    user?.firstName ||
    user?.username ||
    "User";

  const displayStatus =
    user?.status === "ACTIVE"
      ? "Online"
      : user?.status || "Offline";

  return (
    <header className="navbar">

      <div className="navbar-left">
        <h2>Quantum-Safe File Transfer Application</h2>

        <p>Secure • Fast • Quantum Resistant</p>
      </div>

      <div className="navbar-right">

        <div className="search-box">

          <FaSearch />

          <input
            type="text"
            placeholder="Search..."
          />

        </div>

        <button
          className="notification-btn"
          type="button"
          aria-label="Notifications"
        >
          <FaBell />

          <span className="notification-badge">3</span>
        </button>

        <div className="user-profile">

          <FaUserCircle className="avatar" />

          <div>

            <h4>{displayName}</h4>

            <p>{displayStatus}</p>

          </div>

        </div>

      </div>

    </header>
  );
}

export default Navbar; 
*/

// impoved version of navbar.jsx with better styling and responsive design
import "./newlyaddedcss_for_navbar.css";

import {
  FaBell,
  FaSearch,
  FaUserCircle,
  FaShieldAlt,
  FaChevronDown,
  FaLock,
} from "react-icons/fa";

import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user } = useAuth();

  const displayName =
    user?.firstName ||
    user?.username ||
    "User";

  const displayStatus =
    user?.status === "ACTIVE"
      ? "Online"
      : user?.status || "Offline";

  return (
    <header className="premium-navbar">

      {/* LEFT */}
      <div className="navbar-brand">

        <div className="brand-icon">
          <FaShieldAlt />
          <span className="brand-pulse"></span>
        </div>

        <div className="brand-text">
          <div className="brand-title">
            Quantum<span>Safe</span>
          </div>

          <div className="brand-subtitle">
            <FaLock />
            <span>Secure File Transfer</span>
          </div>
        </div>

      </div>


      {/* CENTER SECURITY STATUS */}
      <div className="security-status">

        <span className="status-dot"></span>

        <div className="status-content">
          <span className="status-title">
            Secure Network
          </span>

          <span className="status-description">
            Quantum-resistant protection active
          </span>
        </div>

      </div>


      {/* RIGHT */}
      <div className="navbar-actions">

        {/* SEARCH */}
        <div className="premium-search">

          <FaSearch className="search-icon" />

          <input
            type="text"
            placeholder="Search files, users..."
          />

          <span className="search-shortcut">
            Ctrl K
          </span>

        </div>


        {/* NOTIFICATION */}
        <button
          className="premium-notification"
          type="button"
          aria-label="Notifications"
        >

          <FaBell />

          <span className="notification-dot"></span>

        </button>


        {/* USER */}
        <div className="premium-user">

          <div className="user-avatar">
            <FaUserCircle />
          </div>

          <div className="user-info">

            <span className="user-name">
              {displayName}
            </span>

            <span className="user-status">
              <span></span>
              {displayStatus}
            </span>

          </div>

          <FaChevronDown className="user-chevron" />

        </div>

      </div>

    </header>
  );
}

export default Navbar;
