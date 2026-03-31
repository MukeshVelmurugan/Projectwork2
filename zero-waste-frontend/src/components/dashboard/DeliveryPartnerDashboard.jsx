// ========================================
// FOODFLOW - DELIVERY PARTNER DASHBOARD
// ========================================

import React, { useState, useEffect, useRef } from 'react';
import api from '../../config/api';
import StaticMap from '../StaticMap';

const DeliveryPartnerDashboard = () => {
  const [unassignedDeliveries, setUnassignedDeliveries] = useState([]);
  const [myDeliveries, setMyDeliveries] = useState([]);
  const [activeTab, setActiveTab] = useState('unassigned');
  const [trackingDeliveryId, setTrackingDeliveryId] = useState(null);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const watchIdRef = useRef(null);

  useEffect(() => {
    fetchUnassignedDeliveries();
    fetchMyDeliveries();
  }, []);

  const fetchUnassignedDeliveries = async () => {
    try {
      const response = await api.get('/delivery/unassigned');
      setUnassignedDeliveries(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMyDeliveries = async () => {
    try {
      const response = await api.get('/delivery/partner');
      setMyDeliveries(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAcceptDelivery = async (deliveryId) => {
    if (!window.confirm('Accept this delivery task?')) return;

    try {
      await api.post(`/delivery/accept/${deliveryId}`);
      setSuccess('🚚 Delivery accepted!');
      fetchUnassignedDeliveries();
      fetchMyDeliveries();
      setActiveTab('myDeliveries');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to accept.');
    }
  };

  const handleStartDelivery = async (deliveryId) => {
    try {
      await api.post(`/delivery/start/${deliveryId}`);
      setSuccess('🚀 Delivery started!');
      setTrackingDeliveryId(deliveryId);

      if (navigator.geolocation) {
        watchIdRef.current = navigator.geolocation.watchPosition(
          (position) => {
            sendLocationUpdate(
              deliveryId,
              position.coords.latitude,
              position.coords.longitude
            );
          },
          () => setError('Please enable GPS.'),
          { enableHighAccuracy: true }
        );
      }

      fetchMyDeliveries();
    } catch (error) {
      setError(error.response?.data?.message || 'Start failed.');
    }
  };

  const sendLocationUpdate = async (deliveryId, latitude, longitude) => {
    try {
      await api.post(`/delivery/update-location/${deliveryId}`, {
        latitude,
        longitude
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleCompleteDelivery = async (deliveryId) => {
    if (!otp || otp.length !== 4) {
      setError('Enter valid 4-digit OTP.');
      return;
    }

    try {
      await api.post(`/delivery/complete/${deliveryId}`, { otp });
      setSuccess('🎉 Delivery completed!');
      setOtp('');

      if (watchIdRef.current) {
        navigator.geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }

      setTrackingDeliveryId(null);
      fetchMyDeliveries();
    } catch (error) {
      setError(error.response?.data?.message || 'Invalid OTP.');
    }
  };

  useEffect(() => {
    return () => {
      if (watchIdRef.current) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, []);

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div className="gradient-header">
        <h2 className="text-2xl font-bold">Delivery Partner Dashboard</h2>
        <p className="text-sm opacity-90">
          Manage delivery tasks and track in real time
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
        {['unassigned', 'myDeliveries'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-4 px-2 font-semibold transition ${
              activeTab === tab
                ? 'border-b-4 border-primary text-primary'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            {tab === 'unassigned'
              ? `Available Tasks (${unassignedDeliveries.length})`
              : `My Deliveries (${myDeliveries.length})`}
          </button>
        ))}
      </div>

      {/* UNASSIGNED */}
      {activeTab === 'unassigned' && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {unassignedDeliveries.length === 0 ? (
            <div className="col-span-full text-center py-16 card">
              <h3 className="text-lg font-semibold text-gray-700">
                No available tasks 🚚
              </h3>
            </div>
          ) : (
            unassignedDeliveries.map((delivery) => (
              <div key={delivery._id} className="card hover:scale-[1.02]">

                <h4 className="text-lg font-bold mb-2">
                  {delivery.foodId?.title}
                </h4>

                <span className="px-3 py-1 text-xs rounded-full bg-emerald-100 text-emerald-700">
                  {delivery.foodId?.category}
                </span>

                <div className="mt-4 text-sm space-y-2">
                  <p><strong>Donor:</strong> {delivery.donorId?.name}</p>
                  <p><strong>NGO:</strong> {delivery.ngoId?.name}</p>
                  <p><strong>Location:</strong> {delivery.foodId?.pickupLocation}</p>
                  <p><strong>Quantity:</strong> {delivery.foodId?.quantity}</p>
                </div>

                <div className="mt-4 rounded-xl overflow-hidden">
                  <StaticMap
                    latitude={delivery.foodId?.latitude}
                    longitude={delivery.foodId?.longitude}
                    locationName={delivery.foodId?.pickupLocation}
                  />
                </div>

                <button
                  onClick={() => handleAcceptDelivery(delivery._id)}
                  className="w-full btn btn-primary mt-4"
                >
                  Accept Delivery
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
                No deliveries yet
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
                    delivery.status === 'Assigned'
                      ? 'bg-yellow-100 text-yellow-700'
                      : delivery.status === 'In Progress'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    {delivery.status}
                  </span>
                </div>

                <p className="text-sm mb-2">
                  <strong>Pickup:</strong> {delivery.foodId?.pickupLocation}
                </p>

                <div className="rounded-xl overflow-hidden mb-4">
                  <StaticMap
                    latitude={delivery.foodId?.latitude}
                    longitude={delivery.foodId?.longitude}
                    locationName={delivery.foodId?.pickupLocation}
                  />
                </div>

                {/* START */}
                {delivery.status === 'Assigned' && (
                  <button
                    onClick={() => handleStartDelivery(delivery._id)}
                    className="w-full btn btn-primary"
                  >
                    🚀 Start Delivery
                  </button>
                )}

                {/* IN PROGRESS */}
                {delivery.status === 'In Progress' && (
                  <div className="space-y-4">

                    {trackingDeliveryId === delivery._id && (
                      <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-center">
                        <p className="text-blue-700 font-medium">
                          📡 GPS Tracking Active
                        </p>
                      </div>
                    )}

                    <input
                      type="text"
                      maxLength="4"
                      value={otp}
                      onChange={(e) =>
                        setOtp(e.target.value.replace(/\D/g, ''))
                      }
                      className="input"
                      placeholder="Enter 4-digit OTP"
                    />

                    <button
                      onClick={() => handleCompleteDelivery(delivery._id)}
                      className="w-full btn btn-success"
                    >
                      ✅ Complete Delivery
                    </button>
                  </div>
                )}

                {/* COMPLETED */}
                {delivery.status === 'Completed' && (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-center">
                    <p className="text-emerald-700 font-medium">
                      ✅ Delivery Completed
                    </p>
                  </div>
                )}

              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default DeliveryPartnerDashboard;
