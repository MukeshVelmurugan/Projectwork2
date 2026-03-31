// ========================================
// REIMAGINED REGISTER PAGE
// ========================================

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'Donor'
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
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    // Call register function
    const result = await register({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role
    });

    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-surface flex flex-row-reverse animate-fade-in font-sans">

      {/* RIGHT SIDE - Hero Image & Branding */}
      <div className="hidden lg:flex w-5/12 relative overflow-hidden bg-secondary-dark">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&q=80&w=1600"
            alt="Community sharing food"
            className="w-full h-full object-cover opacity-60 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80"></div>
        </div>

        <div className="relative z-10 w-full h-full flex flex-col justify-between p-16 text-white">
          <div className="flex justify-end items-center space-x-3 w-full">
            <h1 className="text-2xl font-bold tracking-tight font-display">Zero Waste</h1>
            <span className="text-3xl">🌱</span>
          </div>

          <div className="mb-12 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-4xl font-bold mb-4 leading-tight font-display">
              Be the change.<br /><span className="text-secondary-light">Join the movement.</span>
            </h2>
            <div className="space-y-4 text-gray-200 font-light text-sm">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">🏢</div>
                <p>Register as a Donor to share excess food</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">❤️</div>
                <p>Register as an NGO to distribute to those in need</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">🚚</div>
                <p>Register as a Partner to connect the dots</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LEFT SIDE - Register Form */}
      <div className="w-full lg:w-7/12 flex items-center justify-center p-8 sm:p-12 lg:p-16 bg-mesh relative overflow-y-auto">
        <div className="w-full max-w-lg space-y-8 animate-slide-up relative z-10 py-10">

          <div className="text-left">
            <h2 className="text-4xl font-bold text-gray-900 mb-2 font-display">Create Account</h2>
            <p className="text-gray-500">Join our community today.</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50/80 backdrop-blur-sm border-l-4 border-red-500 text-red-700 p-4 rounded-r-lg shadow-sm animate-fade-in">
              <p className="font-medium text-sm">{error}</p>
            </div>
          )}

          {/* Register Form */}
          <form onSubmit={handleSubmit} className="space-y-5 mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2 relative group col-span-1 md:col-span-2">
                <label className="text-sm font-semibold text-gray-700 transition-colors group-focus-within:text-secondary">Full Name / Organization</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-5 py-4 bg-white/60 backdrop-blur-md border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all duration-300 shadow-sm"
                  placeholder="John Doe"
                  disabled={loading}
                />
              </div>

              <div className="space-y-2 relative group col-span-1 md:col-span-2">
                <label className="text-sm font-semibold text-gray-700 transition-colors group-focus-within:text-secondary">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-5 py-4 bg-white/60 backdrop-blur-md border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all duration-300 shadow-sm"
                  placeholder="you@example.com"
                  disabled={loading}
                />
              </div>

              <div className="space-y-2 relative group col-span-1 md:col-span-2">
                <label className="text-sm font-semibold text-gray-700 transition-colors group-focus-within:text-secondary">I want to register as</label>
                <div className="relative">
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full px-5 py-4 bg-white/60 backdrop-blur-md border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all duration-300 shadow-sm appearance-none"
                    disabled={loading}
                  >
                    <option value="Donor">Donor (Post food for redistribution)</option>
                    <option value="NGO">NGO (Accept and receive donations)</option>
                    <option value="Delivery Partner">Delivery Partner (Deliver to NGOs)</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-5 text-gray-500">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
              </div>

              <div className="space-y-2 relative group">
                <label className="text-sm font-semibold text-gray-700 transition-colors group-focus-within:text-secondary">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-5 py-4 bg-white/60 backdrop-blur-md border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all duration-300 shadow-sm"
                  placeholder="••••••••"
                  disabled={loading}
                />
              </div>

              <div className="space-y-2 relative group">
                <label className="text-sm font-semibold text-gray-700 transition-colors group-focus-within:text-secondary">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-5 py-4 bg-white/60 backdrop-blur-md border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all duration-300 shadow-sm"
                  placeholder="••••••••"
                  disabled={loading}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 py-4 px-6 text-white font-semibold rounded-2xl bg-gradient-to-r from-secondary to-primary hover:from-secondary-dark hover:to-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary shadow-lg hover:shadow-glow transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Creating Account...</span>
                </div>
              ) : (
                <span>Join Now</span>
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="pt-6 text-center">
            <p className="text-gray-500">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-secondary hover:text-secondary-dark transition-colors">
                Sign in here
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Register;
