
import React from "react";

const PlanCard = ({ plan, onSubscribe, onEdit, onDelete, isAdmin }) => {
  return (
    <div className="border rounded-lg shadow-md p-4 bg-white w-full max-w-sm">
      <h2 className="text-xl font-bold mb-2">{plan.name}</h2>
      <p className="mb-1">Price: ${plan.price} / month</p>
      <p className="mb-1">Quota: {plan.quota} GB</p>
      <p className="mb-2 text-gray-600">{plan.description}</p>

      <div className="flex space-x-2">
        {!isAdmin && (
          <button
            onClick={() => onSubscribe(plan.id)}
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
          >
            Subscribe
          </button>
        )}
        {isAdmin && (
          <>
            <button
              onClick={() => onEdit(plan.id)}
              className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(plan.id)}
              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PlanCard;
