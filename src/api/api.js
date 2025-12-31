// This file will contain the API calls
import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api/v1', // This will be proxied to the backend in development
});

export default apiClient;
