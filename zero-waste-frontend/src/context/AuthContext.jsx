// ========================================
// AUTHENTICATION CONTEXT
// ========================================
// Manages user authentication state across the app

import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../config/api';

// Create context
const AuthContext = createContext();

// ========================================
// AUTH PROVIDER COMPONENT
// ========================================
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on mount
  useEffect(() => {
    checkAuth();
  }, []);

  // ========================================
  // CHECK AUTHENTICATION STATUS
  // ========================================
  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token');
      
      if (token) {
        // Get current user from backend
        const response = await api.get('/auth/me');
        setUser(response.data.data.user);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      // Clear invalid token
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // LOGIN FUNCTION
  // ========================================
  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      
      const { user, token } = response.data.data;
      
      // Save to localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      // Update state
      setUser(user);
      
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed'
      };
    }
  };

  // ========================================
  // REGISTER FUNCTION
  // ========================================
  const register = async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      
      const { user, token } = response.data.data;
      
      // Save to localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      // Update state
      setUser(user);
      
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Registration failed'
      };
    }
  };

  // ========================================
  // LOGOUT FUNCTION
  // ========================================
  const logout = () => {
    // Clear localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Clear state
    setUser(null);
    
    // Redirect to login
    window.location.href = '/login';
  };

  // ========================================
  // CONTEXT VALUE
  // ========================================
  const value = {
    user,
    loading,
    login,
    register,
    logout,
    checkAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// ========================================
// CUSTOM HOOK TO USE AUTH CONTEXT
// ========================================
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  
  return context;
};
