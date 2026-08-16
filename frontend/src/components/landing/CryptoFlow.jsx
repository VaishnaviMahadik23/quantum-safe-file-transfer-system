import "./CryptoFlow.css";
import {
  FaFileAlt,
  FaLock,
  FaKey,
  FaFingerprint,
  FaSignature,
  FaBoxOpen,
} from "react-icons/fa";

const steps = [
  {
    icon: <FaFileAlt />,
    title: "Original File",
  },
  {
    icon: <FaLock />,
    title: "AES-256",
  },
  {
    icon: <FaKey />,
    title: "ML-KEM",
  },
  {
    icon: <FaFingerprint />,
    title: "SHA3-256",
  },
  {
    icon: <FaSignature />,
    title: "ML-DSA",
  },
  {
    icon: <FaBoxOpen />,
    title: "Package",
  },
];

function CryptoFlow() {
  return (
    <div className="crypto-flow-container">

      <h3 className="flow-heading">
        Secure Transfer Pipeline
      </h3>

      <div className="crypto-flow">

        {steps.map((step, index) => (
          <div className="flow-wrapper" key={index}>

            <div className="flow-card">

              <div className="flow-icon">
                {step.icon}
              </div>

              <h4>{step.title}</h4>

              <span className="status">
                Active
              </span>

            </div>

            {index !== steps.length - 1 && (
              <div className="flow-arrow">
                <div className="moving-dot"></div>
              </div>
            )}

          </div>
        ))}

      </div>

    </div>
  );
}

export default CryptoFlow;