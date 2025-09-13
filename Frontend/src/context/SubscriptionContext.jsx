// src/context/SubscriptionContext.jsx
import React, { createContext, useState, useEffect } from "react";
import subscriptionService from "../services/subscriptionService";

// Create SubscriptionContext
export const SubscriptionContext = createContext();

// Provider component
export const SubscriptionProvider = ({ children }) => {
  const [subscriptions, setSubscriptions] = useState([]);

  // Load subscriptions on app start
  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      const data = await subscriptionService.getUserSubscriptions(); // API call
      setSubscriptions(data);
    } catch (err) {
      console.error("Error fetching subscriptions:", err);
    }
  };

  const addSubscription = (newSub) => {
    setSubscriptions((prev) => [...prev, newSub]);
  };

  const updateSubscription = (updatedSub) => {
    setSubscriptions((prev) =>
      prev.map((sub) => (sub.id === updatedSub.id ? updatedSub : sub))
    );
  };

  const removeSubscription = (id) => {
    setSubscriptions((prev) => prev.filter((sub) => sub.id !== id));
  };

  return (
    <SubscriptionContext.Provider
      value={{
        subscriptions,
        fetchSubscriptions,
        addSubscription,
        updateSubscription,
        removeSubscription,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};
