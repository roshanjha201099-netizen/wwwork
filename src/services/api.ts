import axios, { type AxiosError, type AxiosResponse } from 'axios';
import { config } from '../config/env';

export interface ApiErrorDetail {
  message: string;
  statusCode?: number;
  code?: string;
  details?: unknown;
}

export class ApiError extends Error {
  statusCode?: number;
  code?: string;
  details?: unknown;

  constructor(message: string, statusCode?: number, code?: string, details?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
  }
}

/**
 * Standardized error message extraction.
 * Protects against displaying raw stack traces or internal backend errors to users.
 */
export function parseApiError(error: unknown): ApiError {
  if (error instanceof ApiError) {
    return error;
  }

  if (axios.isAxiosError(error)) {
    const axiosErr = error as AxiosError<{ message?: string; error?: string }>;
    const status = axiosErr.response?.status;
    const responseData = axiosErr.response?.data;

    // Server-provided message if clean
    const serverMessage = responseData?.message || responseData?.error;

    if (serverMessage && typeof serverMessage === 'string') {
      return new ApiError(serverMessage, status, axiosErr.code, responseData);
    }

    // Standardized user-friendly fallbacks based on HTTP status
    switch (status) {
      case 400:
        return new ApiError('Invalid request. Please check your submission and try again.', 400);
      case 401:
        return new ApiError('Authentication required. Please sign in to continue.', 401);
      case 403:
        return new ApiError('You do not have permission to access this resource.', 403);
      case 404:
        return new ApiError('The requested resource was not found.', 404);
      case 500:
      case 502:
      case 503:
        return new ApiError('Server error encountered. Please try again shortly.', status);
      default:
        if (axiosErr.code === 'ECONNABORTED') {
          return new ApiError('Connection timed out. Please check your network and try again.', undefined, axiosErr.code);
        }
        if (!axiosErr.response) {
          return new ApiError('Unable to connect to the backend server. Please verify your connection.', undefined, 'NETWORK_ERROR');
        }
        return new ApiError('An unexpected network error occurred.', status);
    }
  }

  if (error instanceof Error) {
    return new ApiError(error.message);
  }

  return new ApiError('An unknown error occurred.');
}

/**
 * Centralized Axios instance configured for backend API communication.
 */
export const apiClient = axios.create({
  baseURL: config.apiBaseUrl,
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Response interceptor to normalize errors
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    return Promise.reject(parseApiError(error));
  }
);

export default apiClient;
