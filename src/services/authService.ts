import { config } from '../config/env';
import { apiClient } from './api';
import { mockUser } from '../data/mockUser';
import type { User, LoginCredentials, SignupCredentials, AuthResponse } from '../types/auth';

/**
 * [PROPOSED INTEGRATION ENDPOINTS - TO BE CONFIRMED WITH BACKEND DEVELOPER]
 * Centralized endpoint route definitions for authentication and identity.
 */
export const AUTH_ENDPOINTS = {
  SIGNUP: '/auth/signup',
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  ME: '/auth/me',
} as const;

export const authService = {
  /**
   * Proposed signup method.
   * [ASSUMPTION]: Backend accepts { name, email, password } and sets HTTP-only session cookie.
   */
  async signup(credentials: SignupCredentials): Promise<User> {
    if (config.isMock) {
      // Mock mode does not simulate real user accounts or persistent sessions
      return Promise.reject(
        new Error('Account registration will be available soon.')
      );
    }

    const response = await apiClient.post<AuthResponse | User>(AUTH_ENDPOINTS.SIGNUP, credentials);
    if ('user' in response.data) {
      return response.data.user;
    }
    return response.data;
  },

  /**
   * Proposed login method.
   * [ASSUMPTION]: Backend accepts { email, password } and sets HTTP-only session cookie.
   */
  async login(credentials: LoginCredentials): Promise<User> {
    if (config.isMock) {
      // Mock mode does not simulate real authentication
      return Promise.reject(
        new Error('Authentication integration is coming soon.')
      );
    }

    const response = await apiClient.post<AuthResponse | User>(AUTH_ENDPOINTS.LOGIN, credentials);
    if ('user' in response.data) {
      return response.data.user;
    }
    return response.data;
  },

  /**
   * Proposed logout method.
   * [ASSUMPTION]: Backend clears HTTP-only session cookie.
   */
  async logout(): Promise<void> {
    if (config.isMock) {
      return Promise.resolve();
    }

    await apiClient.post(AUTH_ENDPOINTS.LOGOUT);
  },

  /**
   * Proposed session validation / current user method.
   * [ASSUMPTION]: GET /auth/me returns current user entity if valid cookie exists, or 401.
   */
  async getCurrentUser(): Promise<User | null> {
    if (config.isMock) {
      // Return static demo profile for visual completeness in mock mode
      return Promise.resolve({ ...mockUser });
    }

    try {
      const response = await apiClient.get<User | { user: User }>(AUTH_ENDPOINTS.ME);
      if ('user' in response.data) {
        return response.data.user;
      }
      return response.data;
    } catch {
      // 401 or network failure signifies unauthenticated state
      return null;
    }
  },
};

export default authService;
