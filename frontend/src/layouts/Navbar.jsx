import "./Navbar.css";
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