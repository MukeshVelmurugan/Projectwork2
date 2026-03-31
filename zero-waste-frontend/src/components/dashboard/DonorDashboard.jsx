// ========================================
// FOODFLOW - DONOR DASHBOARD (MODERN UI)
// ========================================

import React, { useState, useEffect } from 'react';
import api, { getImageUrl } from '../../config/api';
import StaticMap from '../StaticMap';

const DonorDashboard = () => {
  const [showForm, setShowForm] = useState(false);
  const [foodPosts, setFoodPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    quantity: '',
    pickupLocation: '',
    latitude: '',
    longitude: '',
    category: 'Human Consumption',
    image: null
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchFoodPosts();
  }, []);

  const fetchFoodPosts = async () => {
    try {
      const response = await api.get('/food/donor');
      setFoodPosts(response.data.data);
    } catch (error) {
      console.error('Error fetching food posts:', error);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData({
            ...formData,
            latitude: position.coords.latitude.toFixed(6),
            longitude: position.coords.longitude.toFixed(6)
          });
          setSuccess('📍 Location captured successfully!');
          setTimeout(() => setSuccess(''), 3000);
        },
        () => {
          setError('Unable to get location. Please enter manually.');
        }
      );
    } else {
      setError('Geolocation not supported.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (!formData.title || !formData.description || !formData.quantity ||
        !formData.pickupLocation || !formData.latitude ||
        !formData.longitude || !formData.image) {
      setError('Please fill all fields and upload an image.');
      setLoading(false);
      return;
    }

    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => {
        data.append(key, formData[key]);
      });

      await api.post('/food', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setSuccess('✅ Food posted successfully!');
      setShowForm(false);

      setFormData({
        title: '',
        description: '',
        quantity: '',
        pickupLocation: '',
        latitude: '',
        longitude: '',
        category: 'Human Consumption',
        image: null
      });

      fetchFoodPosts();
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to post food.');
    }

    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this post?')) return;

    try {
      await api.delete(`/food/${id}`);
      setSuccess('🗑️ Food post deleted.');
      fetchFoodPosts();
    } catch (error) {
      setError(error.response?.data?.message || 'Delete failed.');
    }
  };

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div className="gradient-header flex flex-col md:flex-row md:justify-between md:items-center">
        <div>
          <h2 className="text-2xl font-bold">Donor Dashboard</h2>
          <p className="text-sm opacity-90">
            Share surplus food and reduce waste efficiently
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="mt-4 md:mt-0 btn btn-secondary"
        >
          {showForm ? "Cancel" : "➕ Post Food"}
        </button>
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

      {/* FORM */}
      {showForm && (
        <div className="card">
          <h3 className="text-xl font-semibold mb-6 text-primary">
            Post New Food Item
          </h3>

          <form onSubmit={handleSubmit} className="space-y-6">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="input"
                placeholder="Food Title"
              />
              <input
                type="text"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="input"
                placeholder="Quantity"
              />
            </div>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="input"
              rows="3"
              placeholder="Food description..."
            />

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="input"
            >
              <option value="Human Consumption">Human Consumption</option>
              <option value="Cattle Feed">Cattle Feed</option>
              <option value="Biogas / Compost">Biogas / Compost</option>
            </select>

            <input
              type="text"
              name="pickupLocation"
              value={formData.pickupLocation}
              onChange={handleChange}
              className="input"
              placeholder="Pickup Address"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <input
                type="number"
                step="any"
                name="latitude"
                value={formData.latitude}
                onChange={handleChange}
                className="input"
                placeholder="Latitude"
              />
              <input
                type="number"
                step="any"
                name="longitude"
                value={formData.longitude}
                onChange={handleChange}
                className="input"
                placeholder="Longitude"
              />
              <button
                type="button"
                onClick={getCurrentLocation}
                className="btn btn-secondary"
              >
                📍 Get Location
              </button>
            </div>

            <input
              type="file"
              name="image"
              onChange={handleChange}
              accept="image/jpeg,image/png,image/jpg"
              className="input"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full btn btn-primary"
            >
              {loading ? "Posting..." : "Post Food"}
            </button>
          </form>
        </div>
      )}

      {/* FOOD POSTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {foodPosts.length === 0 ? (
          <div className="col-span-full text-center py-16 card">
            <h3 className="text-lg font-semibold text-gray-700">
              No posts yet 🍽️
            </h3>
            <p className="text-gray-500 mt-2">
              Start contributing today.
            </p>
          </div>
        ) : (
          foodPosts.map((food) => (
            <div key={food._id} className="card hover:scale-[1.02]">

              <img
                src={getImageUrl(food.imagePath)}
                alt={food.title}
                className="w-full h-52 object-cover rounded-xl mb-4"
              />

              <h4 className="text-lg font-bold text-gray-800">
                {food.title}
              </h4>

              <div className="flex flex-wrap gap-2 my-2">
                <span className="px-3 py-1 text-xs rounded-full bg-emerald-100 text-emerald-700">
                  {food.category}
                </span>

                <span className={`px-3 py-1 text-xs rounded-full ${
                  food.status === 'Available'
                    ? 'bg-emerald-100 text-emerald-700'
                    : food.status === 'Assigned'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  {food.status}
                </span>
              </div>

              <p className="text-sm text-gray-600 mb-2">
                {food.description}
              </p>

              <p className="text-sm"><strong>Qty:</strong> {food.quantity}</p>
              <p className="text-sm mb-4"><strong>Location:</strong> {food.pickupLocation}</p>

              <div className="mb-4 rounded-xl overflow-hidden">
                <StaticMap
                  latitude={food.latitude}
                  longitude={food.longitude}
                  locationName={food.pickupLocation}
                />
              </div>

              {food.status === 'Available' && (
                <button
                  onClick={() => handleDelete(food._id)}
                  className="w-full btn btn-danger"
                >
                  Delete
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DonorDashboard;
