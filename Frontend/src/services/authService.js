// src/services/authService.js
import apiClient from "./apiClient";

const authService = {
  // Login user
  login: async ({ email, password }) => {
    try {
      const response = await apiClient.post("/auth/login", { email, password });
      return response.data; // should return user object with token
    } catch (err) {
      throw new Error(err.response?.data?.message || "Login failed");
    }
  },

  // Register user
  register: async ({ name, email, password }) => {
    try {
      const response = await apiClient.post("/auth/register", { name, email, password });
      return response.data; // could return newly created user
    } catch (err) {
      throw new Error(err.response?.data?.message || "Registration failed");
    }
  },

  // Logout (optional, mostly handled by AuthContext)
  logout: () => {
    localStorage.removeItem("user");
  },
};

export default authService;
