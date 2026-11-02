import { useContext, useState, useEffect } from 'react';
import { ApplicationContext, type ApplicationContextType } from '../context/applicationContextDef';
import { applicationService } from '../services/applicationService';
import type { Job } from '../types/job';

export function useApplications(): ApplicationContextType {
  const context = useContext(ApplicationContext);
  if (!context) {
    throw new Error('useApplications must be used within an ApplicationProvider');
  }
  return context;
}

/**
 * Hook to retrieve full Job records for all applied positions.
 * Decouples UI pages from data sources (mock vs backend API).
 */
export function useAppliedJobs() {
  const { appliedJobIds, removeApplication, appliedCount, isLoading: isContextLoading } = useApplications();
  const [appliedJobs, setAppliedJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    applicationService
      .getAppliedJobs()
      .then((jobs) => {
        if (isMounted) {
          setAppliedJobs(jobs);
          setIsLoading(false);
        }
      })
      .catch((err: unknown) => {
        if (isMounted) {
          const message = err instanceof Error ? err.message : 'Failed to load applied jobs.';
          setError(message);
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [appliedJobIds]);

  const retry = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const jobs = await applicationService.getAppliedJobs();
      setAppliedJobs(jobs);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to load applied jobs.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    appliedJobs,
    appliedJobIds,
    appliedCount,
    isLoading: isContextLoading || isLoading,
    error,
    removeApplication,
    retry,
  };
}

export default useApplications;
