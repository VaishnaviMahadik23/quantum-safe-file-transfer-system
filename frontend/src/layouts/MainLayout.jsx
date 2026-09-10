import "./MainLayout.css";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

import { useState } from "react";
import { Outlet } from "react-router-dom";

function MainLayout() {

    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    return (
        <div
            className={`layout ${
                sidebarCollapsed ? "sidebar-collapsed" : ""
            }`}
        >

            {/* SIDEBAR */}
            <Sidebar
                collapsed={sidebarCollapsed}
                setCollapsed={setSidebarCollapsed}
            />


            {/* RIGHT SIDE */}
            <div className="main-content">

                {/* NAVBAR */}
                <Navbar />
                
                <main className="page-content">
                    <Outlet />
                </main>

            </div>

        </div>
    );
}

export default MainLayout;