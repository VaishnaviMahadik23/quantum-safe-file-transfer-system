import React from "react";
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaLock,
  FaKey,
  FaSignature,
  FaShieldAlt,
  FaExchangeAlt,
  FaDatabase,
  FaFileAlt,
  FaFingerprint,
  FaBoxOpen,
  FaCheckCircle,
  FaBolt,
  FaUserShield,
  FaServer,
} from "react-icons/fa";
import { BsFingerprint } from "react-icons/bs";
import "./Landing.css";

const pipeline = [
  {
    icon: <FaFileAlt />,
    number: "01",
    title: "Original File",
    desc: "Confidential data enters the secure pipeline.",
  },
  {
    icon: <FaLock />,
    number: "02",
    title: "AES-256-GCM",
    desc: "File content is encrypted using authenticated encryption.",
  },
  {
    icon: <FaKey />,
    number: "03",
    title: "ML-KEM",
    desc: "Quantum-safe key encapsulation protects the encryption key.",
  },
  {
    icon: <FaFingerprint />,
    number: "04",
    title: "SHA3-256",
    desc: "A cryptographic hash verifies file integrity.",
  },
  {
    icon: <FaSignature />,
    number: "05",
    title: "ML-DSA",
    desc: "Digital signatures provide authenticity and integrity.",
  },
  {
    icon: <FaBoxOpen />,
    number: "06",
    title: "Secure Package",
    desc: "Encrypted data and security metadata are packaged safely.",
  },
];

const features = [
  {
    icon: <FaLock />,
    title: "AES-256-GCM",
    desc: "High-performance authenticated encryption protects confidential file contents.",
  },
  {
    icon: <FaKey />,
    title: "ML-KEM",
    desc: "Post-quantum key encapsulation designed to protect encryption keys against future threats.",
  },
  {
    icon: <FaSignature />,
    title: "ML-DSA",
    desc: "Digital signatures verify the authenticity and integrity of transferred files.",
  },
  {
    icon: <FaShieldAlt />,
    title: "SHA3-256",
    desc: "Secure cryptographic hashing detects unauthorized changes to file contents.",
  },
  {
    icon: <FaExchangeAlt />,
    title: "Secure Transfer",
    desc: "A protected transfer workflow keeps sensitive files secure throughout transmission.",
  },
  {
    icon: <FaDatabase />,
    title: "Audit Logs",
    desc: "Transfer activity can be tracked for transparency, monitoring and auditing.",
  },
];

const stats = [
  {
    value: "AES-256",
    label: "Encryption Standard",
    icon: <FaLock />,
  },
  {
    value: "ML-KEM",
    label: "Quantum-Safe KEM",
    icon: <FaKey />,
  },
  {
    value: "ML-DSA",
    label: "Digital Signatures",
    icon: <FaSignature />,
  },
  {
    value: "SHA3-256",
    label: "Integrity Protection",
    icon: <BsFingerprint />,
  },
];

