// src/services/adminService.js
import apiClient from "./apiClient";

// Fetch top plans
export async function getTopPlans(period = "monthly") {
  const response = await apiClient.get(`/admin/top-plans?period=${period}`);
  return response.data;
}

// Fetch subscription trends
export async function getSubscriptionTrends(from, to) {
  const response = await apiClient.get(`/admin/subscription-trends`, {
    params: { from, to },
  });
  return response.data;
}

// Fetch active vs cancelled subscriptions
export async function getActiveVsCancelled() {
  const response = await apiClient.get(`/admin/active-vs-cancelled`);
  return response.data;
}
