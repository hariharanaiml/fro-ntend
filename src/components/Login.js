import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import Register from './Register';
import { userAPI } from '../services/api';

function Login({ onLogin }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showRegister, setShowRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await userAPI.login(formData);
      localStorage.setItem('user', JSON.stringify(response.user));
      onLogin();
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
      if (error.message.includes('400')) {
        alert('Invalid email or password. Please check your credentials.');
      } else {
        alert('Login failed. Please make sure the server is running.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (showRegister) {
    return <Register onSwitchToLogin={() => setShowRegister(false)} />;
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>🎡 Welcome Back</h2>
        <p className="subtitle">Login to WONDER-BLACK</p>
        
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          
          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        <div className="switch-text">
          Don't have an account?{' '}
          <span onClick={() => setShowRegister(true)}>
            Register here
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;