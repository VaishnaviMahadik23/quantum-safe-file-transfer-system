import { useMemo, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import {
  FaSearch,
  FaFile,
  FaFilePdf,
  FaFileImage,
  FaFileCode,
  FaFileAlt,
  FaDownload,
  FaShieldAlt,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaFilter,
  FaInfoCircle,
  FaInbox,
} from "react-icons/fa";

import "./ReceivedFiles.css";

function ReceiveFiles() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("ALL");

  /*
   * The backend Receive Files API has not been implemented yet.
   *
   * Keep this array empty intentionally.
   *
   * When the backend endpoint is ready, the received files
   * will be loaded through the API service instead of using
   * hardcoded/mock data.
   */
  const receivedFiles = [];

  const filters = [
    {
      label: "All Files",
      value: "ALL",
    },
    {
      label: "Verified",
      value: "VERIFIED",
    },
    {
      label: "Pending",
      value: "PENDING",
    },
  ];

  const getFileIcon = (fileName = "") => {
    const extension = fileName
      .split(".")
      .pop()
      ?.toLowerCase();

    if (extension === "pdf") {
      return <FaFilePdf className="receive-file-icon pdf" />;
    }

    if (
      ["png", "jpg", "jpeg", "gif", "webp", "svg"].includes(
        extension
      )
    ) {
      return (
        <FaFileImage className="receive-file-icon image" />
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
        <FaFileCode className="receive-file-icon code" />
      );
    }

    if (extension) {
      return <FaFileAlt className="receive-file-icon" />;
    }

    return <FaFile className="receive-file-icon" />;
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
      case "VERIFIED":
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
      case "VERIFIED":
        return "Verified";

      case "PENDING":
        return "Pending";

      case "FAILED":
        return "Failed";

      default:
        return "Unknown";
    }
  };

  const filteredFiles = useMemo(() => {
    return receivedFiles.filter((file) => {
      const matchesSearch =
        file.name
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        file.sender
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesFilter =
        activeFilter === "ALL" ||
        file.status === activeFilter;

      return matchesSearch && matchesFilter;
    });
  }, [receivedFiles, searchTerm, activeFilter]);

  const handleDownload = (file) => {
    /*
     * Download API will be connected after the backend
     * File Transfer module is implemented.
     *
     * No fake download is performed here.
     */

    console.info(
      "Download requested for:",
      file?.name
    );
  };

  return (
    <MainLayout>
    <div className="receive-files-page">

      {/* =========================
          PAGE HEADER
      ========================== */}

      <div className="receive-files-header">

        <div>
          <span className="receive-eyebrow">
            SECURE FILE TRANSFER
          </span>

          <h1>Received Files</h1>

          <p>
            View and securely access files sent to your account.
          </p>
        </div>

        <div className="receive-security-badge">
          <FaShieldAlt />

          <span>
            Quantum-Safe Protection
          </span>
        </div>

      </div>

      {/* =========================
          TOOLBAR
      ========================== */}

      <div className="receive-toolbar">

        {/* Search */}

        <div className="receive-search">

          <FaSearch />

          <input
            type="text"
            placeholder="Search files or senders..."
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(event.target.value)
            }
          />

        </div>

        {/* Filters */}

        <div className="receive-filters">

          <FaFilter className="filter-icon" />

          {filters.map((filter) => (
            <button
              key={filter.value}
              type="button"
              className={`filter-btn ${
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
          FILE SUMMARY
      ========================== */}

      <div className="receive-summary">

        <div className="summary-item">

          <div className="summary-icon">
            <FaInbox />
          </div>

          <div>
            <span>Total Files</span>

            <strong>
              {receivedFiles.length}
            </strong>
          </div>

        </div>

        <div className="summary-item">

          <div className="summary-icon verified">
            <FaCheckCircle />
          </div>

          <div>
            <span>Verified</span>

            <strong>
              {
                receivedFiles.filter(
                  (file) => file.status === "VERIFIED"
                ).length
              }
            </strong>
          </div>

        </div>

        <div className="summary-item">

          <div className="summary-icon pending">
            <FaClock />
          </div>

          <div>
            <span>Pending</span>

            <strong>
              {
                receivedFiles.filter(
                  (file) => file.status === "PENDING"
                ).length
              }
            </strong>
          </div>

        </div>

      </div>

      {/* =========================
          FILE LIST
      ========================== */}

      <section className="received-files-card">

        <div className="received-files-card-header">

          <div>
            <h2>Incoming Files</h2>

            <p>
              Files received through the secure transfer system.
            </p>
          </div>

          <div className="file-count">
            {filteredFiles.length} files
          </div>

        </div>

        {/* =========================
            EMPTY STATE
        ========================== */}

        {filteredFiles.length === 0 && (
          <div className="received-empty-state">

            <div className="empty-icon">
              <FaInbox />
            </div>

            <h3>
              No received files yet
            </h3>

            <p>
              Files securely sent to your account will
              appear here once the file-transfer service
              is available.
            </p>

            <div className="empty-security-note">

              <FaShieldAlt />

              <span>
                Received files will be verified before
                they become available for download.
              </span>

            </div>

          </div>
        )}

        {/* =========================
            FILE TABLE
        ========================== */}

        {filteredFiles.length > 0 && (
          <div className="received-files-table-wrapper">

            <table className="received-files-table">

              <thead>
                <tr>

                  <th>File</th>

                  <th>Sender</th>

                  <th>Size</th>

                  <th>Received</th>

                  <th>Security</th>

                  <th>Action</th>

                </tr>
              </thead>

              <tbody>

                {filteredFiles.map((file) => (
                  <tr key={file.id}>

                    {/* File */}

                    <td>

                      <div className="table-file">

                        <div className="table-file-icon">
                          {getFileIcon(file.name)}
                        </div>

                        <div className="table-file-info">

                          <strong>
                            {file.name}
                          </strong>

                          <span>
                            {file.type || "File"}
                          </span>

                        </div>

                      </div>

                    </td>

                    {/* Sender */}

                    <td>
                      <div className="sender-info">

                        <strong>
                          {file.sender}
                        </strong>

                        <span>
                          {file.senderEmail}
                        </span>

                      </div>
                    </td>

                    {/* Size */}

                    <td>
                      <span className="file-size">
                        {formatFileSize(file.size)}
                      </span>
                    </td>

                    {/* Date */}

                    <td>
                      <span className="received-date">
                        {file.receivedAt || "—"}
                      </span>
                    </td>

                    {/* Security */}

                    <td>

                      <div
                        className={`security-status ${
                          file.status?.toLowerCase()
                        }`}
                      >
                        {getStatusIcon(file.status)}

                        <span>
                          {getStatusLabel(file.status)}
                        </span>

                      </div>

                    </td>

                    {/* Action */}

                    <td>

                      <button
                        type="button"
                        className="download-btn"
                        onClick={() =>
                          handleDownload(file)
                        }
                        disabled={
                          file.status !== "VERIFIED"
                        }
                      >
                        <FaDownload />

                        Download
                      </button>

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

      <div className="receive-security-info">

        <div className="receive-security-info-icon">
          <FaShieldAlt />
        </div>

        <div>

          <h3>
            Secure File Verification
          </h3>

          <p>
            Future received files will pass through the
            quantum-safe verification pipeline before
            download. File integrity and signature
            verification results will be shown here without
            exposing secret cryptographic material.
          </p>

        </div>

      </div>

    </div>
    </MainLayout>
  );
}

export default ReceiveFiles;