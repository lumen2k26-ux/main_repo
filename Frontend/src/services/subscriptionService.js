
// src/services/subscriptionService.js
import apiClient from "./apiClient";

const subscriptionService = {
  // Get all subscriptions for the logged-in user
  getUserSubscriptions: async () => {
    try {
      const response = await apiClient.get("/subscriptions/user");
      return response.data; // array of subscriptions
    } catch (err) {
      throw new Error(err.response?.data?.message || "Failed to fetch subscriptions");
    }
  },

  // Subscribe to a plan
  subscribe: async (planId) => {
    try {
      const response = await apiClient.post("/subscriptions/subscribe", { planId });
      return response.data; // newly created subscription
    } catch (err) {
      throw new Error(err.response?.data?.message || "Subscription failed");
    }
  },

  // Cancel a subscription
  cancelSubscription: async (subscriptionId) => {
    try {
      const response = await apiClient.post("/subscriptions/cancel", { subscriptionId });
      return response.data; // updated subscription
    } catch (err) {
      throw new Error(err.response?.data?.message || "Failed to cancel subscription");
    }
  },

  // Upgrade a subscription
  upgradeSubscription: async (subscriptionId, newPlanId) => {
    try {
      const response = await apiClient.post("/subscriptions/upgrade", {
        subscriptionId,
        newPlanId,
      });
      return response.data;
    } catch (err) {
      throw new Error(err.response?.data?.message || "Failed to upgrade subscription");
    }
  },

  // Downgrade a subscription
  downgradeSubscription: async (subscriptionId, newPlanId) => {
    try {
      const response = await apiClient.post("/subscriptions/downgrade", {
        subscriptionId,
        newPlanId,
      });
      return response.data;
    } catch (err) {
      throw new Error(err.response?.data?.message || "Failed to downgrade subscription");
    }
  },

  // Optional: fetch usage stats per subscription
  getUsage: async (subscriptionId) => {
    try {
      const response = await apiClient.get(`/usage/${subscriptionId}`);
      return response.data;
    } catch (err) {
      throw new Error(err.response?.data?.message || "Failed to fetch usage");
    }
  },

  // Optional: fetch general stats for admin dashboard
  getStats: async () => {
    try {
      const response = await apiClient.get("/subscriptions/stats");
      return response.data; // { totalActive, totalCancelled, etc. }
    } catch (err) {
      throw new Error(err.response?.data?.message || "Failed to fetch subscription stats");
    }
  },
};

export default subscriptionService;

import axios from "axios";
const API = axios.create({ baseURL: "http://localhost:4000/api/subscriptions" });

export const getSubs = async (userId) => (await API.get(`/?userId=${userId}`)).data;
export const subscribe = async (userId, planId) => (await API.post("/", { userId, planId })).data;
export const cancelSub = async (id) => (await API.post(`/${id}/cancel`)).data;
export const renewSub = async (id) => (await API.post(`/${id}/renew`)).data;
export const changePlan = async (id, newPlanId) => (await API.post(`/${id}/change`, { newPlanId })).data;
