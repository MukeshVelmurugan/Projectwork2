// ========================================
// REIMAGINED LOGIN PAGE
// ========================================

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Clear error on input
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validate inputs
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    // Call login function
    const result = await login(formData.email, formData.password);

    if (result.success) {
      // Redirect to dashboard
      navigate('/dashboard');
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-surface flex animate-fade-in font-sans">

      {/* LEFT SIDE - Hero Image & Branding */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-primary-dark">
        <div className="absolute inset-0 z-0">
          {/* <img
          src="https://source.unsplash.com/featured/?food,healthy"
          alt="Healthy fresh food"
          className="w-full h-full object-cover opacity-60 mix-blend-overlay"
        /> */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
        </div>

        <div className="relative z-10 w-full h-full flex flex-col justify-between p-16 text-white">
          <div className="flex items-center space-x-3">
            <span className="text-5xl">🌱</span>
            <h1 className="text-5xl font-bold tracking-tight font-display">Zero Waste</h1>
          </div>

          <div className="mb-12 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-5xl font-bold mb-6 leading-tight font-display">
              Rescue food.<br /><span className="text-primary-light">Empower communities.</span>
            </h2>
            <p className="text-lg text-gray-200 max-w-md font-light">
              Join our network of donors, NGOs, and delivery partners building a sustainable future without food waste.
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 bg-mesh relative">
        <div className="w-full max-w-md space-y-8 animate-slide-up relative z-10">

          <div className="text-center lg:text-left">
            <h2 className="text-4xl font-bold text-gray-900 mb-2 font-display">Welcome Back</h2>
            <p className="text-gray-500">Sign in to continue your impact.</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50/80 backdrop-blur-sm border-l-4 border-red-500 text-red-700 p-4 rounded-r-lg shadow-sm animate-fade-in">
              <p className="font-medium text-sm">{error}</p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6 mt-8">
            <div className="space-y-2 relative group">
              <label className="text-sm font-semibold text-gray-700 transition-colors group-focus-within:text-primary">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-5 py-4 bg-white/60 backdrop-blur-md border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 shadow-sm"
                placeholder="you@example.com"
                disabled={loading}
              />
            </div>

            <div className="space-y-2 relative group">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-gray-700 transition-colors group-focus-within:text-primary">Password</label>
                <a href="#" className="text-sm font-medium text-primary hover:text-primary-dark transition-colors">Forgot password?</a>
              </div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-5 py-4 bg-white/60 backdrop-blur-md border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 shadow-sm"
                placeholder="••••••••"
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 px-6 text-white font-semibold rounded-2xl bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary shadow-lg hover:shadow-glow transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Authenticating...</span>
                </div>
              ) : (
                <span>Sign In</span>
              )}
            </button>
          </form>

          {/* Register Link */}
          <div className="pt-6 text-center">
            <p className="text-gray-500">
              New to Zero Waste?{' '}
              <Link to="/register" className="font-semibold text-primary hover:text-primary-dark transition-colors">
                Create an account
              </Link>
            </p>
          </div>

          {/* Demo Credentials Alert - Styled nicely */}
          {/* <div className="mt-8 bg-blue-50/50 backdrop-blur-sm border border-blue-100 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center space-x-3 text-blue-800 mb-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <h4 className="font-semibold text-sm">Demo Access</h4>
            </div>
            <p className="text-sm text-blue-700/80 font-mono bg-white/50 inline-block px-3 py-1 rounded-md">
              admin@gmail.com <span className="text-gray-400 mx-1">/</span> 123456
            </p>
          </div> */}

        </div>
      </div>
    </div>
  );
};

export default Login;
