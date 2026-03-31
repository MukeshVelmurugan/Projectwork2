// ========================================
// REIMAGINED NAVBAR (PREMIUM GLASSMORPHIC)
// ========================================

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full top-0 z-50 transition-all duration-300 bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-3 group relative overflow-hidden px-2 py-1 rounded-xl">
            <span className="text-3xl transform group-hover:scale-110 transition-transform duration-300 z-10">🌱</span>
            <h1 className="text-2xl font-black tracking-tight text-slate-800 font-display z-10">
              Zero <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Waste</span>
            </h1>
            <div className="absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0 rounded-xl"></div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">

            {/* User Profile Card - Glassmorphic */}
            <div className="flex items-center space-x-4 bg-white/50 border border-white/60 hover:bg-white/80 transition-colors shadow-sm px-5 py-2.5 rounded-2xl cursor-default">
              <div className="w-10 h-10 bg-gradient-to-tr from-primary to-secondary text-white rounded-full flex items-center justify-center font-bold text-lg shadow-md ring-2 ring-white">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="flex flex-col">
                <p className="text-sm font-bold text-slate-800 leading-tight">
                  {user?.name || 'User'}
                </p>
                <div className="flex items-center space-x-1.5 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                  <p className="text-xs font-medium text-slate-500 capitalize tracking-wide">
                    {user?.role || 'Role'}
                  </p>
                </div>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={logout}
              className="px-5 py-2.5 text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all duration-300"
            >
              Sign Out
            </button>
          </div>

          {/* Mobile Menu Button - Hamburger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 focus:outline-none transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`md:hidden absolute w-full bg-white/95 backdrop-blur-3xl border-b border-slate-100 shadow-xl overflow-hidden transition-all duration-300 ease-in-out ${menuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
          }`}
      >
        <div className="px-5 py-6 space-y-6">
          <div className="flex items-center space-x-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <div className="w-12 h-12 bg-gradient-to-tr from-primary to-secondary text-white rounded-full flex items-center justify-center font-bold text-xl shadow-inner">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div>
              <p className="font-bold text-slate-800 text-lg">
                {user?.name || 'User'}
              </p>
              <p className="text-sm font-medium text-primary capitalize mt-0.5">
                {user?.role || 'Role'}
              </p>
            </div>
          </div>

          <button
            onClick={logout}
            className="w-full py-3.5 px-4 text-center font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-colors flex justify-center items-center space-x-2"
          >
            <span>Sign Out</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
