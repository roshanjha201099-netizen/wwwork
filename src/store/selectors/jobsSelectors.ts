import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../index';

export const selectJobsState = (state: RootState) => state.jobs;

export const selectAllJobs = createSelector(
  [selectJobsState],
  (jobsState) => jobsState.jobs
);

export const selectSelectedJob = createSelector(
  [selectJobsState],
  (jobsState) => jobsState.selectedJob
);

export const selectJobsLoading = createSelector(
  [selectJobsState],
  (jobsState) => jobsState.loading
);

export const selectJobsError = createSelector(
  [selectJobsState],
  (jobsState) => jobsState.error
);

export const selectCurrentPage = createSelector(
  [selectJobsState],
  (jobsState) => jobsState.currentPage
);

export const selectPageSize = createSelector(
  [selectJobsState],
  (jobsState) => jobsState.pageSize
);

export const selectTotalJobs = createSelector(
  [selectJobsState],
  (jobsState) => jobsState.totalJobs
);

export const selectCatalogTotalCount = createSelector(
  [selectJobsState],
  (jobsState) => jobsState.catalogTotalCount || jobsState.totalJobs
);

export const selectTotalPages = createSelector(
  [selectTotalJobs, selectPageSize],
  (totalJobs, pageSize) => Math.max(1, Math.ceil(totalJobs / pageSize))
);

export const selectJobFilters = createSelector(
  [selectJobsState],
  (jobsState) => jobsState.filters
);

export const selectHasActiveFilters = createSelector(
  [selectJobFilters],
  (filters) =>
    Boolean(filters.search.trim()) ||
    filters.technologies.length > 0 ||
    filters.dateRange !== 'all' ||
    filters.experienceLevel !== 'all'
);
