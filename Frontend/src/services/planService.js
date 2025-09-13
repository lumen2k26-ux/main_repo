// src/services/planService.js
import apiClient from "./apiClient";

const planService = {
  // Get all plans
  getPlans: async () => {
    try {
      const response = await apiClient.get("/plans");
      return response.data; // array of plans
    } catch (err) {
      throw new Error(err.response?.data?.message || "Failed to fetch plans");
    }
  },

  // Get top plans (for admin dashboard)
  getTopPlans: async () => {
    try {
      const response = await apiClient.get("/plans/top");
      return response.data; // array of top plans
    } catch (err) {
      throw new Error(err.response?.data?.message || "Failed to fetch top plans");
    }
  },

  // Create a new plan
  createPlan: async (planData) => {
    try {
      const response = await apiClient.post("/plans", planData);
      return response.data;
    } catch (err) {
      throw new Error(err.response?.data?.message || "Failed to create plan");
    }
  },

  // Update an existing plan
  updatePlan: async (id, planData) => {
    try {
      const response = await apiClient.put(`/plans/${id}`, planData);
      return response.data;
    } catch (err) {
      throw new Error(err.response?.data?.message || "Failed to update plan");
    }
  },

  // Delete a plan
  deletePlan: async (id) => {
    try {
      const response = await apiClient.delete(`/plans/${id}`);
      return response.data;
    } catch (err) {
      throw new Error(err.response?.data?.message || "Failed to delete plan");
    }
  },
};

export default planService;
