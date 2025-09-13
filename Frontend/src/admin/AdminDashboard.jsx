// src/pages/admin/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import DashboardCard from "../components/DashboardCard";
import planService from "../services/planService";
import subscriptionService from "../services/subscriptionService";


const AdminDashboard = () => {
  const [topPlans, setTopPlans] = useState([]);
  const [stats, setStats] = useState({
    totalPlans: 0,
    activeSubscriptions: 0,
    cancelledSubscriptions: 0,
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const plans = await planService.getTopPlans();
      setTopPlans(plans);

      const subscriptions = await subscriptionService.getStats();
      setStats(subscriptions);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
    }
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Admin Dashboard</h1>

      <div className="stats-grid">
        <DashboardCard title="Total Plans" value={stats.totalPlans} color="blue" />
        <DashboardCard title="Active Subscriptions" value={stats.activeSubscriptions} color="green" />
        <DashboardCard title="Cancelled Subscriptions" value={stats.cancelledSubscriptions} color="red" />
      </div>

      <h2 className="section-title">Top Plans</h2>
      <div className="plans-grid">
        {topPlans.length > 0 ? (
          topPlans.map((plan) => (
            <DashboardCard
              key={plan.id}
              title={plan.name}
              value={`$${plan.price}`}
              description={`${plan.subscriptions} subscriptions`}
              color="yellow"
            />
          ))
        ) : (
          <p>No plans available.</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
