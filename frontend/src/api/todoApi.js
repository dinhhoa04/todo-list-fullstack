import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json' },
});

const todoApi = {
  getAll: (params) => apiClient.get('/todos', { params }),
  getById: (id) => apiClient.get(`/todos/${id}`),
  create: (data) => apiClient.post('/todos', data),
  update: (id, data) => apiClient.put(`/todos/${id}`, data),
  toggleComplete: (id) => apiClient.patch(`/todos/${id}/toggle`),
  delete: (id) => apiClient.delete(`/todos/${id}`),
};

export default todoApi;