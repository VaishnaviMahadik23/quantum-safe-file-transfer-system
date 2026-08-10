import MainLayout from "../../layouts/MainLayout";
import {
  FaShieldAlt,
  FaLock,
  FaKey,
  FaFingerprint,
  FaSignature,
  FaCheckCircle,
  FaClock,
  FaInfoCircle,
  FaDatabase,
  FaServer,
} from "react-icons/fa";

import "./CryptoDetails.css";

function CryptoDetails() {
  /*
   * IMPORTANT:
   *
   * The cryptographic backend module has not been implemented yet.
   *
   * Therefore, this page intentionally does NOT:
   *
   * - generate AES keys
   * - display AES keys
   * - generate ML-KEM shared secrets
   * - display private keys
   * - calculate fake hashes
   * - generate fake signatures
   * - display fake execution times
   *
   * These values will come from the backend after the
   * cryptographic/file-transfer module is implemented.
   */

  const algorithms = [
    {
      name: "AES-256-GCM",
      category: "Symmetric Encryption",
      icon: <FaLock />,
      description:
        "Authenticated symmetric encryption designed to provide confidentiality and integrity for transferred files.",
      details: [
        "256-bit encryption key",
        "Galois/Counter Mode",
        "Authenticated encryption",
        "Confidentiality + integrity",
      ],
      status: "Planned",
    },
    {
      name: "ML-KEM",
      category: "Key Encapsulation",
      icon: <FaKey />,
      description:
        "Post-quantum key encapsulation mechanism used to establish shared secret material between communicating parties.",
      details: [
        "NIST-standardized PQC",
        "Kyber-based construction",
        "Quantum-resistant key establishment",
        "Shared secret remains hidden",
      ],
      status: "Planned",
    },
    {
      name: "ML-DSA",
      category: "Digital Signature",
      icon: <FaSignature />,
      description:
        "Post-quantum digital signature mechanism used to verify authenticity and integrity of transferred data.",
      details: [
        "NIST-standardized PQC",
        "Dilithium-based construction",
        "Message authentication",
        "Signature verification",
      ],
      status: "Planned",
    },
    {
      name: "SHA3-256",
      category: "Cryptographic Hash",
      icon: <FaFingerprint />,
      description:
        "Cryptographic hashing algorithm intended to generate a deterministic fingerprint for transferred files.",
      details: [
        "256-bit hash output",
        "File integrity verification",
        "Tamper detection",
        "Cryptographic fingerprint",
      ],
      status: "Planned",
    },
  ];

  return (
    <MainLayout>
    <div className="crypto-page">

      {/* =========================
          PAGE HEADER
      ========================== */}

      <div className="crypto-header">

        <div>

          <span className="crypto-eyebrow">
            QUANTUM-SAFE SECURITY
          </span>

          <h1>
            Cryptographic Details
          </h1>

          <p>
            Review the cryptographic technologies used by
            the Quantum-Safe File Transfer system.
          </p>

        </div>

        <div className="crypto-security-badge">

          <FaShieldAlt />

          <span>
            Quantum-Resistant Architecture
          </span>

        </div>

      </div>

      {/* =========================
          SECURITY NOTICE
      ========================== */}

      <section className="crypto-notice">

        <div className="crypto-notice-icon">
          <FaInfoCircle />
        </div>

        <div className="crypto-notice-content">

          <h3>
            Cryptographic Execution Pending
          </h3>

          <p>
            The cryptographic processing module will be
            connected after the backend File Transfer
            module is implemented. This page currently
            displays the planned security architecture only.
          </p>

          <div className="crypto-notice-status">

            <FaClock />

            <span>
              Backend cryptographic integration pending
            </span>

          </div>

        </div>

      </section>

      {/* =========================
          SECURITY PIPELINE
      ========================== */}

      <section className="crypto-pipeline-section">

        <div className="crypto-section-title">

          <div>

            <h2>
              Hybrid Encryption Pipeline
            </h2>

            <p>
              Planned security flow for protected file transfer.
            </p>

          </div>

        </div>

        <div className="crypto-pipeline">

          {/* Step 1 */}

          <div className="crypto-pipeline-card">

            <div className="crypto-pipeline-number">
              01
            </div>

            <div className="crypto-pipeline-icon">
              <FaKey />
            </div>

            <span className="crypto-pipeline-label">
              KEY ESTABLISHMENT
            </span>

            <h3>
              ML-KEM
            </h3>

            <p>
              Establish a quantum-resistant shared secret
              between communicating parties.
            </p>

          </div>

          <div className="crypto-pipeline-arrow">
            →
          </div>

          {/* Step 2 */}

          <div className="crypto-pipeline-card">

            <div className="crypto-pipeline-number">
              02
            </div>

            <div className="crypto-pipeline-icon">
              <FaLock />
            </div>

            <span className="crypto-pipeline-label">
              FILE ENCRYPTION
            </span>

            <h3>
              AES-256-GCM
            </h3>

            <p>
              Encrypt the actual file contents using
              authenticated symmetric encryption.
            </p>

          </div>

          <div className="crypto-pipeline-arrow">
            →
          </div>

          {/* Step 3 */}

          <div className="crypto-pipeline-card">

            <div className="crypto-pipeline-number">
              03
            </div>

            <div className="crypto-pipeline-icon">
              <FaSignature />
            </div>

            <span className="crypto-pipeline-label">
              AUTHENTICITY
            </span>

            <h3>
              ML-DSA
            </h3>

            <p>
              Provide post-quantum digital signature
              verification for transferred data.
            </p>

          </div>

          <div className="crypto-pipeline-arrow">
            →
          </div>

          {/* Step 4 */}

          <div className="crypto-pipeline-card">

            <div className="crypto-pipeline-number">
              04
            </div>

            <div className="crypto-pipeline-icon">
              <FaFingerprint />
            </div>

            <span className="crypto-pipeline-label">
              INTEGRITY
            </span>

            <h3>
              SHA3-256
            </h3>

            <p>
              Generate a cryptographic fingerprint for
              file integrity verification.
            </p>

          </div>

        </div>

      </section>

      {/* =========================
          ALGORITHM CARDS
      ========================== */}

      <section className="crypto-algorithms-section">

        <div className="crypto-section-title">

          <div>

            <h2>
              Cryptographic Algorithms
            </h2>

            <p>
              Security mechanisms planned for the final system.
            </p>

          </div>

          <span className="crypto-planned-badge">
            Backend Integration Pending
          </span>

        </div>

        <div className="crypto-algorithm-grid">

          {algorithms.map((algorithm) => (

            <article
              className="crypto-algorithm-card"
              key={algorithm.name}
            >

              <div className="crypto-algorithm-top">

                <div className="crypto-algorithm-icon">
                  {algorithm.icon}
                </div>

                <span className="crypto-algorithm-status">
                  {algorithm.status}
                </span>

              </div>

              <span className="crypto-category">
                {algorithm.category}
              </span>

              <h3>
                {algorithm.name}
              </h3>

              <p className="crypto-description">
                {algorithm.description}
              </p>

              <div className="crypto-details-list">

                {algorithm.details.map((detail) => (

                  <div
                    className="crypto-detail-item"
                    key={detail}
                  >

                    <FaCheckCircle />

                    <span>
                      {detail}
                    </span>

                  </div>

                ))}

              </div>

            </article>

          ))}

        </div>

      </section>

      {/* =========================
          VERIFICATION STATUS
      ========================== */}

      <section className="crypto-verification-section">

        <div className="crypto-section-title">

          <div>

            <h2>
              Cryptographic Verification
            </h2>

            <p>
              Verification results will be populated by
              the backend after cryptographic processing.
            </p>

          </div>

        </div>

        <div className="crypto-verification-grid">

          {/* Encryption */}

          <div className="crypto-verification-card">

            <div className="crypto-verification-icon">
              <FaLock />
            </div>

            <div className="crypto-verification-content">

              <span>
                Encryption Status
              </span>

              <strong>
                Pending
              </strong>

              <small>
                Awaiting file encryption backend
              </small>

            </div>

          </div>

          {/* Hash */}

          <div className="crypto-verification-card">

            <div className="crypto-verification-icon">
              <FaFingerprint />
            </div>

            <div className="crypto-verification-content">

              <span>
                SHA3-256 Hash
              </span>

              <strong>
                Not Generated
              </strong>

              <small>
                Generated after file processing
              </small>

            </div>

          </div>

          {/* Signature */}

          <div className="crypto-verification-card">

            <div className="crypto-verification-icon">
              <FaSignature />
            </div>

            <div className="crypto-verification-content">

              <span>
                Signature Verification
              </span>

              <strong>
                Pending
              </strong>

              <small>
                ML-DSA integration pending
              </small>

            </div>

          </div>

          {/* Execution */}

          <div className="crypto-verification-card">

            <div className="crypto-verification-icon">
              <FaClock />
            </div>

            <div className="crypto-verification-content">

              <span>
                Execution Time
              </span>

              <strong>
                Not Available
              </strong>

              <small>
                Measured during backend execution
              </small>

            </div>

          </div>

        </div>

      </section>

      {/* =========================
          SECRET MATERIAL NOTICE
      ========================== */}

      <section className="crypto-secret-notice">

        <div className="crypto-secret-icon">
          <FaShieldAlt />
        </div>

        <div>

          <h3>
            Sensitive Cryptographic Material Protected
          </h3>

          <p>
            Secret keys, ML-KEM shared secrets, private
            signing keys, encryption nonces and other
            sensitive cryptographic material are never
            displayed in the normal application interface.
          </p>

        </div>

      </section>

      {/* =========================
          ARCHITECTURE FOOTER
      ========================== */}

      <div className="crypto-footer">

        <div className="crypto-footer-item">

          <FaServer />

          <div>

            <span>
              Cryptographic Processing
            </span>

            <strong>
              Backend
            </strong>

          </div>

        </div>

        <div className="crypto-footer-item">

          <FaDatabase />

          <div>

            <span>
              Persistent Security Data
            </span>

            <strong>
              PostgreSQL
            </strong>

          </div>

        </div>

        <div className="crypto-footer-item">

          <FaShieldAlt />

          <div>

            <span>
              Security Model
            </span>

            <strong>
              Hybrid Post-Quantum
            </strong>

          </div>

        </div>

      </div>

    </div>
    </MainLayout>
  );
}

export default CryptoDetails;