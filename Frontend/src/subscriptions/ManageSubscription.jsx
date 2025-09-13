// src/pages/subscription/ManageSubscription.jsx
import React, { useEffect, useContext, useState } from "react";
import { SubscriptionContext } from "../context/SubscriptionContext";
import subscriptionService from "../services/subscriptionService";

const ManageSubscription = () => {
  const { subscriptions, fetchSubscriptions, removeSubscription, updateSubscription } =
    useContext(SubscriptionContext);
  const [plans, setPlans] = useState([]); // available plans for upgrade/downgrade

  useEffect(() => {
    fetchSubscriptions();
    fetchAvailablePlans();
  }, []);

  const fetchAvailablePlans = async () => {
    try {
      const res = await subscriptionService.getAllPlans(); // you may need a getAllPlans endpoint
      setPlans(res);
    } catch (err) {
      console.error("Error fetching plans:", err);
    }
  };

  const handleCancel = async (subId) => {
    try {
      await subscriptionService.cancelSubscription(subId);
      removeSubscription(subId);
      alert("Subscription cancelled successfully.");
    } catch (err) {
      console.error(err);
      alert("Failed to cancel subscription.");
    }
  };

  const handleUpgradeDowngrade = async (subId, newPlanId) => {
    try {
      const currentSub = subscriptions.find((s) => s.id === subId);
      let updatedSub;
      if (newPlanId > currentSub.planId) {
        updatedSub = await subscriptionService.upgradeSubscription(subId, newPlanId);
      } else {
        updatedSub = await subscriptionService.downgradeSubscription(subId, newPlanId);
      }
      updateSubscription(updatedSub);
      alert("Subscription updated successfully.");
    } catch (err) {
      console.error(err);
      alert("Failed to update subscription.");
    }
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
              <p className="font-bold">{sub.planName}</p>
              <p>Price: ${sub.price}/month</p>
              <p>Status: {sub.status}</p>
              <p>Next Renewal: {sub.nextRenewal}</p>

              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => handleCancel(sub.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Cancel
                </button>

                <select
                  onChange={(e) => handleUpgradeDowngrade(sub.id, e.target.value)}
                  className="border px-2 py-1 rounded"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Change Plan
                  </option>
                  {plans
                    .filter((plan) => plan.id !== sub.planId)
                    .map((plan) => (
                      <option key={plan.id} value={plan.id}>
                        {plan.name} (${plan.price})
                      </option>
                    ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageSubscription;
