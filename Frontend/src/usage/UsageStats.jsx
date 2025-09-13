// src/pages/usage/UsageStats.jsx
import React, { useEffect, useState } from "react";
import usageService from "../services/usageService";

const UsageStats = () => {
  const [usageStats, setUsageStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsageStats();
  }, []);

  const fetchUsageStats = async () => {
    try {
      const data = await usageService.getUserUsage(); // or getUsageStats() for admin
      setUsageStats(data);
    } catch (err) {
      console.error("Error fetching usage stats:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Usage Statistics</h1>

      {loading ? (
        <p>Loading usage stats...</p>
      ) : usageStats.length === 0 ? (
        <p>No usage data available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {usageStats.map((usage) => (
            <div
              key={usage.id}
              className="border rounded-lg shadow-md p-4 bg-white"
            >
              <p className="font-bold mb-1">Subscription: {usage.planName}</p>
              <p>Used Data: {usage.usedData} GB</p>
              <p>Data Quota: {usage.quota} GB</p>
              <p>Usage Percentage: {((usage.usedData / usage.quota) * 100).toFixed(1)}%</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UsageStats;
