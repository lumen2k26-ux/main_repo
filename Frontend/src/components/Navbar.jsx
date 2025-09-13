// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ user, isAdmin, logout }) => {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <Link to="/" className="font-bold text-xl">
          SubManage
        </Link>
        {user && !isAdmin && (
          <>
            <Link to="/plans" className="hover:underline">
              Browse Plans
            </Link>
            <Link to="/subscriptions" className="hover:underline">
              My Subscriptions
            </Link>
          </>
        )}
        {isAdmin && (
          <>
            <Link to="/admin/dashboard" className="hover:underline">
              Dashboard
            </Link>
            <Link to="/admin/manage-plans" className="hover:underline">
              Manage Plans
            </Link>
          </>
        )}
      </div>
      <div>
        {user ? (
          <button
            onClick={logout}
            className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-200"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-200"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
