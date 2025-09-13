import React from "react";

export default function SubscriptionCard({ sub, onCancel, onRenew }) {
  return (
    <div style={{border:"1px solid #ddd",padding:12,margin:8}}>
      <p>ID: {sub.id}</p>
      <p>Plan: {sub.planId}</p>
      <p>Status: {sub.status}</p>
      <p>Valid Until: {new Date(sub.validUntil).toLocaleDateString()}</p>
      <button onClick={()=>onCancel(sub.id)}>Cancel</button>
      <button onClick={()=>onRenew(sub.id)}>Renew</button>
    </div>
  );
}