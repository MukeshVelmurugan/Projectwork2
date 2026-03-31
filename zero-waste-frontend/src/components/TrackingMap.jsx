// ========================================
// TRACKING MAP COMPONENT
// ========================================
// Real-time GPS tracking using Leaflet and OpenStreetMap

import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import api from '../config/api';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Custom icon for delivery partner
const deliveryIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Custom icon for pickup location
const pickupIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// ========================================
// MAP UPDATER COMPONENT
// ========================================
// Updates map view when delivery partner location changes
const MapUpdater = ({ position }) => {
  const map = useMap();
  
  useEffect(() => {
    if (position) {
      map.setView(position, 13);
    }
  }, [position, map]);
  
  return null;
};

// ========================================
// TRACKING MAP COMPONENT
// ========================================
const TrackingMap = ({ delivery }) => {
  const [currentPosition, setCurrentPosition] = useState(null);
  const [pickupLocation, setPickupLocation] = useState(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    // Set pickup location
    if (delivery.foodId?.latitude && delivery.foodId?.longitude) {
      setPickupLocation([delivery.foodId.latitude, delivery.foodId.longitude]);
    }

    // Set initial delivery partner location
    if (delivery.currentLat && delivery.currentLng) {
      setCurrentPosition([delivery.currentLat, delivery.currentLng]);
    }

    // Poll for location updates every 20 seconds
    const fetchLocation = async () => {
      try {
        const response = await api.get(`/delivery/${delivery._id}`);
        const updatedDelivery = response.data.data;
        
        if (updatedDelivery.currentLat && updatedDelivery.currentLng) {
          setCurrentPosition([updatedDelivery.currentLat, updatedDelivery.currentLng]);
        }
      } catch (error) {
        console.error('Error fetching delivery location:', error);
      }
    };

    // Start polling
    intervalRef.current = setInterval(fetchLocation, 20000); // Every 20 seconds

    // Cleanup on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [delivery]);

  // Default center (pickup location or delivery location)
  const center = currentPosition || pickupLocation || [0, 0];

  return (
    <div className="h-full w-full">
      <MapContainer
        center={center}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        {/* OpenStreetMap Tiles */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Pickup Location Marker (Green) */}
        {pickupLocation && (
          <Marker position={pickupLocation} icon={pickupIcon}>
            <Popup>
              <div>
                <strong>Pickup Location</strong>
                <p className="text-sm">{delivery.foodId?.pickupLocation}</p>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Delivery Partner Location Marker (Blue) */}
        {currentPosition && (
          <Marker position={currentPosition} icon={deliveryIcon}>
            <Popup>
              <div>
                <strong>Delivery Partner</strong>
                <p className="text-sm">{delivery.deliveryPartnerId?.name}</p>
                <p className="text-xs text-gray-600">Current Location</p>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Update map view when position changes */}
        <MapUpdater position={currentPosition} />
      </MapContainer>

      {/* Info Box */}
      <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          🔵 Blue Marker: Delivery Partner's Current Location
        </p>
        <p className="text-sm text-green-800">
          🟢 Green Marker: Pickup Location
        </p>
        <p className="text-xs text-gray-600 mt-2">
          📡 Location updates every 20 seconds
        </p>
      </div>
    </div>
  );
};

export default TrackingMap;
