import { Routes, Route, Navigate } from "react-router-dom";

import Landing from "../pages/landing/Landing";
import Auth from "../pages/auth/Auth";

import Dashboard from "../pages/dashboard/Dashboard";
import SendFile from "../pages/send/SendFile";
import ReceivedFiles from "../pages/receive/ReceivedFiles";
import TransferHistory from "../pages/history/TransferHistory";
import CryptoDetails from "../pages/crypto/CryptoDetails";
import Profile from "../pages/profile/Profile";
import Settings from "../pages/settings/Settings";
import AdminDashboard from "../pages/admin/AdminDashboard";
import ForgotPassword from "../pages/auth/ForgotPassword";

import ProtectedRoute from "../components/auth/ProtectedRoute";
import MainLayout from "../layouts/MainLayout";


function AppRoutes() {

    return (
        <Routes>

            {/* =========================
                PUBLIC PAGES
            ========================== */}

            <Route
                path="/"
                element={<Landing />}
            />

            <Route
                path="/auth"
                element={<Auth />}
            />


            {/* =========================
                PROTECTED PAGES
            ========================== */}

            <Route element={<ProtectedRoute />}>

                {/* ONE AND ONLY ONE MAIN LAYOUT */}

                <Route element={<MainLayout />}>

                    <Route
                        path="/dashboard"
                        element={<Dashboard />}
                    />

                    <Route
                        path="/send-file"
                        element={<SendFile />}
                    />

                    <Route
                        path="/received-files"
                        element={<ReceivedFiles />}
                    />

                    <Route
                        path="/history"
                        element={<TransferHistory />}
                    />

                    <Route
                        path="/crypto"
                        element={<CryptoDetails />}
                    />

                    <Route
                        path="/profile"
                        element={<Profile />}
                    />

                    <Route
                        path="/settings"
                        element={<Settings />}
                    />

                    <Route
                        path="/admin"
                        element={<AdminDashboard />}
                    />

                    <Route
                        path="/forgot-password"
                        element={<ForgotPassword />}
                    />

                </Route>

            </Route>


            {/* =========================
                FALLBACK
            ========================== */}

            <Route
                path="*"
                element={<Navigate to="/" replace />}
            />

        </Routes>
    );
}

export default AppRoutes;