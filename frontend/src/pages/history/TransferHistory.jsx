import { useMemo, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import {
  FaSearch,
  FaFilter,
  FaArrowUp,
  FaArrowDown,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaShieldAlt,
  FaHistory,
  FaFile,
  FaFilePdf,
  FaFileImage,
  FaFileCode,
  FaFileAlt,
  FaInfoCircle,
} from "react-icons/fa";

import "./TransferHistory.css";

function TransferHistory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("ALL");

  /*
   * Transfer History backend API is not implemented yet.
   *
   * Keep this empty intentionally.
   *
   * Later this will be replaced with data returned
   * from the real Spring Boot backend.
   */
  const transferHistory = [];

  const filters = [
    {
      label: "All Transfers",
      value: "ALL",
    },
    {
      label: "Sent",
      value: "SENT",
    },
    {
      label: "Received",
      value: "RECEIVED",
    },
    {
      label: "Completed",
      value: "COMPLETED",
    },
    {
      label: "Pending",
      value: "PENDING",
    },
    {
      label: "Failed",
      value: "FAILED",
    },
  ];

  const getFileIcon = (fileName = "") => {
    const extension = fileName
      .split(".")
      .pop()
      ?.toLowerCase();

    if (extension === "pdf") {
      return <FaFilePdf className="history-file-icon pdf" />;
    }

    if (
      ["png", "jpg", "jpeg", "gif", "webp", "svg"].includes(
        extension
      )
    ) {
      return (
        <FaFileImage className="history-file-icon image" />
      );
    }

    if (
      [
        "js",
        "jsx",
        "ts",
        "tsx",
        "java",
        "py",
        "cpp",
        "c",
        "html",
        "css",
      ].includes(extension)
    ) {
      return (
        <FaFileCode className="history-file-icon code" />
      );
    }

    if (extension) {
      return <FaFileAlt className="history-file-icon" />;
    }

    return <FaFile className="history-file-icon" />;
  };

  const formatFileSize = (bytes) => {
    if (!bytes) {
      return "—";
    }

    const units = [
      "Bytes",
      "KB",
      "MB",
      "GB",
      "TB",
    ];

    const index = Math.floor(
      Math.log(bytes) / Math.log(1024)
    );

    const size = bytes / Math.pow(1024, index);

    return `${size.toFixed(index === 0 ? 0 : 2)} ${
      units[index]
    }`;
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "COMPLETED":
        return <FaCheckCircle />;

      case "PENDING":
        return <FaClock />;

      case "FAILED":
        return <FaTimesCircle />;

      default:
        return <FaInfoCircle />;
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "COMPLETED":
        return "Completed";

      case "PENDING":
        return "Pending";

      case "FAILED":
        return "Failed";

      default:
        return "Unknown";
    }
  };

  const getTransferIcon = (type) => {
    if (type === "SENT") {
      return <FaArrowUp />;
    }

    return <FaArrowDown />;
  };

  const filteredTransfers = useMemo(() => {
    return transferHistory.filter((transfer) => {
      const searchValue = searchTerm.toLowerCase();

      const matchesSearch =
        transfer.fileName
          ?.toLowerCase()
          .includes(searchValue) ||
        transfer.userName
          ?.toLowerCase()
          .includes(searchValue) ||
        transfer.email
          ?.toLowerCase()
          .includes(searchValue);

      const matchesFilter =
        activeFilter === "ALL" ||
        transfer.type === activeFilter ||
        transfer.status === activeFilter;

      return matchesSearch && matchesFilter;
    });
  }, [transferHistory, searchTerm, activeFilter]);

  const totalTransfers = transferHistory.length;

  const sentTransfers = transferHistory.filter(
    (transfer) => transfer.type === "SENT"
  ).length;

  const receivedTransfers = transferHistory.filter(
    (transfer) => transfer.type === "RECEIVED"
  ).length;

  const completedTransfers = transferHistory.filter(
    (transfer) => transfer.status === "COMPLETED"
  ).length;

  return (
    <MainLayout>
    <div className="transfer-history-page">

      {/* =========================
          PAGE HEADER
      ========================== */}

      <div className="history-header">

        <div>
          <span className="history-eyebrow">
            SECURE FILE TRANSFER
          </span>

          <h1>Transfer History</h1>

          <p>
            Track your previous secure file transfer activity.
          </p>
        </div>

        <div className="history-security-badge">
          <FaShieldAlt />

          <span>
            Audit & Security Tracking
          </span>
        </div>

      </div>

      {/* =========================
          SUMMARY CARDS
      ========================== */}

      <div className="history-summary">

        <div className="history-summary-card">

          <div className="history-summary-icon">
            <FaHistory />
          </div>

          <div>
            <span>Total Transfers</span>

            <strong>
              {totalTransfers}
            </strong>
          </div>

        </div>

        <div className="history-summary-card">

          <div className="history-summary-icon sent">
            <FaArrowUp />
          </div>

          <div>
            <span>Files Sent</span>

            <strong>
              {sentTransfers}
            </strong>
          </div>

        </div>

        <div className="history-summary-card">

          <div className="history-summary-icon received">
            <FaArrowDown />
          </div>

          <div>
            <span>Files Received</span>

            <strong>
              {receivedTransfers}
            </strong>
          </div>

        </div>

        <div className="history-summary-card">

          <div className="history-summary-icon completed">
            <FaCheckCircle />
          </div>

          <div>
            <span>Completed</span>

            <strong>
              {completedTransfers}
            </strong>
          </div>

        </div>

      </div>

      {/* =========================
          SEARCH + FILTER
      ========================== */}

      <div className="history-toolbar">

        <div className="history-search">

          <FaSearch />

          <input
            type="text"
            placeholder="Search files, users or email..."
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(event.target.value)
            }
          />

        </div>

        <div className="history-filters">

          <FaFilter className="history-filter-icon" />

          {filters.map((filter) => (
            <button
              key={filter.value}
              type="button"
              className={`history-filter-btn ${
                activeFilter === filter.value
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setActiveFilter(filter.value)
              }
            >
              {filter.label}
            </button>
          ))}

        </div>

      </div>

      {/* =========================
          HISTORY CARD
      ========================== */}

      <section className="history-card">

        <div className="history-card-header">

          <div>
            <h2>Transfer Activity</h2>

            <p>
              A record of your secure file transfers.
            </p>
          </div>

          <span className="history-count">
            {filteredTransfers.length} transfers
          </span>

        </div>

        {/* =========================
            EMPTY STATE
        ========================== */}

        {filteredTransfers.length === 0 && (
          <div className="history-empty">

            <div className="history-empty-icon">
              <FaHistory />
            </div>

            <h3>
              No transfer history yet
            </h3>

            <p>
              Your completed and pending file transfers
              will appear here once the transfer service
              is connected to the backend.
            </p>

            <div className="history-empty-note">

              <FaShieldAlt />

              <span>
                Transfer records will include security
                verification status without exposing
                cryptographic secrets.
              </span>

            </div>

          </div>
        )}

        {/* =========================
            TRANSFER TABLE
        ========================== */}

        {filteredTransfers.length > 0 && (
          <div className="history-table-wrapper">

            <table className="history-table">

              <thead>

                <tr>

                  <th>File</th>

                  <th>Transfer</th>

                  <th>User</th>

                  <th>Size</th>

                  <th>Date & Time</th>

                  <th>Status</th>

                  <th>Security</th>

                </tr>

              </thead>

              <tbody>

                {filteredTransfers.map((transfer) => (
                  <tr key={transfer.id}>

                    {/* File */}

                    <td>

                      <div className="history-file">

                        <div className="history-file-box">
                          {getFileIcon(
                            transfer.fileName
                          )}
                        </div>

                        <div className="history-file-details">

                          <strong>
                            {transfer.fileName}
                          </strong>

                          <span>
                            {transfer.fileType || "File"}
                          </span>

                        </div>

                      </div>

                    </td>

                    {/* Transfer Type */}

                    <td>

                      <div
                        className={`transfer-type ${
                          transfer.type?.toLowerCase()
                        }`}
                      >

                        {getTransferIcon(
                          transfer.type
                        )}

                        <span>
                          {transfer.type === "SENT"
                            ? "Sent"
                            : "Received"}
                        </span>

                      </div>

                    </td>

                    {/* User */}

                    <td>

                      <div className="history-user">

                        <strong>
                          {transfer.userName}
                        </strong>

                        <span>
                          {transfer.email}
                        </span>

                      </div>

                    </td>

                    {/* Size */}

                    <td>

                      <span className="history-size">
                        {formatFileSize(
                          transfer.fileSize
                        )}
                      </span>

                    </td>

                    {/* Date */}

                    <td>

                      <span className="history-date">
                        {transfer.createdAt || "—"}
                      </span>

                    </td>

                    {/* Status */}

                    <td>

                      <div
                        className={`history-status ${
                          transfer.status?.toLowerCase()
                        }`}
                      >

                        {getStatusIcon(
                          transfer.status
                        )}

                        <span>
                          {getStatusLabel(
                            transfer.status
                          )}
                        </span>

                      </div>

                    </td>

                    {/* Security */}

                    <td>

                      <div className="history-security">

                        <FaShieldAlt />

                        <span>
                          {transfer.verified
                            ? "Verified"
                            : "Pending"}
                        </span>

                      </div>

                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>
        )}

      </section>

      {/* =========================
          SECURITY INFORMATION
      ========================== */}

      <div className="history-security-info">

        <div className="history-security-info-icon">
          <FaShieldAlt />
        </div>

        <div>

          <h3>
            Secure Audit Information
          </h3>

          <p>
            Transfer history will provide an audit trail
            for secure file operations. Future records can
            include encryption status, integrity verification,
            digital-signature verification, algorithm names
            and execution time without displaying private
            keys, AES keys or ML-KEM shared secrets.
          </p>

        </div>

      </div>

    </div>
    </MainLayout>
  );
}

export default TransferHistory;