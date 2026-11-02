import { useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  selectApplications,
  selectAppliedJobIds,
  selectAppliedCount,
  selectApplicationsLoading,
  selectApplicationsError,
} from '../store/selectors/applicationSelectors';
import { fetchApplications, applyJob, unapplyJob } from '../store/slices/applicationsSlice';
import type { Job } from '../types/job';

export function useApplications() {
  const dispatch = useAppDispatch();
  const appliedJobIds = useAppSelector(selectAppliedJobIds);
  const appliedCount = useAppSelector(selectAppliedCount);
  const isLoading = useAppSelector(selectApplicationsLoading);
  const error = useAppSelector(selectApplicationsError);

  const applyToJob = useCallback(
    async (jobOrId: Job | string) => {
      const job: Job =
        typeof jobOrId === 'string'
          ? {
              id: jobOrId,
              position: 'Applied Role',
              company: 'Company',
              created_at: new Date().toISOString(),
              tech_stack: [],
              description: '',
            }
          : jobOrId;
      await dispatch(applyJob(job)).unwrap();
    },
    [dispatch]
  );

  const removeApplication = useCallback(
    async (jobId: string) => {
      await dispatch(unapplyJob(jobId)).unwrap();
    },
    [dispatch]
  );

  const isApplied = useCallback(
    (jobId: string) => {
      return appliedJobIds.includes(jobId);
    },
    [appliedJobIds]
  );

  return {
    appliedJobIds,
    applyToJob,
    removeApplication,
    isApplied,
    appliedCount,
    isLoading,
    error,
    refreshApplications: () => dispatch(fetchApplications()),
  };
}

/**
 * Hook to retrieve full Job records for all applied positions backed by Redux.
 */
export function useAppliedJobs() {
  const dispatch = useAppDispatch();
  const appliedJobs = useAppSelector(selectApplications);
  const appliedJobIds = useAppSelector(selectAppliedJobIds);
  const appliedCount = useAppSelector(selectAppliedCount);
  const isLoading = useAppSelector(selectApplicationsLoading);
  const error = useAppSelector(selectApplicationsError);

  useEffect(() => {
    // Initial fetch if empty
    if (appliedJobs.length === 0 && appliedJobIds.length === 0) {
      dispatch(fetchApplications());
    }
  }, [dispatch, appliedJobs.length, appliedJobIds.length]);

  const removeApp = useCallback(
    async (jobId: string) => {
      await dispatch(unapplyJob(jobId)).unwrap();
    },
    [dispatch]
  );

  return {
    appliedJobs,
    appliedJobIds,
    appliedCount,
    isLoading,
    error,
    removeApplication: removeApp,
    retry: () => dispatch(fetchApplications()),
  };
}

export default useApplications;
