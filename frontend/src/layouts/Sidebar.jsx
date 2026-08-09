import "./Sidebar.css";
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