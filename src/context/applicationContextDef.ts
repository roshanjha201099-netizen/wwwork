import { createContext } from 'react';

export interface ApplicationContextType {
  appliedJobIds: string[];
  applyToJob: (jobId: string) => Promise<void>;
  removeApplication: (jobId: string) => Promise<void>;
  isApplied: (jobId: string) => boolean;
  appliedCount: number;
  isLoading: boolean;
  refreshApplications: () => Promise<void>;
}

export const ApplicationContext = createContext<ApplicationContextType | undefined>(undefined);
