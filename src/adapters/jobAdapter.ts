import type { Job, JobListResponse } from '../types/job';

/**
 * [ASSUMPTION - TO BE CONFIRMED WITH BACKEND TEAM]
 * Potential raw backend payload representation for a Job entity.
 */
export interface RawBackendJob {
  id?: string;
  _id?: string;
  position?: string;
  title?: string;
  company?: string;
  company_name?: string;
  created_at?: string;
  createdAt?: string;
  tech_stack?: string[];
  techStack?: string[];
  description?: string;
  location?: string;
  apply_url?: string;
  applyUrl?: string;
  experience_level?: 'Internship' | 'Entry-level' | 'Junior';
  experienceLevel?: 'Internship' | 'Entry-level' | 'Junior';
}

/**
 * [ASSUMPTION - TO BE CONFIRMED WITH BACKEND TEAM]
 * Potential paginated envelope structures commonly returned by REST APIs.
 */
export interface RawBackendJobListResponse {
  data?: RawBackendJob[];
  jobs?: RawBackendJob[];
  total?: number;
  totalCount?: number;
  count?: number;
  page?: number;
  currentPage?: number;
  limit?: number;
  pageSize?: number;
  totalPages?: number;
}

export const jobAdapter = {
  /**
   * Normalizes any backend job object into the canonical frontend Job model.
   */
  normalizeJob(raw: RawBackendJob): Job {
    return {
      id: String(raw.id || raw._id || ''),
      position: raw.position || raw.title || 'Untitled Role',
      company: raw.company || raw.company_name || 'Confidential Company',
      created_at: raw.created_at || raw.createdAt || new Date().toISOString(),
      tech_stack: Array.isArray(raw.tech_stack)
        ? raw.tech_stack
        : Array.isArray(raw.techStack)
        ? raw.techStack
        : [],
      description: raw.description || '',
      location: raw.location,
      apply_url: raw.apply_url || raw.applyUrl,
      experience_level: raw.experience_level || raw.experienceLevel,
    };
  },

  /**
   * Normalizes backend paginated response into canonical JobListResponse.
   */
  normalizeJobListResponse(raw: RawBackendJobListResponse, fallbackPage = 1, fallbackPageSize = 10): JobListResponse {
    const rawList = Array.isArray(raw.data)
      ? raw.data
      : Array.isArray(raw.jobs)
      ? raw.jobs
      : Array.isArray(raw)
      ? (raw as RawBackendJob[])
      : [];

    const jobs = rawList.map(jobAdapter.normalizeJob);
    const total = typeof raw.total === 'number'
      ? raw.total
      : typeof raw.totalCount === 'number'
      ? raw.totalCount
      : typeof raw.count === 'number'
      ? raw.count
      : jobs.length;

    const page = raw.page || raw.currentPage || fallbackPage;
    const pageSize = raw.limit || raw.pageSize || fallbackPageSize;
    const totalPages = raw.totalPages || Math.max(1, Math.ceil(total / pageSize));

    return {
      jobs,
      total,
      page,
      pageSize,
      totalPages,
    };
  },
};

export default jobAdapter;

