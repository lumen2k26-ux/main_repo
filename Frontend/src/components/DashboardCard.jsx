// src/components/DashboardCard.jsx
import React from "react";

function DashboardCard({ title, value }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "16px",
        width: "200px",
        textAlign: "center",
        background: "#f9f9f9"
      }}
    >
      <h3>{title}</h3>
      <p style={{ fontSize: "24px", fontWeight: "bold" }}>{value}</p>
    </div>
  );
}

export default DashboardCard;
