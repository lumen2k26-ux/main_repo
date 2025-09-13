// src/services/apiClient.js
import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://127.0.0.1:5000/api", // adjust if backend runs elsewhere
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
