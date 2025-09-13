// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { SubscriptionProvider } from "./context/SubscriptionContext";

// Pages
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import MySubscriptions from "./pages/subscription/MySubscriptions";
import ManageSubscription from "./pages/subscription/ManageSubscription";
import BrowsePlans from "./pages/plans/BrowsePlans";
import UsageStats from "./pages/usage/UsageStats";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManagePlans from "./pages/admin/ManagePlans";
import Billing from "./pages/billing/Billing";
import Invoices from "./pages/billing/Invoices";

// Components
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <AuthProvider>
      <SubscriptionProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* User Routes */}
            <Route path="/my-subscriptions" element={<MySubscriptions />} />
            <Route path="/manage-subscription/:id" element={<ManageSubscription />} />
            <Route path="/browse-plans" element={<BrowsePlans />} />
            <Route path="/usage-stats" element={<UsageStats />} />

            {/* Admin Routes */}
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/manage-plans" element={<ManagePlans />} />
            <Route path="/billing" element={<Billing />} />
            <Route path="/invoices" element={<Invoices />} />

            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </SubscriptionProvider>
    </AuthProvider>
  );
};

export default App;
