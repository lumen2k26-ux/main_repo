// src/pages/Home.jsx
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./context/AuthContext";
import subscriptionService from "./services/subscriptionService";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user } = useContext(AuthContext);
  const [topPlans, setTopPlans] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTopPlans();
  }, []);

  const fetchTopPlans = async () => {
    try {
      const data = await subscriptionService.getTopPlans();
      setTopPlans(data);
    } catch (err) {
      console.error("Error fetching top plans:", err);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">
        Welcome, {user?.name || "User"}!
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div
          className="border rounded-lg p-4 bg-white shadow-md cursor-pointer hover:bg-blue-50"
          onClick={() => navigate("/my-subscriptions")}
        >
          <h2 className="text-xl font-semibold">My Subscriptions</h2>
          <p>View and manage your active subscriptions</p>
        </div>

        <div
          className="border rounded-lg p-4 bg-white shadow-md cursor-pointer hover:bg-green-50"
          onClick={() => navigate("/browse-plans")}
        >
          <h2 className="text-xl font-semibold">Browse Plans</h2>
          <p>Explore available subscription plans</p>
        </div>

        <div
          className="border rounded-lg p-4 bg-white shadow-md cursor-pointer hover:bg-yellow-50"
          onClick={() => navigate("/usage-stats")}
        >
          <h2 className="text-xl font-semibold">Usage Stats</h2>
          <p>Check your data usage and quotas</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-4">Top Plans</h2>
      {topPlans.length === 0 ? (
        <p>No top plans available right now.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {topPlans.map((plan) => (
            <div
              key={plan.id}
              className="border rounded-lg shadow-md p-4 bg-white"
            >
              <p className="font-bold text-lg">{plan.name}</p>
              <p>Price: ${plan.price}/month</p>
              <p>Data Quota: {plan.quota} GB</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
