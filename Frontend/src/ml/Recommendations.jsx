// src/pages/Recommendations.jsx
import React, { useEffect, useState } from "react";
import recommendationService from "../services/recommendationService";

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    try {
      const data = await recommendationService.getRecommendations();
      setRecommendations(data);
    } catch (err) {
      console.error("Error fetching recommendations:", err);
      alert("Failed to fetch recommendations");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Recommended Plans for You</h1>

      {loading ? (
        <p>Loading recommendations...</p>
      ) : recommendations.length === 0 ? (
        <p>No recommendations available at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommendations.map((plan) => (
            <div
              key={plan.id}
              className="border rounded-lg shadow-md p-4 bg-white"
            >
              <p className="font-bold text-lg">{plan.name}</p>
              <p>Price: ${plan.price}/month</p>
              <p>Data Quota: {plan.quota} GB</p>
              <button
                className="mt-3 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                onClick={() => alert(`Subscribed to ${plan.name}!`)}
              >
                Subscribe
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Recommendations;
