import { useRef, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import {
  FaCloudUploadAlt,
  FaFile,
  FaFileAlt,
  FaFileImage,
  FaFilePdf,
  FaFileCode,
  FaTrash,
  FaLock,
  FaShieldAlt,
  FaCheckCircle,
  FaInfoCircle,
  FaTimes,
} from "react-icons/fa";

import "./SendFile.css";

function SendFile() {
  const fileInputRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");

  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  /*
   * Maximum file size for the frontend UI.
   *
   * This is only a client-side validation limit.
   * The final limit should come from the backend configuration.
   */
  const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100 MB

  const getFileIcon = (file) => {
    if (!file) {
      return <FaFile className="file-type-icon" />;
    }

    const extension = file.name
      .split(".")
      .pop()
      ?.toLowerCase();

    if (extension === "pdf") {
      return <FaFilePdf className="file-type-icon pdf-icon" />;
    }

    if (
      ["png", "jpg", "jpeg", "gif", "webp", "svg"].includes(
        extension
      )
    ) {
      return (
        <FaFileImage className="file-type-icon image-icon" />
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
        <FaFileCode className="file-type-icon code-icon" />
      );
    }

    return <FaFileAlt className="file-type-icon" />;
  };

  const formatFileSize = (bytes) => {
    if (!bytes) {
      return "0 Bytes";
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

  const validateFile = (file) => {
    setErrorMessage("");
    setSuccessMessage("");

    if (!file) {
      return false;
    }

    if (file.size > MAX_FILE_SIZE) {
      setErrorMessage(
        "File size exceeds the maximum allowed size of 100 MB."
      );

      return false;
    }

    return true;
  };

  const handleFileSelection = (file) => {
    if (!validateFile(file)) {
      return;
    }

    setSelectedFile(file);
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files?.[0];

    if (file) {
      handleFileSelection(file);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setIsDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setIsDragging(false);

    const file = event.dataTransfer.files?.[0];

    if (file) {
      handleFileSelection(file);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setErrorMessage("");
    setSuccessMessage("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    if (!selectedFile) {
      setErrorMessage(
        "Please select a file before continuing."
      );

      return;
    }

    if (!recipient.trim()) {
      setErrorMessage(
        "Please enter the recipient's email address."
      );

      return;
    }

    /*
     * Backend file-transfer API has not been implemented yet.
     *
     * We intentionally do NOT make a fake API request here.
     */
    setSuccessMessage(
      "File is ready for secure transfer. Backend transfer integration will be connected once the file-transfer API is implemented."
    );
  };

  const handleReset = () => {
    setSelectedFile(null);
    setRecipient("");
    setMessage("");
    setErrorMessage("");
    setSuccessMessage("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <MainLayout>
    <div className="send-file-page">

      {/* =========================
          PAGE HEADER
      ========================== */}

      <div className="send-file-header">

        <div>
          <span className="page-eyebrow">
            SECURE FILE TRANSFER
          </span>

          <h1>Send File</h1>

          <p>
            Prepare a file for secure quantum-safe transfer.
          </p>
        </div>

        <div className="security-badge">
          <FaShieldAlt />

          <span>
            Quantum-Safe Ready
          </span>
        </div>

      </div>

      {/* =========================
          MAIN CONTENT
      ========================== */}

      <div className="send-file-content">

        {/* =========================
            LEFT SECTION
        ========================== */}

        <div className="send-file-main">

          <form onSubmit={handleSubmit}>

            {/* File Upload */}

            <section className="send-card">

              <div className="card-heading">

                <div className="heading-icon">
                  <FaCloudUploadAlt />
                </div>

                <div>
                  <h2>Select File</h2>

                  <p>
                    Choose the file you want to transfer securely.
                  </p>
                </div>

              </div>

              {!selectedFile && (
                <div
                  className={`drop-zone ${
                    isDragging ? "dragging" : ""
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={handleBrowseClick}
                >

                  <div className="upload-icon">
                    <FaCloudUploadAlt />
                  </div>

                  <h3>
                    Drag & drop your file here
                  </h3>

                  <p>
                    or click to browse from your device
                  </p>

                  <span className="upload-limit">
                    Maximum file size: 100 MB
                  </span>

                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden-file-input"
                    onChange={handleFileInputChange}
                  />

                  <button
                    type="button"
                    className="browse-btn"
                    onClick={(event) => {
                      event.stopPropagation();
                      handleBrowseClick();
                    }}
                  >
                    Browse Files
                  </button>

                </div>
              )}

              {/* Selected File */}

              {selectedFile && (
                <div className="selected-file">

                  <div className="selected-file-info">

                    <div className="selected-file-icon">
                      {getFileIcon(selectedFile)}
                    </div>

                    <div className="selected-file-details">

                      <h3 title={selectedFile.name}>
                        {selectedFile.name}
                      </h3>

                      <span>
                        {formatFileSize(selectedFile.size)}
                        {" • "}
                        {selectedFile.type ||
                          "Unknown file type"}
                      </span>

                    </div>

                  </div>

                  <button
                    type="button"
                    className="remove-file-btn"
                    onClick={handleRemoveFile}
                    aria-label="Remove selected file"
                    title="Remove file"
                  >
                    <FaTrash />
                  </button>

                </div>
              )}

            </section>

            {/* Recipient */}

            <section className="send-card">

              <div className="card-heading">

                <div className="heading-icon">
                  <FaShieldAlt />
                </div>

                <div>
                  <h2>Recipient</h2>

                  <p>
                    Specify who should receive this file.
                  </p>
                </div>

              </div>

              <div className="form-field">

                <label htmlFor="recipient">
                  Recipient Email
                </label>

                <input
                  id="recipient"
                  type="email"
                  placeholder="recipient@example.com"
                  value={recipient}
                  onChange={(event) =>
                    setRecipient(event.target.value)
                  }
                  autoComplete="email"
                />

              </div>

              <div className="form-field">

                <label htmlFor="message">
                  Message
                  <span className="optional-label">
                    Optional
                  </span>
                </label>

                <textarea
                  id="message"
                  rows="4"
                  placeholder="Add a message for the recipient..."
                  value={message}
                  onChange={(event) =>
                    setMessage(event.target.value)
                  }
                />

              </div>

            </section>

            {/* Error */}

            {errorMessage && (
              <div
                className="transfer-alert error-alert"
                role="alert"
              >
                <FaTimes />

                <span>{errorMessage}</span>
              </div>
            )}

            {/* Success / Information */}

            {successMessage && (
              <div
                className="transfer-alert success-alert"
                role="status"
              >
                <FaCheckCircle />

                <span>{successMessage}</span>
              </div>
            )}

            {/* Actions */}

            <div className="form-actions">

              <button
                type="button"
                className="reset-btn"
                onClick={handleReset}
              >
                Reset
              </button>

              <button
                type="submit"
                className="secure-send-btn"
              >
                <FaLock />

                Prepare Secure Transfer
              </button>

            </div>

          </form>

        </div>

        {/* =========================
            RIGHT SECURITY PANEL
        ========================== */}

        <aside className="security-panel">

          <div className="security-panel-header">

            <div className="security-panel-icon">
              <FaShieldAlt />
            </div>

            <div>
              <h2>Security</h2>

              <p>
                Protected transfer pipeline
              </p>
            </div>

          </div>

          <div className="security-status">

            <div className="status-row">

              <FaCheckCircle />

              <div>
                <strong>Authenticated</strong>

                <span>
                  Your account is authenticated.
                </span>
              </div>

            </div>

            <div className="status-row">

              <FaLock />

              <div>
                <strong>JWT Protected</strong>

                <span>
                  Requests use authenticated access.
                </span>
              </div>

            </div>

          </div>

          <div className="crypto-preview">

            <div className="crypto-preview-title">
              <FaShieldAlt />

              <span>
                Planned Cryptographic Protection
              </span>
            </div>

            <div className="algorithm-item">
              <div>
                <strong>AES-256-GCM</strong>

                <span>
                  Symmetric encryption
                </span>
              </div>

              <span className="planned-badge">
                Planned
              </span>
            </div>

            <div className="algorithm-item">
              <div>
                <strong>ML-KEM</strong>

                <span>
                  Key encapsulation
                </span>
              </div>

              <span className="planned-badge">
                Planned
              </span>
            </div>

            <div className="algorithm-item">
              <div>
                <strong>ML-DSA</strong>

                <span>
                  Digital signature
                </span>
              </div>

              <span className="planned-badge">
                Planned
              </span>
            </div>

            <div className="algorithm-item">
              <div>
                <strong>SHA3-256</strong>

                <span>
                  File integrity verification
                </span>
              </div>

              <span className="planned-badge">
                Planned
              </span>
            </div>

          </div>

          <div className="security-note">

            <FaInfoCircle />

            <p>
              Cryptographic keys and shared secrets will
              never be displayed in the normal application
              interface.
            </p>

          </div>

        </aside>

      </div>

    </div>
    </MainLayout>
  );
}

export default SendFile;