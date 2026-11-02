import { createContext } from 'react';

export interface ApplicationContextType {
  appliedJobIds: string[];
  applyToJob: (jobId: string) => void;
  removeApplication: (jobId: string) => void;
  isApplied: (jobId: string) => boolean;
  appliedCount: number;
}

export const ApplicationContext = createContext<ApplicationContextType | undefined>(undefined);
