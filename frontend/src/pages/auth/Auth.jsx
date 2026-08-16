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

      {/* Animated Background */}
      <div className="auth-bg">
        <div className="gradient-circle circle1"></div>
        <div className="gradient-circle circle2"></div>
      </div>

      <div className="auth-container">

        {/* LEFT PANEL */}

        <div className="auth-left">

          <span className="auth-badge">
            Quantum Resistant Security
          </span>

          <h1>
            Quantum-Safe
            <span> File Transfer</span>
          </h1>

          <p>
            Protect confidential files using
            NIST standardized Post-Quantum Cryptography.
            Secure every transfer with
            AES-256-GCM, ML-KEM, ML-DSA and SHA3-256.
          </p>

          <div className="algorithm-list">

            <span>AES-256-GCM</span>

            <span>ML-KEM (Kyber)</span>

            <span>ML-DSA (Dilithium)</span>

            <span>SHA3-256</span>

          </div>

        </div>

        {/* RIGHT PANEL */}

        <div className="auth-right">

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

        </div>

      </div>

    </div>
  );
}

export default Auth;