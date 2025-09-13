// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";

// Create AuthContext
export const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user from localStorage on app start
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // Login: save user to state and localStorage
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // Logout: remove user from state and localStorage
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // Check if logged in
  const isAuthenticated = () => !!user;

  // Check if admin
  const isAdmin = () => user?.isAdmin || false;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};
