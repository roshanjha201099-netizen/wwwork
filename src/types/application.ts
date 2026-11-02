import type { Job } from './job';

export type ApplicationStatus = 'submitted' | 'under_review' | 'interview' | 'rejected' | 'accepted';

export interface Application {
  id: string;
  jobId: string;
  appliedAt: string;
  status?: ApplicationStatus;
  job?: Job;
}

export interface ApplicationMutationResponse {
  success: boolean;
  jobId: string;
  message?: string;
}

