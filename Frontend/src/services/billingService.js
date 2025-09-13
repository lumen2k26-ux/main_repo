// src/services/billingService.js
import apiClient from "./apiClient";

const billingService = {
  // Fetch invoices for the logged-in user
  getInvoices: async () => {
    try {
      const response = await apiClient.get("/billing/invoices");
      return response.data; // array of invoices
    } catch (err) {
      throw new Error(err.response?.data?.message || "Failed to fetch invoices");
    }
  },

  // Fetch billing info for subscriptions (optional for future use)
  getBillingInfo: async () => {
    try {
      const response = await apiClient.get("/billing");
      return response.data; // subscription billing info
    } catch (err) {
      throw new Error(err.response?.data?.message || "Failed to fetch billing info");
    }
  },

  // Could include future methods like generating invoice, paying, etc.
};

export default billingService;
