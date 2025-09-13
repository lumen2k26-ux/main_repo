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
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App;
