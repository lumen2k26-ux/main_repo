// src/pages/subscription/MySubscriptions.jsx
import React, { useContext, useEffect } from "react";
import { SubscriptionContext } from "../../context/SubscriptionContext";
import { useNavigate } from "react-router-dom";

const MySubscriptions = () => {
  const { subscriptions, fetchSubscriptions } = useContext(SubscriptionContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const handleManage = (subId) => {
    navigate(`/manage-subscription/${subId}`);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">My Subscriptions</h1>

      {subscriptions.length === 0 ? (
        <p>No active subscriptions.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {subscriptions.map((sub) => (
            <div
              key={sub.id}
              className="border rounded-lg shadow-md p-4 bg-white"
            >
              <p className="font-bold text-lg mb-1">{sub.planName}</p>
              <p>Price: ${sub.price}/month</p>
              <p>Status: {sub.status}</p>
              <p>Next Renewal: {sub.nextRenewal}</p>

              <button
                onClick={() => handleManage(sub.id)}
                className="mt-3 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Manage Subscription
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MySubscriptions;
