import { useState, useEffect, type FC, type ReactNode } from 'react';
import { applicationService } from '../services/applicationService';
import { ApplicationContext } from './applicationContextDef';

export const ApplicationProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [appliedJobIds, setAppliedJobIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Hydrate applied jobs on mount via applicationService
  useEffect(() => {
    let isMounted = true;
    applicationService
      .getAppliedJobIds()
      .then((ids) => {
        if (isMounted) {
          setAppliedJobIds(ids);
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const refreshApplications = async () => {
    setIsLoading(true);
    try {
      const ids = await applicationService.getAppliedJobIds();
      setAppliedJobIds(ids);
    } finally {
      setIsLoading(false);
    }
  };

  const applyToJob = async (jobId: string) => {
    // Optimistic UI update
    setAppliedJobIds((prev) => (prev.includes(jobId) ? prev : [...prev, jobId]));
    try {
      await applicationService.applyToJob(jobId);
    } catch (err) {
      // Rollback on failure
      setAppliedJobIds((prev) => prev.filter((id) => id !== jobId));
      throw err;
    }
  };

  const removeApplication = async (jobId: string) => {
    // Optimistic UI update
    setAppliedJobIds((prev) => prev.filter((id) => id !== jobId));
    try {
      await applicationService.removeApplication(jobId);
    } catch (err) {
      // Rollback on failure
      setAppliedJobIds((prev) => (prev.includes(jobId) ? prev : [...prev, jobId]));
      throw err;
    }
  };

  const isApplied = (jobId: string) => {
    return appliedJobIds.includes(jobId);
  };

  return (
    <ApplicationContext.Provider
      value={{
        appliedJobIds,
        applyToJob,
        removeApplication,
        isApplied,
        appliedCount: appliedJobIds.length,
        isLoading,
        refreshApplications,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

export default ApplicationProvider;
