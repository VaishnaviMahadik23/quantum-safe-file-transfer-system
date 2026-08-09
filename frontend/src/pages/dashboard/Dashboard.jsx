import "./Dashboard.css";
import MainLayout from "../../layouts/MainLayout";

import DashboardCards from "../../components/dashboard/DashboardCards";
import SecurityStatus from "../../components/dashboard/SecurityStatus";
import EncryptionChart from "../../components/dashboard/EncryptionChart";
import RecentTransfers from "../../components/dashboard/RecentTransfers";

import { useAuth } from "../../context/AuthContext";

function Dashboard() {
  const { user } = useAuth();

  const firstName =
    user?.firstName ||
    user?.username ||
    "User";

  return (
    <MainLayout>
      <div className="dashboard">

        <div className="dashboard-header">

          <h1>
            Good Evening, {firstName} 👋
          </h1>

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