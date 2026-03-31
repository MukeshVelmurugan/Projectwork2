// ========================================
// DASHBOARD PAGE (REIMAGINED LAYOUT)
// ========================================
// Main dashboard with role-based sections

import React from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';

// Import role-specific components
import DonorDashboard from '../components/dashboard/DonorDashboard';
import NGODashboard from '../components/dashboard/NGODashboard';
import DeliveryPartnerDashboard from '../components/dashboard/DeliveryPartnerDashboard';
import AdminDashboard from '../components/dashboard/AdminDashboard';

const Dashboard = () => {
  const { user } = useAuth();

  // Render dashboard based on user role
  const renderDashboard = () => {
    switch (user?.role) {
      case 'Donor':
        return <DonorDashboard />;
      case 'NGO':
        return <NGODashboard />;
      case 'Delivery Partner':
        return <DeliveryPartnerDashboard />;
      case 'Admin':
        return <AdminDashboard />;
      default:
        return (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-24 h-24 mb-6 rounded-full bg-slate-100 flex items-center justify-center text-4xl shadow-inner">
              ⚠️
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2 font-display">Access Restricted</h3>
            <p className="text-slate-500 max-w-md">We couldn't determine your account role. Please contact support or try logging in again.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-20 flex flex-col items-center selection:bg-primary/20 selection:text-primary-dark">
      <Navbar />

      {/* Decorative Background Elements */}
      <div className="fixed top-0 left-0 w-full h-96 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none z-0"></div>
      <div className="fixed -top-40 -right-40 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none z-0"></div>
      <div className="fixed top-40 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none z-0"></div>

      {/* Main Content Container */}
      <main className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative z-10 flex-1">

        {/* Welcome Hero Area */}
        <div className="mb-10 animate-slide-down">
          <div className="bg-white/80 backdrop-blur-xl border border-white shadow-soft-xl rounded-3xl p-8 md:p-10 relative overflow-hidden">
            {/* Colorful accent blob behind text */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <div className="inline-flex items-center space-x-2 px-3 py-1 bg-primary/10 text-primary-dark rounded-full text-sm font-semibold tracking-wide mb-4">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  <span>Active Dashboard</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 font-display mb-2">
                  Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">{user?.name}</span>! 👋
                </h2>
                <p className="text-slate-500 text-lg">
                  Here's what's happening in your <span className="font-semibold text-slate-700">{user?.role}</span> workspace today.
                </p>
              </div>

              {/* Stats/Quick Actions Placeholder space - optional, makes it look premium */}
              <div className="hidden lg:flex items-center space-x-4">
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-center min-w-[120px]">
                  <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">Status</p>
                  <p className="text-primary-dark font-bold">Online</p>
                </div>
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-center min-w-[120px]">
                  <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">Date</p>
                  <p className="text-slate-800 font-bold">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Role-based Dashboard Components Space */}
        <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
          {renderDashboard()}
        </div>

      </main>

      {/* Simple Footer just to anchor the page cleanly */}
      <footer className="w-full py-8 mt-auto relative z-10 text-center text-sm text-slate-400">
        <p>© {new Date().getFullYear()} Zero Waste Initiative. Making the world a better place.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
