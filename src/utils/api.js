import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const postsAPI = {
  getAll: () => api.get('/api/posts'),
  create: (data) => api.post('/api/posts', data),
};

export default api;
