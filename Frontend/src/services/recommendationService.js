// src/services/recommendationService.js
import apiClient from "./apiClient";

// Get plan recommendations for a user
export async function getUserRecommendations(userId) {
  const response = await apiClient.get(`/admin/recommendations/${userId}`);
  return response.data;
}
