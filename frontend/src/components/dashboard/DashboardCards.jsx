import "./DashboardCards.css";

import {
  FaPaperPlane,
  FaInbox,
  FaShieldAlt,
  FaDatabase,
} from "react-icons/fa";

const cards = [
  {
    title: "Total Transfers",
    value: "152",
    change: "+18% this month",
    icon: <FaPaperPlane />,
    color: "blue",
  },
  {
    title: "Received Files",
    value: "83",
    change: "+12% this month",
    icon: <FaInbox />,
    color: "green",
  },
  {
    title: "Verified Packages",
    value: "148",
    change: "98% Success Rate",
    icon: <FaShieldAlt />,
    color: "purple",
  },
  {
    title: "Storage Used",
    value: "1.2 GB",
    change: "Available 18.8 GB",
    icon: <FaDatabase />,
    color: "orange",
  },
];

function DashboardCards() {
  return (
    <div className="dashboard-cards">
      {cards.map((card, index) => (
        <div className={`dashboard-card ${card.color}`} key={index}>
          <div className="card-top">
            <div className="card-icon">
              {card.icon}
            </div>

            <span className="card-change">
              {card.change}
            </span>
          </div>

          <div className="card-content">
            <h3>{card.title}</h3>

            <h2>{card.value}</h2>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DashboardCards;