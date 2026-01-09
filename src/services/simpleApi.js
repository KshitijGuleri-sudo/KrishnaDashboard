/**
 * Simple API Service - No Complex Auth
 * Works with backend or falls back to localStorage
 */

const API_URL = 'http://localhost:5000/api';

// Check if backend is available
let useBackend = false;

const checkBackend = async () => {
  try {
    const response = await fetch('http://localhost:5000/health');
    useBackend = response.ok;
    return useBackend;
  } catch (error) {
    useBackend = false;
    return false;
  }
};

// Initialize backend check
checkBackend();

// Get auth token
const getToken = () => localStorage.getItem('token');

// Fetch helper
const fetchAPI = async (endpoint, options = {}) => {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response.json();
};

// API Methods
export const api = {
  // Auth
  login: async (credentials) => {
    try {
      return await fetchAPI('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials)
      });
    } catch (error) {
      return null;
    }
  },

  // Projects
  getProjects: async () => {
    try {
      return await fetchAPI('/projects');
    } catch (error) {
      return null;
    }
  },

  createProject: async (projectData) => {
    try {
      return await fetchAPI('/projects', {
        method: 'POST',
        body: JSON.stringify(projectData)
      });
    } catch (error) {
      return null;
    }
  },

  updateProject: async (id, updates) => {
    try {
      return await fetchAPI(`/projects/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updates)
      });
    } catch (error) {
      return null;
    }
  },

  deleteProject: async (id) => {
    try {
      return await fetchAPI(`/projects/${id}`, {
        method: 'DELETE'
      });
    } catch (error) {
      return null;
    }
  },

  getStats: async () => {
    try {
      return await fetchAPI('/projects/stats');
    } catch (error) {
      return null;
    }
  }
};

export default api;
