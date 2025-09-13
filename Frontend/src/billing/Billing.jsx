// src/pages/billing/Billing.jsx
import React, { useEffect, useState } from "react";
import subscriptionService from "../../services/subscriptionService";
import billingService from "../../services/billingService";

const Billing = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    fetchBillingData();
  }, []);

  const fetchBillingData = async () => {
    try {
      const userSubs = await subscriptionService.getUserSubscriptions();
      setSubscriptions(userSubs);

      const userInvoices = await billingService.getInvoices();
      setInvoices(userInvoices);
    } catch (err) {
      console.error("Error fetching billing data:", err);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Billing</h1>

      <h2 className="text-xl font-semibold mb-4">My Subscriptions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {subscriptions.length > 0 ? (
          subscriptions.map((sub) => (
            <div
              key={sub.id}
              className="border rounded-lg shadow-md p-4 bg-white"
            >
              <p className="font-bold">{sub.planName}</p>
              <p>Price: ${sub.price}/month</p>
              <p>Status: {sub.status}</p>
              <p>Start Date: {sub.startDate}</p>
              <p>Next Renewal: {sub.nextRenewal}</p>
            </div>
          ))
        ) : (
          <p>No active subscriptions.</p>
        )}
      </div>

      <h2 className="text-xl font-semibold mb-4">Invoices</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {invoices.length > 0 ? (
          invoices.map((invoice) => (
            <div
              key={invoice.id}
              className="border rounded-lg shadow-md p-4 bg-white"
            >
              <p className="font-bold">Invoice #{invoice.id}</p>
              <p>Date: {invoice.date}</p>
              <p>Amount: ${invoice.amount}</p>
              <p>Status: {invoice.status}</p>
            </div>
          ))
        ) : (
          <p>No invoices available.</p>
        )}
      </div>
    </div>
  );
};

export default Billing;
