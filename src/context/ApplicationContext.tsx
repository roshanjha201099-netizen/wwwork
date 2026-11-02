import { useState, useEffect, type FC, type ReactNode } from 'react';
import { ApplicationContext } from './applicationContextDef';

const STORAGE_KEY = 'jt_applied_job_ids';

export const ApplicationProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [appliedJobIds, setAppliedJobIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          return parsed.filter((id) => typeof id === 'string');
        }
      }
    } catch {
      // LocalStorage unavailable or parse error; fallback to empty list
    }
    return [];
  });

  // Sync to localStorage whenever state changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(appliedJobIds));
    } catch {
      // Ignore write errors (e.g. quota exceeded in private mode)
    }
  }, [appliedJobIds]);

  const applyToJob = (jobId: string) => {
    setAppliedJobIds((prev) => (prev.includes(jobId) ? prev : [...prev, jobId]));
  };

  const removeApplication = (jobId: string) => {
    setAppliedJobIds((prev) => prev.filter((id) => id !== jobId));
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
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

export default ApplicationProvider;
