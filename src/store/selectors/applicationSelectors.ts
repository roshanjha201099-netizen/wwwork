import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../index';

export const selectApplicationsState = (state: RootState) => state.applications;

export const selectApplications = createSelector(
  [selectApplicationsState],
  (appState) => appState.appliedJobs
);

export const selectAppliedJobIds = createSelector(
  [selectApplicationsState],
  (appState) => appState.appliedJobIds
);

export const selectApplicationsLoading = createSelector(
  [selectApplicationsState],
  (appState) => appState.loading
);

export const selectApplicationsError = createSelector(
  [selectApplicationsState],
  (appState) => appState.error
);

export const selectAppliedCount = createSelector(
  [selectAppliedJobIds],
  (appliedJobIds) => appliedJobIds.length
);

export const makeSelectIsJobApplied = (jobId: string) =>
  createSelector(
    [selectAppliedJobIds],
    (appliedJobIds) => appliedJobIds.includes(jobId)
  );

