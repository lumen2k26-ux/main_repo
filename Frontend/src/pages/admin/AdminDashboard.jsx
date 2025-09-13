
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
=======
import { useAuth } from '../../hooks/useAuth';

const AdminDashboard = () => {
  const { userInfo, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f8fafc',
      minHeight: '100vh',
      color: '#1e293b'
    }}>
      <h1 style={{ color: '#1e293b', marginBottom: '20px' }}>Admin Dashboard</h1>
      <p style={{ color: '#64748b', marginBottom: '20px' }}>Welcome, {userInfo?.name || 'Admin'}!</p>
      <button 
        onClick={handleLogout} 
        style={{ 
          padding: '10px 20px', 
          marginTop: '10px',
          backgroundColor: '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '500'
        }}
      >
        Logout
      </button>
    </div>
  );
};


export default AdminDashboard;
