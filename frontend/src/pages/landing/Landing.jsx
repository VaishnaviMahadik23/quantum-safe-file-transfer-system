import React, { useState } from "react";
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
  FaCheckCircle,
  FaCloud,
} from "react-icons/fa";

import { BsFingerprint } from "react-icons/bs";

import "./Landing.css";


/* =========================================================
   PIPELINE
   ========================================================= */

const pipeline = [
  {
    number: "01",
    icon: <FaFileAlt />,
    title: "Select File",
    desc: "Your confidential file enters the protected transfer workflow.",
  },
  {
    number: "02",
    icon: <FaLock />,
    title: "Encrypt",
    desc: "AES-256-GCM encrypts the file using authenticated encryption.",
  },
  {
    number: "03",
    icon: <FaKey />,
    title: "Protect Key",
    desc: "ML-KEM protects the encryption key using post-quantum cryptography.",
  },
  {
    number: "04",
    icon: <FaFingerprint />,
    title: "Verify",
    desc: "SHA3-256 verifies integrity while ML-DSA authenticates the package.",
  },
  {
    number: "05",
    icon: <FaExchangeAlt />,
    title: "Transfer",
    desc: "The protected package moves securely to its destination.",
  },
];


/* =========================================================
   SECURITY LAYERS
   ========================================================= */

const securityLayers = [
  {
    id: 1,
    name: "AES-256-GCM",
    short: "ENCRYPTION",
    icon: <FaLock />,
    description:
      "Encrypts file contents with authenticated encryption.",
  },
  {
    id: 2,
    name: "ML-KEM",
    short: "KEY PROTECTION",
    icon: <FaKey />,
    description:
      "Protects encryption keys against quantum-era attacks.",
  },
  {
    id: 3,
    name: "ML-DSA",
    short: "AUTHENTICATION",
    icon: <FaSignature />,
    description:
      "Provides digital signatures for authenticity.",
  },
  {
    id: 4,
    name: "SHA3-256",
    short: "INTEGRITY",
    icon: <BsFingerprint />,
    description:
      "Creates a fingerprint to detect data modification.",
  },
  {
    id: 5,
    name: "SECURE TRANSFER",
    short: "TRANSMISSION",
    icon: <FaExchangeAlt />,
    description:
      "Moves protected packages through the secure workflow.",
  },
  {
    id: 6,
    name: "AUDIT TRAIL",
    short: "VISIBILITY",
    icon: <FaDatabase />,
    description:
      "Records transfer activity for security monitoring.",
  },
];


/* =========================================================
   STATS
   ========================================================= */

const stats = [
  {
    value: "AES-256-GCM",
    label: "Authenticated Encryption",
    icon: <FaLock />,
  },
  {
    value: "ML-KEM",
    label: "Post-Quantum Key Protection",
    icon: <FaKey />,
  },
  {
    value: "ML-DSA",
    label: "Digital Authentication",
    icon: <FaSignature />,
  },
  {
    value: "SHA3-256",
    label: "Integrity Verification",
    icon: <BsFingerprint />,
  },
];


/* =========================================================
   LANDING PAGE
   ========================================================= */

