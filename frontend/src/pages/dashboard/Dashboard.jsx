import "./Dashboard.css";
import MainLayout from "../../layouts/MainLayout";

import DashboardCards from "../../components/dashboard/DashboardCards";
import SecurityStatus from "../../components/dashboard/SecurityStatus";
import EncryptionChart from "../../components/dashboard/EncryptionChart";
import RecentTransfers from "../../components/dashboard/RecentTransfers";

function Dashboard() {
  return (
    <MainLayout>
      <div className="dashboard">

        <div className="dashboard-header">
          <h1>Good Evening, Vaishnavi 👋</h1>

          <p>
            Welcome back to the Quantum-Safe File Transfer Dashboard
          </p>
        </div>

        <DashboardCards />

        <div className="dashboard-middle">

          <EncryptionChart />

          <SecurityStatus />

        </div>

        <RecentTransfers />

      </div>
    </MainLayout>
  );
}

export default Dashboard;