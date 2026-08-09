import { NavLink } from "react-router-dom";
import "./LandingNavbar.css";

function LandingNavbar() {
  return (
    <header className="landing-navbar">

      <div className="landing-logo">

        <div className="logo-icon">
          Q
        </div>

        <div>
          <h2>QuantumSafe</h2>
          <p>Post-Quantum Secure Transfer</p>
        </div>

      </div>

      <div className="landing-auth">

        <NavLink
          to="/auth?mode=login"
          className="btn-outline"
        >
          Login
        </NavLink>

        <NavLink
          to="/auth?mode=register"
          className="btn-primary"
        >
          Register
        </NavLink>

      </div>

    </header>
  );
}

export default LandingNavbar;