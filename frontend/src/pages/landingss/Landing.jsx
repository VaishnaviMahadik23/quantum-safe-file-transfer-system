import "./Landing.css";
import { Link } from "react-router-dom";
import {
  FaShieldAlt,
  FaLock,
  FaBolt,
  FaArrowRight,
} from "react-icons/fa";

function Landing() {
  return (
    <div className="landing">

      {/* Navbar */}

      <nav className="landing-navbar">

        <div className="logo">

          <div className="logo-circle">Q</div>

          <div>
            <h2>QuantumSafe</h2>
            <p>Secure File Transfer</p>
          </div>

        </div>

        <div className="nav-buttons">

          <Link to="/login" className="login-btn">
            Login
          </Link>

          <Link to="/register" className="register-btn">
            Register
          </Link>

        </div>

      </nav>

      {/* Hero */}

      <section className="hero">

        <div className="hero-left">

          <span className="badge">
            Quantum Resistant Security
          </span>

          <h1>
            Secure File Transfer using
            <span> Post-Quantum Cryptography</span>
          </h1>

          <p>
            Transfer confidential files using AES-256-GCM,
            ML-KEM (Kyber), ML-DSA (Dilithium),
            and SHA3-256 with enterprise-grade security.
          </p>

          <div className="hero-buttons">

            <Link to="/register" className="primary-btn">
              Get Started
            </Link>

            <Link to="/login" className="secondary-btn">
              Login
            </Link>

          </div>

        </div>

        <div className="hero-rigth">

          <div className="security-card">

            <div className="hero-icon">
                    <FaShieldAlt />
            </div>

            <h3>Quantum Safe</h3>

            <p>
              Future-proof cryptography powered by
              NIST standardized algorithms.
            </p>

          </div>

        </div>

      </section>

      {/* Features */}

      <section className="features">

        <div className="feature-card">

          
          <div className="hero-icon">
                    <FaLock/>
            </div>

          <h3>AES-256-GCM</h3>

          <p>High-speed symmetric encryption for files.</p>

        </div>

        <div className="feature-card">

          <div className="hero-icon">
                    <FaShieldAlt />
          </div>

          <h3>ML-KEM</h3>

          <p>Post-Quantum key encapsulation mechanism.</p>

        </div>

        <div className="feature-card">

        <div className="hero-icon">
                    <FaBolt/>
            </div>
          

          <h3>ML-DSA</h3>

          <p>Digital signatures with quantum resistance.</p>

        </div>

      </section>

      {/* Footer */}

      <footer>

        © 2026 QuantumSafe File Transfer Application

      </footer>

    </div>
  );
}

export default Landing;