// src/pages/billing/Invoices.jsx
import React, { useEffect, useState } from "react";
import billingService from "../services/billingService";

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const data = await billingService.getInvoices(); // API call
      setInvoices(data);
    } catch (err) {
      console.error("Error fetching invoices:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Invoices</h1>

      {loading ? (
        <p>Loading invoices...</p>
      ) : invoices.length === 0 ? (
        <p>No invoices available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {invoices.map((invoice) => (
            <div
              key={invoice.id}
              className="border rounded-lg shadow-md p-4 bg-white"
            >
              <p className="font-bold mb-1">Invoice #{invoice.id}</p>
              <p>Date: {invoice.date}</p>
              <p>Amount: ${invoice.amount}</p>
              <p>Status: {invoice.status}</p>
              <p>User: {invoice.userName}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Invoices;
