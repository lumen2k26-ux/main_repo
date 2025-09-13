// src/App.jsx
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

// Router + auth imports (from dev branch)
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContextProvider";
import { useAuth } from "./hooks/useAuth";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import UserDashboard from "./pages/user/UserDashboard";

// Pavani imports
import AdminDashboard from "./pages/admin/AdminDashboard";
import Recommendations from "./ml/Recommendations";

/*
  Strategy:
  - Keep both implementations.
  - Expose a simple "welcome" page (Pavani's Home) at /welcome (and at / when no auth).
  - Keep auth-based routing (login/register/protected dashboards).
  - If useAuth reports not authenticated and user hits '/', redirect to /welcome (or /login).
*/

// Pavani-style Home (simple Vite+React demo)
function PavaniHome() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((c) => c + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
    </>
  );
}

// Auth-aware Home (from dev branch)
const AuthHome = () => {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated()) {
    // not logged in — send to login (or welcome)
    return <Navigate to="/login" replace />;
  }

  // Redirect to appropriate dashboard based on role
  if (role === "admin") {
    return <Navigate to="/admin/dashboard" replace />;
  } else {
    return <Navigate to="/user/dashboard" replace />;
  }
};

// Top-level App: expose both route sets under AuthProvider
function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Routes>

            {/* Public / Pavani routes */}
            <Route path="/welcome" element={<PavaniHome />} />

            {/* Auth routes (public) */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Home: if auth exists, AuthHome will redirect; otherwise redirect to welcome */}
            <Route
              path="/"
              element={
                // Guard: if useAuth exists and user is authenticated, AuthHome will route to dashboards.
                // If useAuth.isAuthenticated returns false, AuthHome sends to /login
                <AuthHome />
              }
            />

            {/* Protected user/admin dashboards */}
            <Route
              path="/user/dashboard"
              element={
                <ProtectedRoute requiredRole="user">
                  <UserDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* Pavani's admin path (backwards-compatible) */}
            <Route path="/admin" element={<AdminDashboard />} />

            {/* Other pages */}
            <Route path="/recommendations" element={<Recommendations />} />

            {/* Catch-all: send unknown routes to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
