// src/services/usageService.js
import apiClient from "./apiClient";

const usageService = {
  // Get usage for a specific subscription
  getUsageBySubscription: async (subscriptionId) => {
    try {
      const response = await apiClient.get(`/usage/${subscriptionId}`);
      return response.data; // usage object
    } catch (err) {
      throw new Error(err.response?.data?.message || "Failed to fetch usage");
    }
  },

  // Get usage for all subscriptions of the user
  getUserUsage: async () => {
    try {
      const response = await apiClient.get("/usage/user");
      return response.data; // array of usage objects
    } catch (err) {
      throw new Error(err.response?.data?.message || "Failed to fetch user usage");
    }
  },

  // Optional: Admin analytics
  getUsageStats: async () => {
    try {
      const response = await apiClient.get("/usage/stats");
      return response.data; // stats like avg usage, over quota, etc.
    } catch (err) {
      throw new Error(err.response?.data?.message || "Failed to fetch usage stats");
    }
  },
};

export default usageService;
