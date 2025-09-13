import React from 'react';
import { CreditCard, FileText, TrendingUp, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: CreditCard,
      title: 'Billing Management',
      description: 'Manage your subscription, payment methods, and billing preferences',
      path: '/billing',
      color: '#2563eb'
    },
    {
      icon: FileText,
      title: 'Invoice History',
      description: 'View, download, and manage all your invoices and billing history',
      path: '/invoices',
      color: '#059669'
    },
    {
      icon: TrendingUp,
      title: 'Usage Analytics',
      description: 'Track your usage patterns and optimize your subscription',
      path: '/usage',
      color: '#dc2626'
    },
    {
      icon: Shield,
      title: 'Account Security',
      description: 'Manage your account security and privacy settings',
      path: '/security',
      color: '#7c3aed'
    }
  ];

  return (
    <div className="home-container">
      <div className="home-header">
        <h1>Subscription Management Dashboard</h1>
        <p>Manage your subscriptions, billing, and account preferences all in one place</p>
      </div>

      <div className="features-grid">
        {features.map((feature, index) => {
          const IconComponent = feature.icon;
          return (
            <div 
              key={index} 
              className="feature-card"
              onClick={() => navigate(feature.path)}
            >
              <div className="feature-icon" style={{ backgroundColor: `${feature.color}15` }}>
                <IconComponent 
                  className="icon" 
                  style={{ color: feature.color }}
                />
              </div>
              <div className="feature-content">
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
              <div className="feature-arrow">
                →
              </div>
            </div>
          );
        })}
      </div>

      <div className="quick-stats">
        <div className="stat-card">
          <div className="stat-value">$29.99</div>
          <div className="stat-label">Current Plan</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">15</div>
          <div className="stat-label">Days Until Renewal</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">12</div>
          <div className="stat-label">Total Invoices</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">Active</div>
          <div className="stat-label">Subscription Status</div>
        </div>
      </div>
    </div>
  );
};

export default Home;