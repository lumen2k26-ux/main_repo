import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { authService } from '../../services/authService';
import './Auth.css';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await authService.login(formData);
      login(response.token, response.role, response.userInfo);
      
      // Navigate based on role
      if (response.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/user/dashboard');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      {/* Left side - App information and spotlight */}
      <div className="auth-info-section">
        <div className="auth-info-content">
          <div className="auth-app-logo"></div>
          <h1 className="auth-app-title">SubManager Pro</h1>
          <p className="auth-app-subtitle">
            Streamline your subscription management with our powerful, 
            intuitive platform designed for modern businesses.
          </p>
          
          <div className="auth-features">
            <div className="auth-feature">
              <div className="auth-feature-icon">📊</div>
              <div className="auth-feature-text">
                Real-time analytics
              </div>
            </div>
            <div className="auth-feature">
              <div className="auth-feature-icon">🔒</div>
              <div className="auth-feature-text">
                Enterprise-grade security
              </div>
            </div>
            <div className="auth-feature">
              <div className="auth-feature-icon">⚡</div>
              <div className="auth-feature-text">
                Lightning-fast performance
              </div>
            </div>
            <div className="auth-feature">
              <div className="auth-feature-icon">🎯</div>
              <div className="auth-feature-text">
                Smart recommendations
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Form section */}
      <div className="auth-form-section">
        <div className="auth-form-content">
          <div className="auth-header">
            <h1 className="auth-title">Welcome Back</h1>
            <p className="auth-subtitle">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="username" className="form-label">
                Username or Email
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter your username or email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              className={`auth-button ${loading ? 'loading' : ''}`}
              disabled={loading}
            >
              {loading ? (
                <span className="button-content">
                  <span className="spinner"></span>
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="auth-footer">
            <p className="auth-link-text">
              Don't have an account?{' '}
              <Link to="/register" className="auth-link">
                Sign up here
              </Link>
            </p>
          </div>

          <div className="demo-credentials">
            <h3>Demo Credentials:</h3>
            <div className="demo-account">
              <strong>Admin:</strong> admin / admin123
            </div>
            <div className="demo-account">
              <strong>User:</strong> user1 / user123
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
