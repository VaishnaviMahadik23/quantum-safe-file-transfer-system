/*import "./Sidebar.css";
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
} from "react-icons/fa";

import { useAuth } from "../context/AuthContext";

function Sidebar() {
  const navigate = useNavigate();

  const { logout } = useAuth();

  const menuItems = [
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
    {
      title: "Crypto Details",
      path: "/crypto",
      icon: <FaShieldAlt />,
    },
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

  const handleLogout = () => {
    logout();

    navigate("/auth", {
      replace: true,
    });
  };

  return (
    <aside className="sidebar">

      <div className="sidebar-logo">

        <div className="logo-circle">
          Q
        </div>

        <div>
          <h2>QuantumSafe</h2>
          <p>File Transfer</p>
        </div>

      </div>

      <nav className="sidebar-menu">

        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              isActive
                ? "menu-item active"
                : "menu-item"
            }
          >

            <span className="menu-icon">
              {item.icon}
            </span>

            <span>
              {item.title}
            </span>

          </NavLink>
        ))}

      </nav>

      <div className="sidebar-footer">

        <button
          className="logout-btn"
          type="button"
          onClick={handleLogout}
        >

          <FaSignOutAlt />

          <span>
            Logout
          </span>

        </button>

      </div>

    </aside>
  );
}

export default Sidebar;
*/

// improved version of sidebar.jsx with better styling and collapsible functionality
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
  FaCheckCircle,
  FaArrowRight,
  FaLock,
  FaKey,
  FaFingerprint,
  FaServer,
} from "react-icons/fa";

import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function Sidebar({ collapsed, setCollapsed }) {

  const navigate = useNavigate();

  const { logout } = useAuth();

  /*
   * Security Center belongs to Sidebar,
   * so this state stays here.
   */
  const [showSecurityCenter, setShowSecurityCenter] = useState(false);


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

  const renderItems = (items) =>

    items.map((item) => (

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


  return (

    <>

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <aside
        className={`sidebar ${collapsed ? "collapsed" : ""}`}
      >


        {/* =================================================
            TOP / BRAND
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


          {/* COLLAPSE BUTTON */}

          <button
            className="collapse-btn"
            type="button"
            onClick={() => setCollapsed(!collapsed)}
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
            SECURITY STATUS
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


          {/* WORKSPACE */}

          {!collapsed && (

            <p className="menu-label">
              WORKSPACE
            </p>

          )}

          {renderItems(mainMenu)}


          {/* SECURITY */}

          {!collapsed && (

            <p className="menu-label security-label">
              SECURITY
            </p>

          )}

          {renderItems(securityMenu)}


          {/* ACCOUNT */}

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
          SECURITY CENTER MODAL
      ===================================================== */}

      {showSecurityCenter && (

        <div
          className="security-modal-overlay"
          onClick={() =>
            setShowSecurityCenter(false)
          }
        >

          <div
            className="security-center"
            onClick={(e) =>
              e.stopPropagation()
            }
          >


            {/* =================================================
                HEADER
            ================================================= */}

            <div className="security-center-header">

              <div className="security-title">

                <div className="security-shield">
                  <FaShieldAlt />
                </div>


                <div>

                  <h2>
                    Security Center
                  </h2>

                  <p>
                    Security Overview
                  </p>

                </div>

              </div>


              <button
                className="security-close"
                type="button"
                onClick={() =>
                  setShowSecurityCenter(false)
                }
                aria-label="Close security center"
              >

                <FaTimes />

              </button>

            </div>


            {/* =================================================
                SECURITY ITEMS
            ================================================= */}

            <div className="security-items">


              <SecurityItem
                icon={<FaShieldAlt />}
                color="green"
                title="System Protection"
                status="SECURE"
                description="Your files and communication are protected."
              />


              <SecurityItem
                icon={<FaLock />}
                color="blue"
                title="AES-256 Encryption"
                status="Active"
                description="Military-grade file encryption."
              />


              <SecurityItem
                icon={<FaKey />}
                color="purple"
                title="Kyber Key Protection"
                status="Active"
                description="Post-quantum key exchange protection."
              />


              <SecurityItem
                icon={<FaFingerprint />}
                color="orange"
                title="Dilithium Signature"
                status="Active"
                description="Digital signature verification enabled."
              />


              <SecurityItem
                icon={<FaUserShield />}
                color="cyan"
                title="JWT Authentication"
                status="Active"
                description="Secure identity verification enabled."
              />


              <SecurityItem
                icon={<FaServer />}
                color="green"
                title="Secure Session"
                status="Active"
                description="Protected application session."
              />

            </div>


            {/* =================================================
                LAST SECURITY CHECK
            ================================================= */}

            <div className="security-last-check">

              <span>
                Last security check
              </span>

              <strong>

                Today,{" "}

                {new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}

              </strong>

            </div>


            {/* =================================================
                VIEW SECURITY DETAILS
            ================================================= */}

            <button
              className="security-details-btn"
              type="button"
              onClick={handleSecurityDetails}
            >

              <span>

                <FaShieldAlt />

                View Security Details

              </span>


              <FaArrowRight />

            </button>

          </div>

        </div>

      )}

    </>

  );

}


/* =========================================================
   SECURITY ITEM COMPONENT*/
export default Sidebar;