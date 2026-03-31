// ========================================
// ADMIN DASHBOARD
// ========================================
// View analytics, manage users, view all data

import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import api from '../../config/api';
import StaticMap from '../StaticMap';

// Register Chart.js components
ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminDashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('analytics');

  useEffect(() => {
    fetchAnalytics();
    fetchUsers();
  }, []);

  // ========================================
  // FETCH ANALYTICS
  // ========================================
  const fetchAnalytics = async () => {
    try {
      const response = await api.get('/admin/analytics');
      setAnalytics(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching analytics:', error);
      setLoading(false);
    }
  };

  // ========================================
  // FETCH USERS
  // ========================================
  const fetchUsers = async () => {
    try {
      const response = await api.get('/admin/users');
      setUsers(response.data.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="spinner"></div>
      </div>
    );
  }

  // ========================================
  // CHART DATA
  // ========================================

  // Users by Role - Pie Chart
  const usersChartData = {
    labels: ['Donors', 'NGOs', 'Delivery Partners', 'Admins'],
    datasets: [
      {
        label: 'Users',
        data: [
          analytics?.usersByRole?.donors || 0,
          analytics?.usersByRole?.ngos || 0,
          analytics?.usersByRole?.deliveryPartners || 0,
          analytics?.usersByRole?.admins || 0
        ],
        backgroundColor: ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'],
        borderWidth: 1
      }
    ]
  };

  // Food by Category - Bar Chart
  const foodCategoryData = {
    labels: ['Human Consumption', 'Cattle Feed', 'Biogas / Compost'],
    datasets: [
      {
        label: 'Total Food Posts',
        data: [
          analytics?.foodByCategory?.humanConsumption || 0,
          analytics?.foodByCategory?.cattleFeed || 0,
          analytics?.foodByCategory?.biogas || 0
        ],
        backgroundColor: '#10b981'
      }
    ]
  };

  // Completed Deliveries by Category - Bar Chart
  const completedDeliveriesData = {
    labels: ['Human Consumption', 'Cattle Feed', 'Biogas / Compost'],
    datasets: [
      {
        label: 'Completed Deliveries',
        data: [
          analytics?.completedDeliveriesByCategory?.humanConsumption || 0,
          analytics?.completedDeliveriesByCategory?.cattleFeed || 0,
          analytics?.completedDeliveriesByCategory?.biogas || 0
        ],
        backgroundColor: '#3b82f6'
      }
    ]
  };

  // Deliveries by Status - Pie Chart
  const deliveryStatusData = {
    labels: ['Unassigned', 'Assigned', 'In Progress', 'Completed'],
    datasets: [
      {
        label: 'Deliveries',
        data: [
          analytics?.deliveriesByStatus?.unassigned || 0,
          analytics?.deliveriesByStatus?.assigned || 0,
          analytics?.deliveriesByStatus?.inProgress || 0,
          analytics?.deliveriesByStatus?.completed || 0
        ],
        backgroundColor: ['#9ca3af', '#f59e0b', '#3b82f6', '#10b981'],
        borderWidth: 1
      }
    ]
  };

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex space-x-4 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('analytics')}
          className={`pb-4 px-4 font-medium ${
            activeTab === 'analytics'
              ? 'border-b-2 border-primary text-primary'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          📊 Analytics
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`pb-4 px-4 font-medium ${
            activeTab === 'users'
              ? 'border-b-2 border-primary text-primary'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          👥 Users ({users.length})
        </button>
      </div>

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card bg-gradient-to-br from-green-50 to-green-100">
              <p className="text-sm text-gray-600 mb-1">Total Users</p>
              <p className="text-3xl font-bold text-green-700">
                {analytics?.overview?.totalUsers || 0}
              </p>
            </div>
            <div className="card bg-gradient-to-br from-blue-50 to-blue-100">
              <p className="text-sm text-gray-600 mb-1">Total Food Posts</p>
              <p className="text-3xl font-bold text-blue-700">
                {analytics?.overview?.totalFood || 0}
              </p>
            </div>
            <div className="card bg-gradient-to-br from-yellow-50 to-yellow-100">
              <p className="text-sm text-gray-600 mb-1">Total Deliveries</p>
              <p className="text-3xl font-bold text-yellow-700">
                {analytics?.overview?.totalDeliveries || 0}
              </p>
            </div>
            <div className="card bg-gradient-to-br from-purple-50 to-purple-100">
              <p className="text-sm text-gray-600 mb-1">Completed Deliveries</p>
              <p className="text-3xl font-bold text-purple-700">
                {analytics?.overview?.completedDeliveries || 0}
              </p>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Users by Role */}
            <div className="card">
              <h4 className="text-lg font-semibold mb-4">Users by Role</h4>
              <div className="h-64 flex items-center justify-center">
                <Pie data={usersChartData} options={{ maintainAspectRatio: false }} />
              </div>
            </div>

            {/* Deliveries by Status */}
            <div className="card">
              <h4 className="text-lg font-semibold mb-4">Deliveries by Status</h4>
              <div className="h-64 flex items-center justify-center">
                <Pie data={deliveryStatusData} options={{ maintainAspectRatio: false }} />
              </div>
            </div>

            {/* Food by Category */}
            <div className="card">
              <h4 className="text-lg font-semibold mb-4">Food Posts by Category</h4>
              <div className="h-64">
                <Bar 
                  data={foodCategoryData} 
                  options={{ 
                    maintainAspectRatio: false,
                    scales: { y: { beginAtZero: true } }
                  }} 
                />
              </div>
            </div>

            {/* Completed Deliveries by Category */}
            <div className="card">
              <h4 className="text-lg font-semibold mb-4">Completed Deliveries by Category</h4>
              <div className="h-64">
                <Bar 
                  data={completedDeliveriesData} 
                  options={{ 
                    maintainAspectRatio: false,
                    scales: { y: { beginAtZero: true } }
                  }} 
                />
              </div>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="card">
            <h4 className="text-lg font-semibold mb-4">Recent Deliveries</h4>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Food</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Category</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Donor</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">NGO</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Partner</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {analytics?.recentActivities?.slice(0, 10).map((activity) => (
                    <tr key={activity._id}>
                      <td className="px-4 py-2 text-sm">{activity.foodId?.title}</td>
                      <td className="px-4 py-2 text-sm">{activity.foodId?.category}</td>
                      <td className="px-4 py-2 text-sm">{activity.donorId?.name}</td>
                      <td className="px-4 py-2 text-sm">{activity.ngoId?.name}</td>
                      <td className="px-4 py-2 text-sm">{activity.deliveryPartnerId?.name || 'N/A'}</td>
                      <td className="px-4 py-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          activity.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          activity.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                          activity.status === 'Assigned' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {activity.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Users Tab */}
      {activeTab === 'users' && (
        <div className="card">
          <h4 className="text-lg font-semibold mb-4">All Users</h4>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Name</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Email</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Role</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user._id}>
                    <td className="px-4 py-2 text-sm font-medium">{user.name}</td>
                    <td className="px-4 py-2 text-sm text-gray-600">{user.email}</td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.role === 'Donor' ? 'bg-green-100 text-green-800' :
                        user.role === 'NGO' ? 'bg-blue-100 text-blue-800' :
                        user.role === 'Delivery Partner' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-600">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
