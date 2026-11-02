import { config } from '../config/env';
import { apiClient } from './api';
import { mockJobs } from '../data/mockJobs';
import { applicationAdapter, type RawBackendApplication } from '../adapters/applicationAdapter';
import type { Job } from '../types/job';

const STORAGE_KEY = 'jt_applied_job_ids';

/**
 * [PROPOSED INTEGRATION ENDPOINTS - TO BE CONFIRMED WITH BACKEND DEVELOPER]
 * Centralized endpoint route definitions for job applications.
 */
export const APPLICATION_ENDPOINTS = {
  LIST: '/applications',
  APPLY: '/applications',
  REMOVE: (jobId: string) => `/applications/${encodeURIComponent(jobId)}`,
} as const;

export const applicationService = {
  /**
   * Retrieves the list of job IDs the user has applied to.
   */
  async getAppliedJobIds(): Promise<string[]> {
    if (config.isMock) {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            return Promise.resolve(parsed.filter((id) => typeof id === 'string'));
          }
        }
      } catch {
        // Fallback for private mode or JSON parse error
      }
      return Promise.resolve([]);
    }

    // API MODE:
    // [ASSUMPTION]: Backend returns array of Application objects or array of IDs
    const response = await apiClient.get<RawBackendApplication[] | string[]>(APPLICATION_ENDPOINTS.LIST);
    return applicationAdapter.extractJobIds(response.data);
  },

  /**
   * Retrieves full Job entities for all applied roles.
   */
  async getAppliedJobs(): Promise<Job[]> {
    const ids = await this.getAppliedJobIds();
    if (config.isMock) {
      const applied = mockJobs.filter((job) => ids.includes(job.id));
      return Promise.resolve(applied);
    }

    // In API mode, applications may already include populated job objects
    const response = await apiClient.get<RawBackendApplication[]>(APPLICATION_ENDPOINTS.LIST);
    if (Array.isArray(response.data)) {
      const populated = response.data
        .map((app) => applicationAdapter.normalizeApplication(app).job)
        .filter((j): j is Job => Boolean(j));
      if (populated.length > 0) {
        return populated;
      }
    }
    // Fallback: fetch matching jobs if application objects did not embed them
    return [];
  },

  /**
   * Marks a job as applied.
   */
  async applyToJob(jobId: string): Promise<void> {
    if (config.isMock) {
      const current = await this.getAppliedJobIds();
      if (!current.includes(jobId)) {
        const updated = [...current, jobId];
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        } catch {
          // Ignore localStorage write errors
        }
      }
      return Promise.resolve();
    }

    // API MODE:
    // [ASSUMPTION]: POST /applications accepts body payload { jobId: string }
    await apiClient.post(APPLICATION_ENDPOINTS.APPLY, { jobId });
  },

  /**
   * Removes an applied job record.
   */
  async removeApplication(jobId: string): Promise<void> {
    if (config.isMock) {
      const current = await this.getAppliedJobIds();
      const updated = current.filter((id) => id !== jobId);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // Ignore localStorage write errors
      }
      return Promise.resolve();
    }

    // API MODE:
    // [ASSUMPTION]: DELETE /applications/:jobId removes application
    await apiClient.delete(APPLICATION_ENDPOINTS.REMOVE(jobId));
  },
};

export default applicationService;
