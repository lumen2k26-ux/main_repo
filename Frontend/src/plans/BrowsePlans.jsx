// src/pages/BrowsePlans.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import planService from "../services/planService";

const BrowsePlans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const data = await planService.getPlans();
      setPlans(data);
    } catch (err) {
      console.error("Error fetching plans:", err);
      alert("Failed to load plans.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="p-6">Loading available plans...</p>;

  if (plans.length === 0)
    return <p className="p-6">No plans available at the moment.</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Available Plans</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="border rounded-lg shadow-md p-4 bg-white hover:shadow-lg transition"
          >
            <p className="font-bold text-lg">{plan.name}</p>
            <p>Price: ${plan.price}/month</p>
            <p>Data Quota: {plan.quota} GB</p>

            <button
              className="mt-3 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              onClick={() => navigate(`/plans/${plan.id}`)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrowsePlans;
