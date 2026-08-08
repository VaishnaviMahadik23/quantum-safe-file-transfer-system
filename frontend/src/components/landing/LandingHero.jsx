import "./LandingHero.css";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import SecurityCard from "./SecurityCard";

function LandingHero() {
  return (
    <section className="hero">

      {/* LEFT CONTENT */}
      <div className="hero-left">

        <span className="hero-badge">
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

            <Link to="/auth?mode=register" className="btn-primary">
                Get Started
                <FaArrowRight />
            </Link>

            <Link to="/auth?mode=login" className="btn-outline">
                Login
            </Link>

        </div>

      </div>

      {/* RIGHT CONTENT */}
      <div className="hero-right">

        <SecurityCard />

      </div>

    </section>
  );
}

export default LandingHero;