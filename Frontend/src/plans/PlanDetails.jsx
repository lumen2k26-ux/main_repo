// src/pages/PlanDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import planService from "../services/planService";
import subscriptionService from "../services/subscriptionService";

const PlanDetails = () => {
  const { id } = useParams(); // plan ID from route
  const navigate = useNavigate();
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlanDetails();
  }, [id]);

  const fetchPlanDetails = async () => {
    try {
      const data = await planService.getPlanById(id);
      setPlan(data);
    } catch (err) {
      console.error("Error fetching plan:", err);
      alert("Failed to load plan details.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async () => {
    try {
      await subscriptionService.subscribe({ planId: plan.id });
      alert(`Successfully subscribed to ${plan.name}`);
      navigate("/mysubscription");
    } catch (err) {
      console.error("Error subscribing:", err);
      alert("Subscription failed.");
    }
  };

  if (loading) return <p className="p-6">Loading plan details...</p>;

  if (!plan) return <p className="p-6">Plan not found.</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-lg mx-auto border rounded-lg shadow-md p-6 bg-white">
        <h1 className="text-2xl font-bold mb-4">{plan.name}</h1>
        <p className="mb-2 text-gray-700">{plan.description}</p>
        <p className="mb-2">
          <span className="font-semibold">Price:</span> ${plan.price}/month
        </p>
        <p className="mb-2">
          <span className="font-semibold">Quota:</span> {plan.quota} GB
        </p>

        <button
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          onClick={handleSubscribe}
        >
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default PlanDetails;
