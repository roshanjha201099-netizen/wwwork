import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../index';

export const selectAuthState = (state: RootState) => state.auth;

export const selectCurrentUser = createSelector(
  [selectAuthState],
  (authState) => authState.user
);

export const selectIsAuthenticated = createSelector(
  [selectAuthState],
  (authState) => authState.isAuthenticated
);

export const selectAuthLoading = createSelector(
  [selectAuthState],
  (authState) => authState.loading
);

export const selectAuthError = createSelector(
  [selectAuthState],
  (authState) => authState.error
);

export const selectAuthInitialized = createSelector(
  [selectAuthState],
  (authState) => authState.initialized
);

