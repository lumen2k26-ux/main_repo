import React from 'react';
import { ArrowLeft, Home, CreditCard, FileText } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    navigate(-1);
  };

  const handleHome = () => {
    navigate('/');
  };

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/billing':
        return 'Billing & Subscriptions';
      case '/invoices':
        return 'Invoice History';
      default:
        return 'Subscription Management';
    }
  };

  const showBackButton = location.pathname !== '/';

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          {showBackButton && (
            <button className="nav-btn back-btn" onClick={handleBack}>
              <ArrowLeft className="nav-icon" />
              Back
            </button>
          )}
          <h1 className="page-title">{getPageTitle()}</h1>
        </div>
        
        <div className="navbar-right">
          <button 
            className={`nav-btn ${location.pathname === '/' ? 'active' : ''}`}
            onClick={handleHome}
          >
            <Home className="nav-icon" />
            Home
          </button>
          <button 
            className={`nav-btn ${location.pathname === '/billing' ? 'active' : ''}`}
            onClick={() => navigate('/billing')}
          >
            <CreditCard className="nav-icon" />
            Billing
          </button>
          <button 
            className={`nav-btn ${location.pathname === '/invoices' ? 'active' : ''}`}
            onClick={() => navigate('/invoices')}
          >
            <FileText className="nav-icon" />
            Invoices
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;