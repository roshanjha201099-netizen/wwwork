import type { Application } from '../types/application';
import { jobAdapter, type RawBackendJob } from './jobAdapter';

/**
 * [ASSUMPTION - TO BE CONFIRMED WITH BACKEND TEAM]
 * Potential raw backend payload representation for an Application entity.
 */
export interface RawBackendApplication {
  id?: string;
  _id?: string;
  job_id?: string;
  jobId?: string;
  created_at?: string;
  applied_at?: string;
  appliedAt?: string;
  status?: 'submitted' | 'under_review' | 'interview' | 'rejected' | 'accepted';
  job?: RawBackendJob;
}

export const applicationAdapter = {
  /**
   * Normalizes an application record.
   */
  normalizeApplication(raw: RawBackendApplication): Application {
    return {
      id: String(raw.id || raw._id || ''),
      jobId: String(raw.jobId || raw.job_id || ''),
      appliedAt: raw.appliedAt || raw.applied_at || raw.created_at || new Date().toISOString(),
      status: raw.status || 'submitted',
      job: raw.job ? jobAdapter.normalizeJob(raw.job) : undefined,
    };
  },

  /**
   * Extracts clean list of job IDs from backend applications response.
   */
  extractJobIds(raw: unknown): string[] {
    if (!Array.isArray(raw)) return [];
    return raw
      .map((item) => {
        if (typeof item === 'string') return item;
        if (item && typeof item === 'object') {
          const rec = item as RawBackendApplication;
          return rec.jobId || rec.job_id || rec.id || '';
        }
        return '';
      })
      .filter(Boolean);
  },
};

export default applicationAdapter;

