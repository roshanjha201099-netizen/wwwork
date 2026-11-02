import axios from 'axios';

/**
 * Base Axios instance configured for API communication.
 * Ready for integration in subsequent phases.
 */
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;

