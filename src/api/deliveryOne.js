import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

/**
 * DeliveryOne API Service
 * Frontend service for interacting with DeliveryOne endpoints
 */

// Get auth token from localStorage
const getAuthToken = () => {
  const token = localStorage.getItem('token');
  return token ? `Bearer ${token}` : null;
};

// Create axios instance with auth
const createAuthConfig = () => ({
  headers: {
    Authorization: getAuthToken(),
    'Content-Type': 'application/json'
  }
});

/**
 * Public Endpoints
 */

// Track shipment
export const trackShipment = async (orderId, orderType = 'regular') => {
  const response = await axios.get(
    `${API_BASE_URL}/api/deliveryone/track/${orderId}?orderType=${orderType}`,
    createAuthConfig()
  );
  return response.data;
};

// Check serviceability
export const checkServiceability = async (pickupPincode, deliveryPincode, weight = 0.5, cod = 0) => {
  const response = await axios.get(
    `${API_BASE_URL}/api/deliveryone/check-serviceability`,
    {
      params: { pickupPincode, deliveryPincode, weight, cod }
    }
  );
  return response.data;
};

/**
 * Admin Endpoints
 */

// Create shipment
export const createShipment = async (orderId, orderType = 'regular', options = {}) => {
  const response = await axios.post(
    `${API_BASE_URL}/api/deliveryone/create-shipment`,
    {
      orderId,
      orderType,
      ...options
    },
    createAuthConfig()
  );
  return response.data;
};

// Assign courier
export const assignCourier = async (orderId, orderType = 'regular', courierId = null) => {
  const response = await axios.post(
    `${API_BASE_URL}/api/deliveryone/assign-courier`,
    {
      orderId,
      orderType,
      courierId
    },
    createAuthConfig()
  );
  return response.data;
};

// Get recommended couriers
export const getRecommendedCouriers = async (orderId, orderType = 'regular') => {
  const response = await axios.get(
    `${API_BASE_URL}/api/deliveryone/recommended-couriers/${orderId}?orderType=${orderType}`,
    createAuthConfig()
  );
  return response.data;
};

// Request pickup
export const requestPickup = async (orderId, orderType = 'regular') => {
  const response = await axios.post(
    `${API_BASE_URL}/api/deliveryone/request-pickup`,
    {
      orderId,
      orderType
    },
    createAuthConfig()
  );
  return response.data;
};

// Cancel shipment
export const cancelShipment = async (orderId, orderType = 'regular') => {
  const response = await axios.post(
    `${API_BASE_URL}/api/deliveryone/cancel-shipment`,
    {
      orderId,
      orderType
    },
    createAuthConfig()
  );
  return response.data;
};

// Generate label
export const generateLabel = async (orderId, orderType = 'regular') => {
  const response = await axios.post(
    `${API_BASE_URL}/api/deliveryone/generate-label`,
    {
      orderId,
      orderType
    },
    createAuthConfig()
  );
  return response.data;
};

// Generate manifest
export const generateManifest = async (orderIds, orderType = 'regular') => {
  const response = await axios.post(
    `${API_BASE_URL}/api/deliveryone/generate-manifest`,
    {
      orderIds,
      orderType
    },
    createAuthConfig()
  );
  return response.data;
};

// Get pickup locations
export const getPickupLocations = async () => {
  const response = await axios.get(
    `${API_BASE_URL}/api/deliveryone/pickup-locations`,
    createAuthConfig()
  );
  return response.data;
};

export default {
  trackShipment,
  checkServiceability,
  createShipment,
  assignCourier,
  getRecommendedCouriers,
  requestPickup,
  cancelShipment,
  generateLabel,
  generateManifest,
  getPickupLocations
};