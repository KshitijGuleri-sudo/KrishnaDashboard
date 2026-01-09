/**
 * API Service
 * Centralized API calls to backend
 */

import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getMe: () => api.get('/auth/me')
};

// User APIs
export const userAPI = {
  getAll: () => api.get('/users'),
  getEditors: () => api.get('/users/editors'),
  create: (userData) => api.post('/users', userData),
  delete: (id) => api.delete(`/users/${id}`)
};

// Project APIs
export const projectAPI = {
  getAll: (params) => api.get('/projects', { params }),
  getById: (id) => api.get(`/projects/${id}`),
  getStats: () => api.get('/projects/stats'),
  create: (projectData) => api.post('/projects', projectData),
  update: (id, projectData) => api.put(`/projects/${id}`, projectData),
  delete: (id) => api.delete(`/projects/${id}`)
};

// Company APIs
export const companyAPI = {
  getAll: () => api.get('/companies'),
  create: (companyData) => api.post('/companies', companyData)
};

// Payment APIs
export const paymentAPI = {
  create: (paymentData) => api.post('/payments', paymentData),
  update: (id, paymentData) => api.put(`/payments/${id}`, paymentData),
  getMonthly: (params) => api.get('/payments/monthly', { params })
};

export default api;