function LandingPage() {
  return (
    <div className="quantum-page">

      {/* Background */}
      <div className="background-grid"></div>
      <div className="glow glow-one"></div>
      <div className="glow glow-two"></div>

      {/* ================= NAVBAR ================= */}
      <header className="navbar">

        <Link to="/" className="brand">
          <div className="brand-icon">
            Q
          </div>

          <div className="brand-text">
            <strong>QuantumSafe</strong>
            <span>SECURE FILE TRANSFER</span>
          </div>
        </Link>

        <nav className="nav-links">
          <a href="#features">Security</a>
          <a href="#pipeline">How It Works</a>
          <a href="#technology">Technology</a>
        </nav>

        <div className="nav-actions">
          <Link to="/auth?mode=login" className="nav-login">
            Login
          </Link>

          <Link to="/auth?mode=register" className="nav-register">
            Get Started
            <FaArrowRight />
          </Link>
        </div>

      </header>

      {/* ================= HERO ================= */}
      <main>

        <section className="hero">

          <div className="hero-content">

            <div className="hero-label">
              <span className="live-dot"></span>
              POST-QUANTUM SECURITY
            </div>

            <h1>
              Secure Your Files.
              <span>Ready for the Quantum Era.</span>
            </h1>

            <p className="hero-description">
              Transfer confidential files with a modern hybrid encryption
              architecture combining AES-256-GCM with post-quantum
              cryptography and digital signatures.
            </p>

            <div className="hero-buttons">

              <Link
                to="/auth?mode=register"
                className="hero-primary"
              >
                Start Secure Transfer
                <FaArrowRight />
              </Link>

              <Link
                to="/auth?mode=login"
                className="hero-secondary"
              >
                Sign In
              </Link>

            </div>

            <div className="hero-trust">

              <div>
                <FaCheckCircle />
                <span>Quantum Resistant</span>
              </div>

              <div>
                <FaCheckCircle />
                <span>End-to-End Protection</span>
              </div>

              <div>
                <FaCheckCircle />
                <span>Integrity Verified</span>
              </div>

            </div>

          </div>

          {/* ================= SECURITY VISUAL ================= */}
          <div className="hero-visual">

            <div className="visual-orbit orbit-one"></div>
            <div className="visual-orbit orbit-two"></div>

            <div className="security-panel">

              <div className="panel-header">
                <div>
                  <span className="panel-label">
                    SECURITY STATUS
                  </span>
                  <h3>Protection Active</h3>
                </div>

                <div className="status-badge">
                  <span></span>
                  ACTIVE
                </div>
              </div>

              <div className="shield-container">
                <div className="shield-ring">
                  <FaShieldAlt />
                </div>
              </div>

              <div className="security-title">
                <h2>Quantum Safe</h2>
                <p>
                  Hybrid cryptographic protection
                </p>
              </div>

              <div className="security-tech">

                <div className="tech-item">
                  <FaLock />
                  <div>
                    <strong>AES-256-GCM</strong>
                    <span>File Encryption</span>
                  </div>
                </div>

                <div className="tech-item">
                  <FaKey />
                  <div>
                    <strong>ML-KEM</strong>
                    <span>Key Protection</span>
                  </div>
                </div>

                <div className="tech-item">
                  <BsFingerprint />
                  <div>
                    <strong>SHA3-256</strong>
                    <span>Integrity Check</span>
                  </div>
                </div>

                <div className="tech-item">
                  <FaSignature />
                  <div>
                    <strong>ML-DSA</strong>
                    <span>Authentication</span>
                  </div>
                </div>

              </div>

              <div className="panel-footer">
                <span>
                  <FaBolt />
                  Cryptographic pipeline operational
                </span>

                <span className="footer-lock">
                  <FaLock />
                </span>
              </div>

            </div>

          </div>

        </section>

        {/* ================= STATS ================= */}
        <section className="stats-section">

          {stats.map((stat, index) => (
            <div className="stat-item" key={index}>

              <div className="stat-icon">
                {stat.icon}
              </div>

              <div>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>

            </div>
          ))}

        </section>

        {/* ================= PIPELINE ================= */}
        <section className="pipeline-section" id="pipeline">

          <div className="section-heading">

            <span className="section-label">
              <FaShieldAlt />
              SECURE ARCHITECTURE
            </span>

            <h2>
              Your file. Protected at
              <span> every stage.</span>
            </h2>

            <p>
              QuantumSafe uses multiple cryptographic layers to protect
              confidentiality, integrity and authenticity during transfer.
            </p>

          </div>

          <div className="pipeline">

            {pipeline.map((step, index) => (

              <React.Fragment key={index}>

                <div className="pipeline-card">

                  <div className="pipeline-top">
                    <span>{step.number}</span>

                    <div className="pipeline-icon">
                      {step.icon}
                    </div>
                  </div>

                  <h3>{step.title}</h3>

                  <p>{step.desc}</p>

                  <div className="pipeline-status">
                    <span></span>
                    SECURE
                  </div>

                </div>

                {index !== pipeline.length - 1 && (
                  <div className="pipeline-line">
                    <span></span>
                  </div>
                )}

              </React.Fragment>

            ))}

          </div>

        </section>

        {/* ================= FEATURES ================= */}
        <section className="features-section" id="features">

          <div className="section-heading">

            <span className="section-label">
              <FaUserShield />
              SECURITY TECHNOLOGY
            </span>

            <h2>
              Built with modern
              <span> cryptography.</span>
            </h2>

            <p>
              Every layer of the transfer process is designed around
              established cryptographic principles and post-quantum
              security concepts.
            </p>

          </div>

          <div className="feature-grid">

            {features.map((feature, index) => (

              <div className="feature-card" key={index}>

                <div className="feature-number">
                  0{index + 1}
                </div>

                <div className="feature-icon">
                  {feature.icon}
                </div>

                <h3>{feature.title}</h3>

                <p>{feature.desc}</p>

                <div className="feature-line"></div>

                <span className="feature-status">
                  <FaCheckCircle />
                  PROTECTION ENABLED
                </span>

              </div>

            ))}

          </div>

        </section>

        {/* ================= TECHNOLOGY ================= */}
        <section className="technology-section" id="technology">

          <div className="technology-card">

            <div className="technology-content">

              <span className="section-label">
                <FaServer />
                HYBRID ARCHITECTURE
              </span>

              <h2>
                Traditional speed.
                <span> Post-quantum protection.</span>
              </h2>

              <p>
                QuantumSafe combines high-speed symmetric encryption
                with post-quantum key protection and digital signatures,
                creating multiple security layers for sensitive file
                transfers.
              </p>

              <div className="technology-points">

                <div>
                  <FaCheckCircle />
                  <span>Confidentiality</span>
                </div>

                <div>
                  <FaCheckCircle />
                  <span>Integrity</span>
                </div>

                <div>
                  <FaCheckCircle />
                  <span>Authentication</span>
                </div>

                <div>
                  <FaCheckCircle />
                  <span>Quantum Resistance</span>
                </div>

              </div>

            </div>

            <div className="architecture-visual">

              <div className="architecture-box">
                <FaFileAlt />
                <span>FILE</span>
              </div>

              <div className="architecture-arrow">
                <span></span>
              </div>

              <div className="architecture-box active">
                <FaShieldAlt />
                <span>HYBRID<br />ENCRYPTION</span>
              </div>

              <div className="architecture-arrow">
                <span></span>
              </div>

              <div className="architecture-box">
                <FaLock />
                <span>SECURE<br />TRANSFER</span>
              </div>

            </div>

          </div>

        </section>

        {/* ================= CTA ================= */}
        <section className="cta-section">

          <div className="cta-content">

            <span className="section-label">
              <FaLock />
              YOUR DATA. YOUR CONTROL.
            </span>

            <h2>
              Ready to transfer files
              <span> securely?</span>
            </h2>

            <p>
              Start using QuantumSafe and protect your sensitive files
              with modern hybrid cryptography.
            </p>

            <Link
              to="/auth?mode=register"
              className="cta-button"
            >
              Create Secure Account
              <FaArrowRight />
            </Link>

          </div>

        </section>

      </main>

      {/* ================= FOOTER ================= */}
      <footer className="footer">

        <div className="footer-brand">

          <div className="brand-icon">
            Q
          </div>

          <div>
            <strong>QuantumSafe</strong>
            <span>POST-QUANTUM SECURE TRANSFER</span>
          </div>

        </div>

        <p>
          Secure File Transfer using Post-Quantum Cryptography
        </p>

        <div className="footer-bottom">

          <span>
            © 2026 QuantumSafe • Final Year Project
          </span>

          <div>
            <FaShieldAlt />
            Security First
          </div>

        </div>

      </footer>

    </div>
  );
}

export default LandingPage;