function LandingPage() {

  const [activeLayer, setActiveLayer] = useState(1);

  const activeSecurity =
    securityLayers.find(
      (layer) => layer.id === activeLayer
    ) || securityLayers[0];


  return (
    <div className="quantum-page">

      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div className="background-grid"></div>

      <div className="ambient ambient-one"></div>
      <div className="ambient ambient-two"></div>
      <div className="ambient ambient-three"></div>


      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <header className="navbar">

        <Link to="/" className="brand">

          <div className="brand-mark">
            <span>Q</span>
          </div>

          <div className="brand-text">
            <strong>QuantumSafe</strong>
            <span>SECURE FILE TRANSFER</span>
          </div>

        </Link>


        <nav className="nav-links">

          <a href="#security-core">
            Security
          </a>

          <a href="#pipeline">
            How It Works
          </a>

          <a href="#security-core">
            Security Core
          </a>

        </nav>


        <div className="nav-actions">

          <Link
            to="/auth?mode=login"
            className="nav-login"
          >
            Login
          </Link>

          <Link
            to="/auth?mode=register"
            className="nav-register"
          >
            Get Started
            <FaArrowRight />
          </Link>

        </div>

      </header>


      <main>


        {/* =================================================
            HERO
        ================================================= */}

        <section className="hero">

          <div className="hero-content">

            <div className="hero-eyebrow">

              <span className="eyebrow-dot"></span>

              POST-QUANTUM FILE SECURITY

            </div>


            <h1>

              Security built for

              <span>
                what comes next.
              </span>

            </h1>


            <p className="hero-description">

              QuantumSafe combines proven encryption with
              post-quantum cryptography to protect confidential
              files against today's threats and tomorrow's
              quantum attacks.

            </p>


            <div className="hero-buttons">

              <Link
                to="/auth?mode=register"
                className="hero-primary"
              >

                Start Secure Transfer

                <FaArrowRight />

              </Link>


              <a
                href="#pipeline"
                className="hero-secondary"
              >

                Explore Security

              </a>

            </div>


            <div className="hero-trust">

              <span>
                <FaCheckCircle />
                Quantum Resistant
              </span>

              <span>
                <FaCheckCircle />
                Authenticated Encryption
              </span>

              <span>
                <FaCheckCircle />
                Integrity Verified
              </span>

            </div>

          </div>


          {/* =================================================
              HERO SECURITY VISUAL
          ================================================= */}

          <div className="quantum-visual">

            <div className="visual-grid"></div>

            <div className="visual-orbit orbit-a"></div>
            <div className="visual-orbit orbit-b"></div>


            {/* TOP LEFT */}

            <div className="algorithm algorithm-a">

              <div className="algorithm-icon">
                <FaLock />
              </div>

              <div>
                <strong>AES-256-GCM</strong>
                <span>ENCRYPTION</span>
              </div>

            </div>


            {/* TOP RIGHT */}

            <div className="algorithm algorithm-b">

              <div className="algorithm-icon">
                <FaKey />
              </div>

              <div>
                <strong>ML-KEM</strong>
                <span>KEY PROTECTION</span>
              </div>

            </div>


            {/* BOTTOM LEFT */}

            <div className="algorithm algorithm-c">

              <div className="algorithm-icon">
                <BsFingerprint />
              </div>

              <div>
                <strong>SHA3-256</strong>
                <span>INTEGRITY</span>
              </div>

            </div>


            {/* BOTTOM RIGHT */}

            <div className="algorithm algorithm-d">

              <div className="algorithm-icon">
                <FaSignature />
              </div>

              <div>
                <strong>ML-DSA</strong>
                <span>AUTHENTICATION</span>
              </div>

            </div>


            {/* CONNECTION LINES */}

            <div className="connection connection-a">
              <span></span>
            </div>

            <div className="connection connection-b">
              <span></span>
            </div>

            <div className="connection connection-c">
              <span></span>
            </div>

            <div className="connection connection-d">
              <span></span>
            </div>


            {/* 3D SECURITY CUBE */}

            <div className="cube-stage">

              <div className="cube-glow"></div>

              <div className="cube">

                <div className="cube-face cube-front">
                  <FaShieldAlt />
                </div>

                <div className="cube-face cube-back">
                  <FaLock />
                </div>

                <div className="cube-face cube-right">
                  <FaKey />
                </div>

                <div className="cube-face cube-left">
                  <FaFingerprint />
                </div>

                <div className="cube-face cube-top">
                  <FaSignature />
                </div>

                <div className="cube-face cube-bottom">
                  <FaCloud />
                </div>

              </div>

            </div>


            <div className="cube-label">

              <span>
                QUANTUMSAFE
              </span>

              <strong>
                HYBRID SECURITY CORE
              </strong>

            </div>

          </div>

        </section>


        {/* =================================================
            STATS
        ================================================= */}

        <section className="stats-section">

          {stats.map((stat, index) => (

            <div
              className="stat-item"
              key={index}
            >

              <div className="stat-icon">
                {stat.icon}
              </div>

              <div className="stat-content">

                <strong>
                  {stat.value}
                </strong>

                <span>
                  {stat.label}
                </span>

              </div>

            </div>

          ))}

        </section>


        {/* =================================================
            PIPELINE
        ================================================= */}

        {/* =================================================
    FILE DNA SECURITY TUNNEL
================================================= */}

<section
  className="pipeline-section"
  id="pipeline"
>

  <div className="section-heading pipeline-heading">

    <div className="section-kicker">
      <span></span>
      SECURE TRANSFER PROTOCOL
    </div>

    <h2>
      One secure journey.
      <span>Five layers of protection.</span>
    </h2>

    <p>
      Every file travels through a sequence of cryptographic
      gates before reaching its destination.
    </p>

  </div>


  {/* =================================================
      SECURITY TUNNEL
  ================================================= */}

  <div className="security-tunnel">

    {/* Ambient tunnel glow */}
    <div className="tunnel-glow"></div>

    {/* Background grid */}
    <div className="tunnel-grid"></div>


    {/* =================================================
        TOP LABEL
    ================================================= */}

    <div className="tunnel-status">

      <span className="status-pulse"></span>

      SECURE PIPELINE ACTIVE

    </div>


    {/* =================================================
        FILE DNA / DATA STREAM
    ================================================= */}

    <div className="data-stream stream-one"></div>
    <div className="data-stream stream-two"></div>
    <div className="data-stream stream-three"></div>


    {/* =================================================
        TRAVELING FILE
    ================================================= */}

    <div className="travelling-file">

      <div className="file-energy"></div>

      <div className="file-icon">
        <FaFileAlt />
      </div>

      <div className="file-info">
        <strong>CONFIDENTIAL FILE</strong>
        <span>ENCRYPTING...</span>
      </div>

    </div>


    {/* =================================================
        MAIN TUNNEL
    ================================================= */}

    <div className="tunnel-track">

      <div className="tunnel-line"></div>

      <div className="tunnel-core-line"></div>


      {/* =================================================
          GATE 01
      ================================================= */}

      <div className="security-gate gate-01">

        <div className="gate-number">
          01
        </div>

        <div className="gate-frame">

          <div className="gate-corner corner-tl"></div>
          <div className="gate-corner corner-tr"></div>
          <div className="gate-corner corner-bl"></div>
          <div className="gate-corner corner-br"></div>

          <div className="gate-icon">
            <FaFileAlt />
          </div>

          <div className="gate-scan"></div>

        </div>

        <div className="gate-content">

          <span>
            INPUT
          </span>

          <strong>
            SELECT FILE
          </strong>

          <small>
            Confidential file enters
            the protected workflow.
          </small>

        </div>

      </div>


      {/* =================================================
          GATE 02
      ================================================= */}

      <div className="security-gate gate-02">

        <div className="gate-number">
          02
        </div>

        <div className="gate-frame">

          <div className="gate-corner corner-tl"></div>
          <div className="gate-corner corner-tr"></div>
          <div className="gate-corner corner-bl"></div>
          <div className="gate-corner corner-br"></div>

          <div className="gate-icon">
            <FaLock />
          </div>

          <div className="gate-scan"></div>

        </div>

        <div className="gate-content">

          <span>
            ENCRYPTION
          </span>

          <strong>
            AES-256-GCM
          </strong>

          <small>
            File contents are protected
            with authenticated encryption.
          </small>

        </div>

      </div>


      {/* =================================================
          GATE 03
      ================================================= */}

      <div className="security-gate gate-03">

        <div className="gate-number">
          03
        </div>

        <div className="gate-frame">

          <div className="gate-corner corner-tl"></div>
          <div className="gate-corner corner-tr"></div>
          <div className="gate-corner corner-bl"></div>
          <div className="gate-corner corner-br"></div>

          <div className="gate-icon">
            <FaKey />
          </div>

          <div className="gate-scan"></div>

        </div>

        <div className="gate-content">

          <span>
            KEY PROTECTION
          </span>

          <strong>
            ML-KEM
          </strong>

          <small>
            Encryption keys receive
            post-quantum protection.
          </small>

        </div>

      </div>


      {/* =================================================
          GATE 04
      ================================================= */}

      <div className="security-gate gate-04">

        <div className="gate-number">
          04
        </div>

        <div className="gate-frame">

          <div className="gate-corner corner-tl"></div>
          <div className="gate-corner corner-tr"></div>
          <div className="gate-corner corner-bl"></div>
          <div className="gate-corner corner-br"></div>

          <div className="gate-icon">
            <BsFingerprint />
          </div>

          <div className="gate-scan"></div>

        </div>

        <div className="gate-content">

          <span>
            VERIFICATION
          </span>

          <strong>
            SHA3-256 + ML-DSA
          </strong>

          <small>
            Integrity and authenticity
            are verified.
          </small>

        </div>

      </div>


      {/* =================================================
          GATE 05
      ================================================= */}

      <div className="security-gate gate-05">

        <div className="gate-number">
          05
        </div>

        <div className="gate-frame">

          <div className="gate-corner corner-tl"></div>
          <div className="gate-corner corner-tr"></div>
          <div className="gate-corner corner-bl"></div>
          <div className="gate-corner corner-br"></div>

          <div className="gate-icon">
            <FaExchangeAlt />
          </div>

          <div className="gate-scan"></div>

        </div>

        <div className="gate-content">

          <span>
            DESTINATION
          </span>

          <strong>
            SECURE TRANSFER
          </strong>

          <small>
            The protected package reaches
            its destination securely.
          </small>

        </div>

      </div>

    </div>


    {/* =================================================
        BOTTOM SYSTEM STATUS
    ================================================= */}

    <div className="tunnel-footer">

      <div className="tunnel-metric">
        <span></span>
        AES-256-GCM
      </div>

      <div className="tunnel-metric">
        <span></span>
        POST-QUANTUM
      </div>

      <div className="tunnel-metric">
        <span></span>
        INTEGRITY VERIFIED
      </div>

      <div className="tunnel-metric">
        <span></span>
        SECURE CHANNEL
      </div>

    </div>

  </div>

</section>

        {/* =================================================
            INTERACTIVE SECURITY CORE
        ================================================= */}

        <section
          className="security-core-section"
          id="security-core"
        >

          <div className="section-heading core-heading">

            <div className="section-kicker">

              <span></span>

              INTERACTIVE SECURITY CORE

            </div>


            <h2>

              Protection that works

              <span>
                layer by layer.
              </span>

            </h2>


            <p>

              Six cryptographic controls. One protected
              transfer architecture.

            </p>

          </div>


          {/* =================================================
              SECURITY CORE VISUAL
          ================================================= */}

          <div className="security-core-visual">


            {/* BACKGROUND ORBITS */}

            <div className="core-orbit orbit-one"></div>

            <div className="core-orbit orbit-two"></div>


            {/* =================================================
                CONNECTOR LINES
            ================================================= */}

            <div className="core-connector connector-one">
              <span></span>
            </div>

            <div className="core-connector connector-two">
              <span></span>
            </div>

            <div className="core-connector connector-three">
              <span></span>
            </div>

            <div className="core-connector connector-four">
              <span></span>
            </div>

            <div className="core-connector connector-five">
              <span></span>
            </div>

            <div className="core-connector connector-six">
              <span></span>
            </div>


            {/* =================================================
                ALGORITHM LABELS
            ================================================= */}

            {securityLayers.map((layer) => (

              <button
                key={layer.id}
                type="button"
                className={`core-algorithm algorithm-${layer.id} ${
                  activeLayer === layer.id
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setActiveLayer(layer.id)
                }
                aria-label={`Select ${layer.name}`}
              >

                <span className="algorithm-dot"></span>

                <span className="algorithm-info">

                  <strong>
                    {layer.name}
                  </strong>

                  <small>
                    {layer.short}
                  </small>

                </span>

              </button>

            ))}


            {/* =================================================
                MAIN CIRCULAR CORE
            ================================================= */}

            <div className="security-ring">

              <div className="ring-glow"></div>

              <div className="ring-outer"></div>


              {/* SIX SEGMENTS */}

              <div className="ring-segments">

                {securityLayers.map((layer) => (

                  <button
                    key={layer.id}
                    type="button"
                    className={`ring-segment segment-${layer.id} ${
                      activeLayer === layer.id
                        ? "active"
                        : ""
                    }`}
                    onClick={() =>
                      setActiveLayer(layer.id)
                    }
                    aria-label={`Activate ${layer.name}`}
                  >

                    <span>
                      0{layer.id}
                    </span>

                  </button>

                ))}

              </div>


              {/* =================================================
                  CENTER CORE
              ================================================= */}

              <div className="security-core-center">

                <div className="center-inner-ring"></div>


                <div className="center-symbol">
                  {activeSecurity.icon}
                </div>


                <span className="center-kicker">
                  QUANTUM SAFE
                </span>


                <h3>

                  SECURITY
                  <br />
                  CORE

                </h3>


                <span className="center-layer">
                  LAYER 0{activeSecurity.id}
                </span>


                <strong>
                  {activeSecurity.name}
                </strong>


                <small>
                  {activeSecurity.short}
                </small>


                <p>
                  {activeSecurity.description}
                </p>


                <div className="center-status">

                  <span></span>

                  PROTECTION ACTIVE

                </div>

              </div>

            </div>


            {/* FLOATING PARTICLES */}

            <span className="core-particle particle-one"></span>
            <span className="core-particle particle-two"></span>
            <span className="core-particle particle-three"></span>
            <span className="core-particle particle-four"></span>

          </div>

        </section>


        {/* =================================================
            CTA
        ================================================= */}

        <section className="cta-section">

          <div className="cta-content">

            <div className="cta-glow"></div>

            <div className="cta-orbit"></div>


            <div className="cta-icon">
              <FaLock />
            </div>


            <span className="cta-kicker">
              YOUR DATA. YOUR CONTROL.
            </span>


            <h2>

              Protect what

              <span>
                matters.
              </span>

            </h2>


            <p>

              Start transferring sensitive files with
              a security architecture designed for the
              next generation of threats.

            </p>


            <Link
              to="/auth?mode=register"
              className="cta-button"
            >

              Create Secure Account

              <FaArrowRight />

            </Link>


            <div className="cta-note">

              <FaCheckCircle />

              No complicated setup • Secure by design

            </div>

          </div>

        </section>

      </main>


      {/* =================================================
          FOOTER
      ================================================= */}

      <footer className="footer">

        <div className="footer-main">

          <Link
            to="/"
            className="footer-brand"
          >

            <div className="brand-mark">
              <span>Q</span>
            </div>

            <div>

              <strong>
                QuantumSafe
              </strong>

              <span>
                POST-QUANTUM SECURE TRANSFER
              </span>

            </div>

          </Link>


          <div className="footer-links">

            <a href="#security-core">
              Security
            </a>

            <a href="#pipeline">
              How It Works
            </a>

            <a href="#security-core">
              Security Core
            </a>

            <Link to="/auth?mode=login">
              Login
            </Link>

          </div>

        </div>


        <div className="footer-bottom">

          <span>
            © 2026 QuantumSafe. Final Year Project.
          </span>

          <span className="footer-security">

            <FaShieldAlt />

            Security First

          </span>

        </div>

      </footer>

    </div>
  );
}


export default LandingPage;