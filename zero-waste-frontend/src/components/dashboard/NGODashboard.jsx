// ========================================
// FOODFLOW - NGO DASHBOARD (MODERN UI)
// ========================================

import React, { useState, useEffect } from 'react';
import api, { getImageUrl } from '../../config/api';
import TrackingMap from '../TrackingMap';
import StaticMap from '../StaticMap';

const NGODashboard = () => {
  const [availableFood, setAvailableFood] = useState([]);
  const [myDeliveries, setMyDeliveries] = useState([]);
  const [activeTab, setActiveTab] = useState('available');
  const [trackingDelivery, setTrackingDelivery] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchAvailableFood();
    fetchMyDeliveries();
  }, []);

  const fetchAvailableFood = async () => {
    try {
      const response = await api.get('/food');
      setAvailableFood(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMyDeliveries = async () => {
    try {
      const response = await api.get('/delivery/ngo');
      setMyDeliveries(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAcceptFood = async (foodId) => {
    if (!window.confirm('Accept this food donation?')) return;

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await api.post(`/delivery/accept-food/${foodId}`);
      setSuccess('✅ Food accepted successfully!');
      fetchAvailableFood();
      fetchMyDeliveries();
      setActiveTab('myDeliveries');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to accept.');
    }

    setLoading(false);
  };

  const handleTrack = (delivery) => {
    setTrackingDelivery(delivery);
  };

  const handleStopTracking = () => {
    setTrackingDelivery(null);
  };

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div className="gradient-header">
        <h2 className="text-2xl font-bold">NGO Dashboard</h2>
        <p className="text-sm opacity-90">
          View donations, manage deliveries, and track logistics
        </p>
      </div>

      {/* ALERTS */}
      {error && (
        <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-xl">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-emerald-100 border border-emerald-300 text-emerald-700 px-4 py-3 rounded-xl">
          {success}
        </div>
      )}

      {/* TABS */}
      <div className="flex space-x-6 border-b border-gray-200">
        {['available', 'myDeliveries'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-4 px-2 font-semibold transition ${
              activeTab === tab
                ? 'border-b-4 border-primary text-primary'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            {tab === 'available'
              ? `Available Food (${availableFood.length})`
              : `My Deliveries (${myDeliveries.length})`}
          </button>
        ))}
      </div>

      {/* AVAILABLE FOOD */}
      {activeTab === 'available' && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

          {availableFood.length === 0 ? (
            <div className="col-span-full text-center py-16 card">
              <h3 className="text-lg font-semibold text-gray-700">
                No available food 🍽️
              </h3>
            </div>
          ) : (
            availableFood.map((food) => (
              <div key={food._id} className="card hover:scale-[1.02]">

                <img
                  src={getImageUrl(food.imagePath)}
                  alt={food.title}
                  className="w-full h-52 object-cover rounded-xl mb-4"
                />

                <h4 className="text-lg font-bold text-gray-800">
                  {food.title}
                </h4>

                <span className="px-3 py-1 text-xs rounded-full bg-emerald-100 text-emerald-700">
                  {food.category}
                </span>

                <p className="text-sm text-gray-600 mt-2">
                  {food.description}
                </p>

                <p className="text-sm mt-2">
                  <strong>Quantity:</strong> {food.quantity}
                </p>

                <p className="text-sm">
                  <strong>Location:</strong> {food.pickupLocation}
                </p>

                <p className="text-sm mb-4">
                  <strong>Donor:</strong> {food.donorId?.name}
                </p>

                <div className="mb-4 rounded-xl overflow-hidden">
                  <StaticMap
                    latitude={food.latitude}
                    longitude={food.longitude}
                    locationName={food.pickupLocation}
                  />
                </div>

                <button
                  onClick={() => handleAcceptFood(food._id)}
                  disabled={loading}
                  className="w-full btn btn-primary"
                >
                  Accept Food
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {/* MY DELIVERIES */}
      {activeTab === 'myDeliveries' && (
        <div className="space-y-6">

          {myDeliveries.length === 0 ? (
            <div className="text-center py-16 card">
              <h3 className="text-lg font-semibold text-gray-700">
                No deliveries yet 🚚
              </h3>
            </div>
          ) : (
            myDeliveries.map((delivery) => (
              <div key={delivery._id} className="card">

                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-lg font-bold">
                      {delivery.foodId?.title}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {delivery.foodId?.category}
                    </p>
                  </div>

                  <span className={`px-3 py-1 text-xs rounded-full ${
                    delivery.status === 'Unassigned'
                      ? 'bg-gray-100 text-gray-700'
                      : delivery.status === 'Assigned'
                      ? 'bg-yellow-100 text-yellow-700'
                      : delivery.status === 'In Progress'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    {delivery.status}
                  </span>
                </div>

                <div className="grid md:grid-cols-2 gap-4 text-sm mb-4">
                  <div>
                    <strong>Donor:</strong> {delivery.donorId?.name}
                  </div>
                  <div>
                    <strong>Partner:</strong>{' '}
                    {delivery.deliveryPartnerId?.name || 'Not assigned'}
                  </div>
                  <div>
                    <strong>Pickup:</strong> {delivery.foodId?.pickupLocation}
                  </div>
                  <div>
                    <strong>OTP:</strong>{' '}
                    <span className="text-primary font-bold">
                      {delivery.otp}
                    </span>
                  </div>
                </div>

                <div className="mb-4 rounded-xl overflow-hidden">
                  <StaticMap
                    latitude={delivery.foodId?.latitude}
                    longitude={delivery.foodId?.longitude}
                    locationName={delivery.foodId?.pickupLocation}
                  />
                </div>

                {delivery.status === 'In Progress' && (
                  <button
                    onClick={() => handleTrack(delivery)}
                    className="w-full btn btn-secondary"
                  >
                    📍 Track Delivery
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* TRACKING MODAL */}
      {trackingDelivery && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden">

            <div className="p-6 border-b flex justify-between items-center">
              <h3 className="text-xl font-bold">Live Tracking</h3>
              <button
                onClick={handleStopTracking}
                className="text-gray-500 hover:text-gray-800 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-3 text-sm">
              <p><strong>Food:</strong> {trackingDelivery.foodId?.title}</p>
              <p><strong>Partner:</strong> {trackingDelivery.deliveryPartnerId?.name}</p>
              <p>
                <strong>OTP:</strong>{' '}
                <span className="text-primary font-bold">
                  {trackingDelivery.otp}
                </span>
              </p>
            </div>

            <div className="h-96">
              <TrackingMap delivery={trackingDelivery} />
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default NGODashboard;
