import "./newlyaddedcss_for_sidebar.css";
import { NavLink, useNavigate } from "react-router-dom";

import {
  FaTachometerAlt,
  FaPaperPlane,
  FaInbox,
  FaHistory,
  FaShieldAlt,
  FaUser,
  FaCog,
  FaUserShield,
  FaSignOutAlt,
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
  FaArrowRight,
  FaLock,
  FaKey,
  FaFingerprint,
  FaServer,
  FaAtom,
  FaCertificate,
  FaBolt,
} from "react-icons/fa";

import { useState } from "react";
import { useAuth } from "../context/AuthContext";


function Sidebar({ collapsed, setCollapsed }) {

  const navigate = useNavigate();

  const { logout } = useAuth();

  const [showSecurityCenter, setShowSecurityCenter] =
    useState(false);


  /* =========================================================
     MAIN MENU
  ========================================================= */

  const mainMenu = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: <FaTachometerAlt />,
    },
    {
      title: "Send File",
      path: "/send-file",
      icon: <FaPaperPlane />,
    },
    {
      title: "Received Files",
      path: "/received-files",
      icon: <FaInbox />,
    },
    {
      title: "Transfer History",
      path: "/history",
      icon: <FaHistory />,
    },
  ];


  /* =========================================================
     SECURITY MENU
  ========================================================= */

  const securityMenu = [
    {
      title: "Crypto Details",
      path: "/crypto",
      icon: <FaShieldAlt />,
    },
  ];


  /* =========================================================
     ACCOUNT MENU
  ========================================================= */

  const accountMenu = [
    {
      title: "Profile",
      path: "/profile",
      icon: <FaUser />,
    },
    {
      title: "Settings",
      path: "/settings",
      icon: <FaCog />,
    },
    {
      title: "Admin",
      path: "/admin",
      icon: <FaUserShield />,
    },
  ];


  /* =========================================================
     LOGOUT
  ========================================================= */

  const handleLogout = () => {

    logout();

    navigate("/auth", {
      replace: true,
    });

  };


  /* =========================================================
     SECURITY DETAILS
  ========================================================= */

  const handleSecurityDetails = () => {

    setShowSecurityCenter(false);

    navigate("/crypto");

  };


  /* =========================================================
     MENU RENDERER
  ========================================================= */

  const renderItems = (items) => {

    return items.map((item) => (

      <NavLink
        key={item.path}
        to={item.path}
        className={({ isActive }) =>
          `menu-item ${isActive ? "active" : ""}`
        }
        title={collapsed ? item.title : ""}
      >

        <span className="menu-icon">
          {item.icon}
        </span>

        {!collapsed && (
          <span className="menu-text">
            {item.title}
          </span>
        )}

        <span className="menu-shine"></span>

      </NavLink>

    ));

  };


  return (

    <>

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <aside
        className={`sidebar ${
          collapsed ? "collapsed" : ""
        }`}
      >

        {/* =================================================
            TOP
        ================================================= */}

        <div className="sidebar-top">

          <div className="brand">

            <div className="quantum-logo">

              <span>Q</span>

              <div className="quantum-core"></div>

              <div className="orbit orbit-one"></div>

              <div className="orbit orbit-two"></div>

              <div className="orbit orbit-three"></div>

            </div>


            {!collapsed && (

              <div className="brand-text">

                <h2>
                  Quantum<span>Safe</span>
                </h2>

                <p>
                  SECURE TRANSFER
                </p>

              </div>

            )}

          </div>


          {/* COLLAPSE */}

          <button
            className="collapse-btn"
            type="button"
            onClick={() =>
              setCollapsed(!collapsed)
            }
            aria-label={
              collapsed
                ? "Expand sidebar"
                : "Collapse sidebar"
            }
          >

            {collapsed
              ? <FaChevronRight />
              : <FaChevronLeft />
            }

          </button>

        </div>


        {/* =================================================
            SYSTEM SECURE
        ================================================= */}

        {!collapsed && (

          <button
            className="security-status"
            type="button"
            onClick={() =>
              setShowSecurityCenter(true)
            }
          >

            <div className="security-status-left">

              <div className="security-orb">
                <span></span>
              </div>

              <div className="security-status-text">

                <strong>
                  System Secure
                </strong>

                <span>
                  Quantum protection active
                </span>

              </div>

            </div>


            <div className="security-arrow">
              →
            </div>

          </button>

        )}


        {/* =================================================
            NAVIGATION
        ================================================= */}

        <nav className="sidebar-menu">

          {!collapsed && (
            <p className="menu-label">
              WORKSPACE
            </p>
          )}

          {renderItems(mainMenu)}


          {!collapsed && (
            <p className="menu-label security-label">
              SECURITY
            </p>
          )}

          {renderItems(securityMenu)}


          {!collapsed && (
            <p className="menu-label security-label">
              ACCOUNT
            </p>
          )}

          {renderItems(accountMenu)}

        </nav>


        {/* =================================================
            FOOTER
        ================================================= */}

        <div className="sidebar-footer">

          <button
            className="logout-btn"
            type="button"
            onClick={handleLogout}
            title={collapsed ? "Logout" : ""}
          >

            <FaSignOutAlt />

            {!collapsed && (
              <span>
                Logout
              </span>
            )}

          </button>


          {!collapsed && (
            <div className="sidebar-version">
              QuantumSafe v1.0
            </div>
          )}

        </div>

      </aside>


      {/* =====================================================
          QUANTUM SECURITY CENTER
      ===================================================== */}

      {showSecurityCenter && (

        <div
          className="security-modal-overlay"
          onClick={() =>
            setShowSecurityCenter(false)
          }
        >

          <div
            className="quantum-security-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* SCAN LINE */}

            <div className="security-scan-line"></div>


            {/* =================================================
                HEADER
            ================================================= */}

            <div className="security-center-header">

              <div className="security-title">

                <div className="quantum-security-icon">

                  <FaShieldAlt />

                  <span className="security-ring ring-1"></span>

                  <span className="security-ring ring-2"></span>

                </div>


                <div>

                  <span className="security-eyebrow">
                    QUANTUMSAFE SECURITY PROTOCOL
                  </span>

                  <h2>
                    Security Center
                  </h2>

                  <p>
                    Real-time cryptographic protection overview
                  </p>

                </div>

              </div>


              <button
                className="security-close"
                type="button"
                onClick={() =>
                  setShowSecurityCenter(false)
                }
                aria-label="Close Security Center"
              >

                <FaTimes />

              </button>

            </div>


            {/* =================================================
                HERO
            ================================================= */}

            <div className="security-hero">

              <div className="security-core-visual">

                <div className="core-glow"></div>


                <div className="core-orbit orbit-a"></div>

                <div className="core-orbit orbit-b"></div>

                <div className="core-orbit orbit-c"></div>


                <div className="core-shield">

                  <FaShieldAlt />

                </div>

              </div>


              <div className="security-hero-content">

                <span className="protection-label">
                  CURRENT PROTECTION LEVEL
                </span>

                <h1>
                  100<span>%</span>
                </h1>


                <div className="protected-status">

                  <span className="status-pulse"></span>

                  SYSTEM FULLY PROTECTED

                </div>


                <p>
                  QuantumSafe combines classical and
                  post-quantum cryptographic technologies
                  to protect files, encryption keys,
                  identities and digital signatures.
                </p>

              </div>

            </div>


            {/* =================================================
                ALGORITHM SECTION
            ================================================= */}

            <section className="algorithm-section">

              <div className="section-heading">

                <div>

                  <span>
                    CRYPTOGRAPHIC ARCHITECTURE
                  </span>

                  <h3>
                    Active Security Algorithms
                  </h3>

                </div>

                <div className="architecture-line"></div>

              </div>


              <div className="algorithm-grid">


                {/* AES */}

                <AlgorithmCard
                  number="01"
                  icon={<FaLock />}
                  name="AES-256"
                  type="SYMMETRIC ENCRYPTION"
                  description="Encrypts file content using 256-bit Advanced Encryption Standard."
                  protectedText="FILE DATA"
                />


                {/* KYBER */}

                <AlgorithmCard
                  number="02"
                  icon={<FaAtom />}
                  name="CRYSTALS-Kyber"
                  type="POST-QUANTUM KEM"
                  description="Protects encryption keys using quantum-resistant key encapsulation."
                  protectedText="KEY EXCHANGE"
                />


                {/* DILITHIUM */}

                <AlgorithmCard
                  number="03"
                  icon={<FaFingerprint />}
                  name="CRYSTALS-Dilithium"
                  type="POST-QUANTUM SIGNATURE"
                  description="Provides quantum-resistant digital signatures for file authenticity."
                  protectedText="SIGNATURE"
                />


                {/* RSA */}

                <AlgorithmCard
                  number="04"
                  icon={<FaKey />}
                  name="RSA"
                  type="CLASSICAL CRYPTOGRAPHY"
                  description="Provides an additional classical cryptographic layer for secure key protection."
                  protectedText="KEY PROTECTION"
                />


                {/* JWT */}

                <AlgorithmCard
                  number="05"
                  icon={<FaUserShield />}
                  name="JWT"
                  type="IDENTITY SECURITY"
                  description="Secures authenticated communication between the client and server."
                  protectedText="USER IDENTITY"
                />


                {/* SESSION */}

                <AlgorithmCard
                  number="06"
                  icon={<FaServer />}
                  name="Secure Session"
                  type="APPLICATION SECURITY"
                  description="Maintains protected authenticated sessions between users and the application."
                  protectedText="SESSION"
                />

              </div>

            </section>


            {/* =================================================
                SECURITY FOOTER
            ================================================= */}

            <div className="security-footer">

              <div className="last-check">

                <span className="check-dot"></span>

                <div>

                  <small>
                    LAST SECURITY CHECK
                  </small>

                  <strong>
                    Today,{" "}
                    {new Date().toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </strong>

                </div>

              </div>


              <button
                className="security-details-btn"
                type="button"
                onClick={handleSecurityDetails}
              >

                <span>

                  <FaBolt />

                  View Full Cryptographic Details

                </span>

                <FaArrowRight />

              </button>

            </div>

          </div>

        </div>

      )}

    </>

  );

}


/* =========================================================
   ALGORITHM CARD COMPONENT
========================================================= */

function AlgorithmCard({
  number,
  icon,
  name,
  type,
  description,
  protectedText,
}) {

  return (

    <div className="algorithm-card">

      <div className="algorithm-card-top">

        <span className="algorithm-number">
          / {number}
        </span>

        <span className="algorithm-status">

          <span></span>

          ACTIVE

        </span>

      </div>


      <div className="algorithm-icon">
        {icon}
      </div>


      <div className="algorithm-info">

        <h4>
          {name}
        </h4>

        <span className="algorithm-type">
          {type}
        </span>

        <p>
          {description}
        </p>

      </div>


      <div className="algorithm-line"></div>


      <div className="algorithm-protected">

        <span>
          PROTECTING · {protectedText}
        </span>

        <span className="algorithm-check">
          ✓
        </span>

      </div>

    </div>

  );

}


export default Sidebar;