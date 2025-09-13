// src/components/DashboardCard.jsx
import React from "react";

const DashboardCard = ({ title, value, description, color = "blue" }) => {
  const colors = {
    blue: "bg-blue-600 text-white",
    green: "bg-green-600 text-white",
    yellow: "bg-yellow-500 text-white",
    red: "bg-red-600 text-white",
  };

  return (
    <div className={`rounded-lg shadow-md p-4 ${colors[color]} w-full max-w-xs`}>
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-2xl font-bold mb-1">{value}</p>
      {description && <p className="text-sm text-gray-200">{description}</p>}
    </div>
  );
};

export default DashboardCard;
