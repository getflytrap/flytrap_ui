import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function ErrorDashboardLayout(props) {
  return (
    <div className="site-wrapper">
      <div className="grid-container">
        <aside className="sidebar">
          <Sidebar {...props} />
        </aside>

        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
