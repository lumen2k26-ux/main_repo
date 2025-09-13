// src/services/recommendationService.js
import apiClient from "./apiClient";

const recommendationService = {
  // Get personalized plan recommendations for the user
  getRecommendations: async () => {
    try {
      const response = await apiClient.get("/ml/recommend_plan");
      return response.data; // array of recommended plans
    } catch (err) {
      throw new Error(err.response?.data?.message || "Failed to fetch recommendations");
    }
  },

  // Optional: Predict which users are likely to cancel (for admin)
  predictChurn: async () => {
    try {
      const response = await apiClient.get("/ml/predict_churn");
      return response.data; // array of user churn predictions
    } catch (err) {
      throw new Error(err.response?.data?.message || "Failed to predict churn");
    }
  },
};

export default recommendationService;
