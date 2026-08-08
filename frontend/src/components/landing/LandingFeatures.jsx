import "./LandingFeatures.css";

import {
    FaLock,
    FaKey,
    FaSignature,
    FaShieldAlt,
    FaExchangeAlt,
    FaDatabase,
} from "react-icons/fa";

const features = [
    {
        icon: <FaLock />,
        title: "AES-256-GCM",
        desc: "High-speed symmetric encryption for secure file protection."
    },
    {
        icon: <FaKey />,
        title: "ML-KEM",
        desc: "Quantum-safe key encapsulation based on NIST standards."
    },
    {
        icon: <FaSignature />,
        title: "ML-DSA",
        desc: "Digital signatures for integrity and authentication."
    },
    {
        icon: <FaShieldAlt />,
        title: "SHA3-256",
        desc: "Secure hashing to protect data integrity."
    },
    {
        icon: <FaExchangeAlt />,
        title: "Secure Transfer",
        desc: "Enterprise-grade encrypted communication."
    },
    {
        icon: <FaDatabase />,
        title: "Audit Logs",
        desc: "Track every transfer with complete transparency."
    }
];

function LandingFeatures() {
    return (

        <section className="landing-features">

            <h2>Core Security Features</h2>

            <div className="feature-grid">

                {features.map((feature, index) => (

                    <div className="feature-card" key={index}>

                        <div className="feature-icon">

                            {feature.icon}

                        </div>

                        <h3>{feature.title}</h3>

                        <p>{feature.desc}</p>

                    </div>

                ))}

            </div>

        </section>

    );
}

export default LandingFeatures;