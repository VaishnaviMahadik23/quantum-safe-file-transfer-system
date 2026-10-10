
import "./Dashboard.css";
import { useEffect, useState } from "react";

import {
  FaPaperPlane,
  FaInbox,
  FaShieldAlt,
  FaDatabase,
  FaArrowRight,
  FaCheckCircle,
  FaChartLine,
  FaCloudUploadAlt,
  FaCircle,
} from "react-icons/fa";

import DashboardCard, {
  TransferRow,
} from "../../components/dashboard/DashboardCards";

import { useAuth } from "../../context/AuthContext";

function Dashboard() {
  const { user } = useAuth();

  /* DYNAMIC GREETING */
  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) return "Good Morning,";
    if (hour < 17) return "Good Afternoon,";

    return "Good Evening,";
  };

  const [greeting, setGreeting] = useState(getGreeting());

  /* UPDATE GREETING AUTOMATICALLY */
  useEffect(() => {
    const updateGreeting = () => {
      setGreeting(getGreeting());
    };

    const interval = setInterval(updateGreeting, 60000);

    return () => clearInterval(interval);
  }, []);

  /* DASHBOARD STATISTICS */
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
      {/* BACKGROUND */}
      <div className="dashboard-background">
        <div className="dashboard-grid" />
        <div className="dashboard-orb dashboard-orb-one" />
        <div className="dashboard-orb dashboard-orb-two" />
        <div className="dashboard-orb dashboard-orb-three" />
        <div className="dashboard-scan-line" />
      </div>

      {/* HEADER */}
      <section className="dashboard-header">
        {/* Guardian attack animation */}
        <div className="attack-animation" aria-hidden="true">
          <div className="guardian-energy-ring ring-one" />
          <div className="guardian-energy-ring ring-two" />
          <div className="guardian-energy-ring ring-three" />

          <div className="attack-projectile" />
          <div className="shield-impact-flash" />

          <div className="attack-spark spark-one" />
          <div className="attack-spark spark-two" />
          <div className="attack-spark spark-three" />
          <div className="attack-spark spark-four" />
          <div className="attack-spark spark-five" />
          <div className="attack-spark spark-six" />

          <div className="guardian-scan-beam" />
        </div>

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
            <span className="wave">👋</span>
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

            <small>All protection layers operational</small>
          </div>

          <FaArrowRight className="status-arrow" />
        </div>
      </section>

      {/* STATISTICS */}
      <section className="dashboard-stats">
        {statistics.map((card) => (
          <DashboardCard
            key={card.title}
            variant="stat"
            {...card}
          />
        ))}
      </section>

      {/* RECENT TRANSFERS */}
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
              <span>TRANSFER ACTIVITY</span>
              <strong>+18.4%</strong>
            </div>
          </div>

          <div className="transfer-summary-item">
            <div className="transfer-summary-icon">
              <FaCloudUploadAlt />
            </div>

            <div>
              <span>SECURE PACKAGES</span>
              <strong>152</strong>
            </div>
          </div>

          <div className="transfer-summary-item">
            <div className="transfer-summary-icon">
              <FaCheckCircle />
            </div>

            <div>
              <span>VERIFIED</span>
              <strong>148</strong>
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
          <span>View Transfer History</span>
          <FaArrowRight />
        </button>
      </DashboardCard>

      {/* QUANTUM SECURITY STRIP */}
      <section className="dashboard-security-strip">
        <div className="strip-icon">
          <FaShieldAlt />
        </div>

        <div className="strip-content">
          <span>QUANTUM SECURITY ENGINE</span>

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