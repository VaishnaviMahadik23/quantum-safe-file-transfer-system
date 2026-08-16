import "./MainLayout.css";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

import { useState } from "react";

function MainLayout({ children }) {

    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    return (

        <div
            className={`layout ${
                sidebarCollapsed ? "sidebar-collapsed" : ""
            }`}
        >

            <Sidebar
                collapsed={sidebarCollapsed}
                setCollapsed={setSidebarCollapsed}
            />

            <div className="main-content">

                <Navbar />

                <main className="page-content">
                    {children}
                </main>

            </div>

        </div>

    );
}

export default MainLayout;