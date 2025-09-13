
// src/components/SubscriptionCard.jsx
import React from "react";

const SubscriptionCard = ({ subscription, onUpgrade, onDowngrade, onCancel }) => {
  return (
    <div className="border rounded-lg shadow-md p-4 bg-white w-full max-w-md mb-4">
      <h2 className="text-xl font-bold mb-2">{subscription.planName}</h2>
      <p className="mb-1">Price: ${subscription.price} / month</p>
      <p className="mb-1">Quota: {subscription.quota} GB</p>
      <p className="mb-1">Status: {subscription.status}</p>
      <p className="mb-2 text-gray-600">Start Date: {subscription.startDate}</p>

      <div className="flex space-x-2">
        <button
          onClick={() => onUpgrade(subscription.id)}
          className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
        >
          Upgrade
        </button>
        <button
          onClick={() => onDowngrade(subscription.id)}
          className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
        >
          Downgrade
        </button>
        <button
          onClick={() => onCancel(subscription.id)}
          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SubscriptionCard;

