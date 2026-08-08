import "./Navbar.css";
import { FaBell, FaSearch, FaUserCircle } from "react-icons/fa";

function Navbar() {
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

        <button className="notification-btn">

          <FaBell />

          <span className="notification-badge">3</span>

        </button>

        <div className="user-profile">

          <FaUserCircle className="avatar"/>

          <div>

            <h4>Vaishnavi</h4>

            <p>Online</p>

          </div>

        </div>

      </div>

    </header>
  );
}

export default Navbar;