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
      // Fetch top plans
      const plans = await planService.getTopPlans();
      setTopPlans(plans);

      // Fetch subscription stats
      const subscriptions = await subscriptionService.getStats();
      setStats(subscriptions);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <DashboardCard
          title="Total Plans"
          value={stats.totalPlans}
          color="blue"
        />
        <DashboardCard
          title="Active Subscriptions"
          value={stats.activeSubscriptions}
          color="green"
        />
        <DashboardCard
          title="Cancelled Subscriptions"
          value={stats.cancelledSubscriptions}
          color="red"
        />
      </div>

      <h2 className="text-xl font-bold mb-4">Top Plans</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
