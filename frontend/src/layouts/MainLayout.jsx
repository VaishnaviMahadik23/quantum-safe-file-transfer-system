import "./MainLayout.css";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function MainLayout({ children }) {

    return (

        <div className="layout">

            <Sidebar />

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