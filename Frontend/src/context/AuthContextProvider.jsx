import { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [role, setRole] = useState(localStorage.getItem('role') || null);
  const [userInfo, setUserInfo] = useState(() => {
    const stored = localStorage.getItem('userInfo');
    return stored ? JSON.parse(stored) : null;
  });

  // Update localStorage whenever state changes
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  useEffect(() => {
    if (role) {
      localStorage.setItem('role', role);
    } else {
      localStorage.removeItem('role');
    }
  }, [role]);

  useEffect(() => {
    if (userInfo) {
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
    } else {
      localStorage.removeItem('userInfo');
    }
  }, [userInfo]);

  const login = (token, role, userInfo) => {
    setToken(token);
    setRole(role);
    setUserInfo(userInfo);
  };

  const logout = () => {
    setToken(null);
    setRole(null);
    setUserInfo(null);
    localStorage.clear();
  };

  const isAuthenticated = () => {
    return !!token;
  };

  const isAdmin = () => {
    return role === 'admin';
  };

  const isUser = () => {
    return role === 'user';
  };

  const value = {
    token,
    role,
    userInfo,
    login,
    logout,
    isAuthenticated,
    isAdmin,
    isUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

