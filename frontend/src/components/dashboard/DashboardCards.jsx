import "./DashboardCards.css";

import {
  FaCheckCircle,
  FaArrowUp,
  FaArrowRight,
  FaLock,
  FaShieldAlt,
  FaFileAlt,
} from "react-icons/fa";


function DashboardCard({
  variant = "default",
  title,
  subtitle,
  icon,
  accent = "blue",
  value,
  change,
  children,
  className = "",
  onClick,
}) {
  return (
    <div
      className={`
        dashboard-card
        dashboard-card-${variant}
        accent-${accent}
        ${className}
        ${onClick ? "dashboard-card-clickable" : ""}
      `}
      onClick={onClick}
    >
      {/* Ambient glow */}
      <div className="dashboard-card-glow" />

      {/* Top highlight */}
      <div className="dashboard-card-shine" />

      {/* =====================================================
          STAT CARD
      ===================================================== */}

      {variant === "stat" && (
        <>
          <div className="stat-card-top">
            <div className="stat-card-icon">
              {icon}
            </div>

            {change && (
              <div className="stat-card-change">
                <FaArrowUp />
                <span>{change}</span>
              </div>
            )}
          </div>

          <div className="stat-card-content">
            <span className="stat-card-label">
              {title}
            </span>

            <div className="stat-card-value">
              {value}
            </div>

            {subtitle && (
              <span className="stat-card-subtitle">
                {subtitle}
              </span>
            )}
          </div>

          <div className="stat-card-line" />
        </>
      )}


      {/* =====================================================
          PANEL CARD
      ===================================================== */}

      {variant === "panel" && (
        <>
          <div className="panel-card-header">
            <div className="panel-card-title-wrapper">
              <div className="panel-card-icon">
                {icon}
              </div>

              <div>
                <span className="panel-card-eyebrow">
                  QUANTUMSAFE SYSTEM
                </span>

                <h3>{title}</h3>

                {subtitle && (
                  <p>{subtitle}</p>
                )}
              </div>
            </div>

            <div className="panel-card-status">
              <span />
              ACTIVE
            </div>
          </div>

          <div className="panel-card-body">
            {children}
          </div>
        </>
      )}


      {/* =====================================================
          SECURITY CARD
      ===================================================== */}

      {variant === "security" && (
        <>
          <div className="security-card-header">
            <div>
              <span className="security-card-eyebrow">
                SECURITY CORE
              </span>

              <h3>{title}</h3>

              {subtitle && (
                <p>{subtitle}</p>
              )}
            </div>

            <div className="security-card-icon">
              {icon}
            </div>
          </div>

          <div className="security-card-body">
            {children}
          </div>
        </>
      )}


      {/* =====================================================
          TABLE CARD
      ===================================================== */}

      {variant === "table" && (
        <>
          <div className="table-card-header">
            <div>
              <span className="table-card-eyebrow">
                TRANSFER MONITOR
              </span>

              <h3>{title}</h3>

              {subtitle && (
                <p>{subtitle}</p>
              )}
            </div>

            <div className="table-card-icon">
              {icon}
            </div>
          </div>

          <div className="table-card-body">
            {children}
          </div>
        </>
      )}


      {/* =====================================================
          DEFAULT CARD
      ===================================================== */}

      {variant === "default" && (
        <>
          <div className="default-card-header">
            <div className="default-card-icon">
              {icon}
            </div>

            <div>
              <h3>{title}</h3>

              {subtitle && (
                <p>{subtitle}</p>
              )}
            </div>
          </div>

          <div className="default-card-body">
            {children}
          </div>
        </>
      )}


      {onClick && (
        <div className="dashboard-card-arrow">
          <FaArrowRight />
        </div>
      )}
    </div>
  );
}


/* =========================================================
   SECURITY ROW
========================================================= */

export function SecurityRow({
  icon,
  name,
  description,
  status = "ACTIVE",
  accent = "green",
}) {
  return (
    <div
      className={`security-row security-row-${accent}`}
    >
      <div className="security-row-icon">
        {icon}
      </div>

      <div className="security-row-content">
        <strong>{name}</strong>

        <span>{description}</span>
      </div>

      <div className="security-row-status">
        <span />
        {status}
      </div>
    </div>
  );
}


/* =========================================================
   ENCRYPTION ROW
========================================================= */

export function EncryptionRow({
  number = "01",
  name,
  type,
  status = "ACTIVE",
  percentage = 100,
}) {
  return (
    <div className="encryption-row">
      <div className="encryption-row-number">
        {number}
      </div>

      <div className="encryption-row-main">
        <div className="encryption-row-header">
          <div className="encryption-name">
            <div className="encryption-lock">
              <FaLock />
            </div>

            <div>
              <strong>{name}</strong>

              <span>{type}</span>
            </div>
          </div>

          <span className="encryption-status">
            <FaCheckCircle />
            {status}
          </span>
        </div>

        <div className="encryption-progress">
          <div
            className="encryption-progress-fill"
            style={{
              width: `${percentage}%`,
            }}
          />
        </div>

        <div className="encryption-progress-meta">
          <span>PROTECTION LEVEL</span>
          <strong>{percentage}%</strong>
        </div>
      </div>
    </div>
  );
}


/* =========================================================
   TRANSFER ROW
========================================================= */

export function TransferRow({
  file,
  type,
  size,
  status = "VERIFIED",
  time,
}) {
  return (
    <div className="transfer-row">
      <div className="transfer-file">
        <div className="transfer-file-icon">
          <FaFileAlt />
        </div>

        <div className="transfer-file-info">
          <strong>{file}</strong>

          <span>{type}</span>
        </div>
      </div>

      <span className="transfer-size">
        {size}
      </span>

      <span className="transfer-time">
        {time}
      </span>

      <div className="transfer-status">
        <FaCheckCircle />
        <span>{status}</span>
      </div>
    </div>
  );
}


export default DashboardCard;