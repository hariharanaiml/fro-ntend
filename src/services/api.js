const API_BASE_URL = 'https://backend-1-6vs2.onrender.com/api';

// Generic API functions
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// Ticket API functions
export const ticketAPI = {
  getAll: () => apiRequest('/tickets'),
  getById: (id) => apiRequest(`/tickets/${id}`),
  create: (ticketData) => apiRequest('/tickets', {
    method: 'POST',
    body: JSON.stringify(ticketData),
  }),
  update: (id, ticketData) => apiRequest(`/tickets/${id}`, {
    method: 'PUT',
    body: JSON.stringify(ticketData),
  }),
  cancel: (id) => apiRequest(`/tickets/${id}/cancel`, {
    method: 'PATCH',
  }),
};

// Ride API functions
export const rideAPI = {
  getAll: () => apiRequest('/rides'),
  getById: (id) => apiRequest(`/rides/${id}`),
  create: (rideData) => apiRequest('/rides', {
    method: 'POST',
    body: JSON.stringify(rideData),
  }),
  update: (id, rideData) => apiRequest(`/rides/${id}`, {
    method: 'PUT',
    body: JSON.stringify(rideData),
  }),
};

// User API functions
export const userAPI = {
  register: (userData) => apiRequest('/users/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  }),
  login: (credentials) => apiRequest('/users/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  }),
  getTickets: (userId) => apiRequest(`/users/${userId}/tickets`),
};