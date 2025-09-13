// src/pages/admin/AdminDashboard.jsx
import React from "react";
import DashboardCard from "../../components/DashboardCard";

function AdminDashboard() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>📊 Admin Dashboard</h1>
      <p>Welcome Admin! This is your dashboard page.</p>

      {/* Example of using DashboardCard */}
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <DashboardCard title="Top Plans" value="5" />
        <DashboardCard title="Active Subscriptions" value="120" />
        <DashboardCard title="Cancelled Subscriptions" value="8" />
      </div>
    </div>
  );
}

export default AdminDashboard;
