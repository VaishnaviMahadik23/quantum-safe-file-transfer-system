import { useState } from "react";
import "./Auth.css";

import LoginForm from "../../components/auth/LoginForm";
import RegisterForm from "../../components/auth/RegisterForm";
import FlipCard from "../../components/auth/FlipCard";

import { useSearchParams } from "react-router-dom";

function Auth() {
  const [searchParams] = useSearchParams();

  const initialMode = searchParams.get("mode") === "register";
  const [isFlipped, setIsFlipped] = useState(initialMode);

  return (
    <div className="auth-page">
      {/* Background */}
      <div className="auth-bg">
        <div className="gradient-circle circle1" />
        <div className="gradient-circle circle2" />
        <div className="background-orb orb-one" />
        <div className="background-orb orb-two" />
      </div>

      <main className="auth-container">
        {/* ================= LEFT ================= */}
        <section className="auth-left">
          <div className="auth-left-header">
            <span className="auth-badge">
              <span className="badge-pulse" />
              Quantum Resistant Security
            </span>

            <h1>
              Quantum-Safe
              <span>File Transfer</span>
            </h1>

            <p>
              Protect confidential files using NIST standardized
              Post-Quantum Cryptography. Secure every transfer with
              AES-256-GCM, ML-KEM, ML-DSA, and SHA3-256.
            </p>

            <div className="algorithm-list">
              <span>AES-256-GCM</span>
              <span>ML-KEM</span>
              <span>ML-DSA</span>
              <span>SHA3-256</span>
            </div>
          </div>

          {/* Quantum visual */}
          <div className="quantum-visual">
            <div className="shield-energy" />

            <div className="shield-orbit shield-orbit-1" />
            <div className="shield-orbit shield-orbit-2" />
            <div className="shield-orbit shield-orbit-3" />

            <span className="shield-particle particle-1" />
            <span className="shield-particle particle-2" />
            <span className="shield-particle particle-3" />
            <span className="shield-particle particle-4" />
            <span className="shield-particle particle-5" />
            <span className="shield-particle particle-6" />

            <div className="quantum-shield">
              <div className="shield-depth depth-1" />
              <div className="shield-depth depth-2" />
              <div className="shield-depth depth-3" />

              <div className="shield-body">
                <div className="shield-inner">
                  <div className="shield-scan" />

                  <div className="shield-core">
                    <div className="core-ring" />
                    <div className="core-ring-outer" />

                    <div className="core-symbol">QS</div>
                  </div>
                </div>

                <div className="shield-glass" />
              </div>

              <div className="shield-reflection" />
            </div>

            <div className="core-label">
              <span className="status-dot" />
              QUANTUM SECURITY ACTIVE
            </div>
          </div>
        </section>

        {/* ================= RIGHT ================= */}
        <section className="auth-right">
          <div className="auth-card-glow" />

          <FlipCard
            isFlipped={isFlipped}
            front={
              <LoginForm
                onSwitch={() => setIsFlipped(true)}
              />
            }
            back={
              <RegisterForm
                onSwitch={() => setIsFlipped(false)}
              />
            }
          />
        </section>
      </main>
    </div>
  );
}

export default Auth;