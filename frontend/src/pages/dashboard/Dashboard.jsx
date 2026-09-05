import "./Dashboard.css";

import { useEffect, useState } from "react";

import {
  FaPaperPlane,
  FaInbox,
  FaShieldAlt,
  FaDatabase,
  FaLock,
  FaKey,
  FaFingerprint,
  FaUserShield,
  FaServer,
  FaBolt,
  FaArrowRight,
  FaCheckCircle,
  FaChartLine,
  FaCloudUploadAlt,
  FaCircle,
} from "react-icons/fa";

import DashboardCard, {
  SecurityRow,
  EncryptionRow,
  TransferRow,
} from "../../components/dashboard/DashboardCards";

import { useAuth } from "../../context/AuthContext";


function Dashboard() {

  /* =====================================================
     AUTHENTICATED USER
  ===================================================== */

  const { user } = useAuth();


  /* =====================================================
     DYNAMIC GREETING
  ===================================================== */

  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) {
      return "Good Morning,";
    }

    if (hour < 17) {
      return "Good Afternoon,";
    }

    return "Good Evening,";
  };


  const [greeting, setGreeting] = useState(getGreeting());


  /* =====================================================
     UPDATE GREETING AUTOMATICALLY
  ===================================================== */

  useEffect(() => {

    const updateGreeting = () => {
      setGreeting(getGreeting());
    };

    // Check every minute
    const interval = setInterval(updateGreeting, 60000);

    return () => clearInterval(interval);

  }, []);


  /* =====================================================
     STATISTICS
  ===================================================== */

  const statistics = [
    {
      title: "TOTAL TRANSFERS",
      value: "152",
      change: "+18.4%",
      subtitle: "Protected transfers this month",
      icon: <FaPaperPlane />,
      accent: "blue",
    },
    {
      title: "RECEIVED FILES",
      value: "83",
      change: "+12.2%",
      subtitle: "Successfully received",
      icon: <FaInbox />,
      accent: "green",
    },
    {
      title: "VERIFIED PACKAGES",
      value: "148",
      change: "98%",
      subtitle: "Verification success rate",
      icon: <FaShieldAlt />,
      accent: "purple",
    },
    {
      title: "SECURE STORAGE",
      value: "1.2 GB",
      change: "18.8 GB",
      subtitle: "Available encrypted storage",
      icon: <FaDatabase />,
      accent: "orange",
    },
  ];


  return (
    <main className="dashboard">

      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div className="dashboard-background">

        <div className="dashboard-grid" />

        <div className="dashboard-orb dashboard-orb-one" />
        <div className="dashboard-orb dashboard-orb-two" />
        <div className="dashboard-orb dashboard-orb-three" />

        <div className="dashboard-scan-line" />

      </div>


      {/* =====================================================
          HEADER
      ===================================================== */}

      <section className="dashboard-header">

        <div className="dashboard-header-left">

          <div className="dashboard-eyebrow">
            <span className="eyebrow-dot" />
            QUANTUMSAFE // SECURE ENVIRONMENT
          </div>


          <h1>

            {greeting}

            <span>
              {" "}
              {user?.name || user?.username || "User"}
            </span>

            <span className="wave">
              👋
            </span>

          </h1>


          <p>
            Welcome back to your quantum-safe file transfer environment.
          </p>

        </div>


        <div className="dashboard-system-status">

          <div className="system-status-icon">
            <FaShieldAlt />
          </div>


          <div className="system-status-content">

            <strong>
              <span className="status-live-dot" />
              SYSTEM SECURE
            </strong>

            <small>
              All protection layers operational
            </small>

          </div>


          <FaArrowRight className="status-arrow" />

        </div>

      </section>


      {/* =====================================================
          STATISTICS
      ===================================================== */}

      <section className="dashboard-stats">

        {statistics.map((card) => (

          <DashboardCard
            key={card.title}
            variant="stat"
            {...card}
          />

        ))}

      </section>


      {/* =====================================================
          MAIN SECURITY AREA
      ===================================================== */}

      <section className="dashboard-main-grid">


        {/* ===================================================
            ENCRYPTION PIPELINE
        =================================================== */}

        <DashboardCard
          variant="panel"
          title="Encryption Pipeline"
          subtitle="Multi-layer protection architecture"
          icon={<FaBolt />}
          accent="cyan"
          className="encryption-panel"
        >

          <div className="encryption-intro">

            <div className="encryption-intro-left">

              <div className="encryption-intro-icon">
                <FaShieldAlt />
              </div>


              <div>

                <strong>
                  Hybrid Encryption Active
                </strong>

                <span>
                  Classical + Post-Quantum Cryptography
                </span>

              </div>

            </div>


            <div className="encryption-active">

              <span />
              SECURE

            </div>

          </div>


          <div className="encryption-pipeline">

            <div className="pipeline-line" />


            <EncryptionRow
              number="01"
              name="AES-256"
              type="Symmetric File Encryption"
              percentage={100}
            />


            <EncryptionRow
              number="02"
              name="Kyber"
              type="Post-Quantum Key Encapsulation"
              percentage={100}
            />


            <EncryptionRow
              number="03"
              name="Dilithium"
              type="Post-Quantum Digital Signature"
              percentage={100}
            />

          </div>


          <div className="encryption-footer">

            <span>
              <FaCheckCircle />
              Protection layers verified
            </span>

            <span className="hybrid-badge">
              HYBRID MODE
            </span>

          </div>

        </DashboardCard>


        {/* ===================================================
            SECURITY STATUS
        =================================================== */}

        <DashboardCard
          variant="security"
          title="Security Status"
          subtitle="Protection layers currently active"
          icon={<FaShieldAlt />}
          accent="green"
          className="security-panel"
        >

          <div className="security-core-status">

            <div className="security-core-visual">

              <div className="security-core-circle">

                <div className="security-core-ring ring-one" />
                <div className="security-core-ring ring-two" />
                <div className="security-core-ring ring-three" />

                <div className="security-core-inner">

                  <FaShieldAlt />

                  <strong>
                    100%
                  </strong>

                </div>

              </div>

            </div>


            <div className="security-core-content">

              <span className="protected-label">
                SYSTEM STATUS
              </span>

              <strong>
                PROTECTED
              </strong>

              <span>
                Quantum-safe architecture active
              </span>

            </div>

          </div>


          <div className="security-list">

            <SecurityRow
              icon={<FaLock />}
              name="AES-256 Encryption"
              description="File encryption"
              status="ACTIVE"
              accent="green"
            />


            <SecurityRow
              icon={<FaKey />}
              name="Kyber KEM"
              description="Post-quantum key protection"
              status="ACTIVE"
              accent="cyan"
            />


            <SecurityRow
              icon={<FaFingerprint />}
              name="Dilithium"
              description="Digital signatures"
              status="VERIFIED"
              accent="purple"
            />


            <SecurityRow
              icon={<FaUserShield />}
              name="JWT Authentication"
              description="Identity protection"
              status="ACTIVE"
              accent="blue"
            />


            <SecurityRow
              icon={<FaServer />}
              name="Secure Session"
              description="Session protection"
              status="ACTIVE"
              accent="orange"
            />

          </div>

        </DashboardCard>

      </section>


      {/* =====================================================
          RECENT TRANSFERS
      ===================================================== */}

      <DashboardCard
        variant="table"
        title="Recent Transfers"
        subtitle="Latest protected file activity"
        icon={<FaPaperPlane />}
        accent="blue"
        className="recent-transfers-card"
      >

        <div className="transfer-summary">

          <div className="transfer-summary-item">

            <div className="transfer-summary-icon">
              <FaChartLine />
            </div>

            <div>

              <span>
                TRANSFER ACTIVITY
              </span>

              <strong>
                +18.4%
              </strong>

            </div>

          </div>


          <div className="transfer-summary-item">

            <div className="transfer-summary-icon">
              <FaCloudUploadAlt />
            </div>

            <div>

              <span>
                SECURE PACKAGES
              </span>

              <strong>
                152
              </strong>

            </div>

          </div>


          <div className="transfer-summary-item">

            <div className="transfer-summary-icon">
              <FaCheckCircle />
            </div>

            <div>

              <span>
                VERIFIED
              </span>

              <strong>
                148
              </strong>

            </div>

          </div>

        </div>


        <div className="transfer-table">

          <div className="transfer-table-header">

            <span>FILE</span>
            <span>SIZE</span>
            <span>TIME</span>
            <span>STATUS</span>

          </div>


          <TransferRow
            file="project-report.pdf"
            type="PDF DOCUMENT"
            size="4.8 MB"
            time="2 min ago"
          />


          <TransferRow
            file="quantum-architecture.zip"
            type="ARCHIVE"
            size="28.4 MB"
            time="18 min ago"
          />


          <TransferRow
            file="final-year-project.docx"
            type="DOCUMENT"
            size="2.1 MB"
            time="42 min ago"
          />


          <TransferRow
            file="security-analysis.pdf"
            type="PDF DOCUMENT"
            size="7.6 MB"
            time="1 hr ago"
          />

        </div>


        <button
          className="view-transfers-btn"
          type="button"
        >

          <span>
            View Transfer History
          </span>

          <FaArrowRight />

        </button>

      </DashboardCard>


      {/* =====================================================
          QUANTUM SECURITY STRIP
      ===================================================== */}

      <section className="dashboard-security-strip">

        <div className="strip-icon">
          <FaShieldAlt />
        </div>


        <div className="strip-content">

          <span>
            QUANTUM SECURITY ENGINE
          </span>

          <strong>
            Your files are protected using hybrid
            post-quantum cryptography.
          </strong>

        </div>


        <div className="strip-algorithms">

          <span>AES-256</span>
          <span>KYBER</span>
          <span>DILITHIUM</span>

        </div>


        <div className="strip-status">

          <FaCircle />
          OPERATIONAL

        </div>

      </section>

    </main>
  );
}


export default Dashboard;