import "./SecurityCard.css";
import {
  FaShieldAlt,
  FaLock,
  FaKey,
  FaSignature,
} from "react-icons/fa";
import { BsFingerprint } from "react-icons/bs";

function SecurityCard() {
  return (
    <div className="security-card">

      <div className="shield-wrapper">
        <FaShieldAlt className="shield-icon" />
      </div>

      <h2>Quantum Safe</h2>

      <p>
        Future-proof cryptography powered by
        NIST standardized algorithms.
      </p>

      <div className="tech-grid">

        <span><FaLock /> AES-256-GCM</span>

        <span><FaKey /> ML-KEM</span>

        <span><BsFingerprint /> SHA3-256</span>

        <span><FaSignature /> ML-DSA</span>

      </div>

      <div className="security-status">

        <span className="green-dot"></span>

        Security Active

      </div>

    </div>
  );
}

export default SecurityCard;