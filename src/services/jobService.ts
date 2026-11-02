import { config } from '../config/env';
import { apiClient } from './api';
import { mockJobs } from '../data/mockJobs';
import { jobAdapter, type RawBackendJob, type RawBackendJobListResponse } from '../adapters/jobAdapter';
import type { Job, JobFiltersState, JobSearchParams, JobListResponse } from '../types/job';

/**
 * [PROPOSED INTEGRATION ENDPOINTS - TO BE CONFIRMED WITH BACKEND DEVELOPER]
 * Centralized endpoint route definitions for jobs.
 */
export const JOB_ENDPOINTS = {
  LIST: '/jobs',
  DETAIL: (id: string) => `/jobs/${encodeURIComponent(id)}`,
} as const;

/**
 * Internal pure filter engine for Mock mode.
 */
function filterMockJobs(jobs: Job[], filters: Partial<JobFiltersState>): Job[] {
  const referenceNow = new Date('2026-11-02T10:00:00Z').getTime();

  return jobs.filter((job) => {
    // 1. Search filter: Position or Company or Location
    if (filters.search && filters.search.trim()) {
      const query = filters.search.toLowerCase().trim();
      const matchesPosition = job.position.toLowerCase().includes(query);
      const matchesCompany = job.company.toLowerCase().includes(query);
      const matchesLocation = job.location ? job.location.toLowerCase().includes(query) : false;
      if (!matchesPosition && !matchesCompany && !matchesLocation) {
        return false;
      }
    }

    // 2. Tech stack filter
    if (filters.technologies && filters.technologies.length > 0) {
      const hasSelectedTech = filters.technologies.some((tech) =>
        job.tech_stack.map((t) => t.toLowerCase()).includes(tech.toLowerCase())
      );
      if (!hasSelectedTech) {
        return false;
      }
    }

    // 3. Date range filter
    if (filters.dateRange && filters.dateRange !== 'all') {
      const jobDate = new Date(job.created_at).getTime();
      const diffMs = referenceNow - jobDate;

      if (filters.dateRange === '24h' && diffMs > 24 * 60 * 60 * 1000) {
        return false;
      }
      if (filters.dateRange === '7d' && diffMs > 7 * 24 * 60 * 60 * 1000) {
        return false;
      }
      if (filters.dateRange === '30d' && diffMs > 30 * 24 * 60 * 60 * 1000) {
        return false;
      }
    }

    // 4. Experience / Job type filter
    if (filters.experienceLevel && filters.experienceLevel !== 'all') {
      const target = filters.experienceLevel.toLowerCase();
      const matchesExp =
        (job.experience_level && job.experience_level.toLowerCase() === target) ||
        job.position.toLowerCase().includes(target);
      if (!matchesExp) {
        return false;
      }
    }

    return true;
  });
}

export const jobService = {
  /**
   * Fetches paginated and filtered jobs.
   * Dispatches to local mock dataset or HTTP API based on config.dataMode.
   */
  async getJobs(params: JobSearchParams = {}): Promise<JobListResponse> {
    const page = Math.max(1, params.page || 1);
    const pageSize = Math.max(1, params.pageSize || 10);

    if (config.isMock) {
      // MOCK MODE: Pure frontend filtering over the 42 mock jobs
      const filtered = filterMockJobs(mockJobs, {
        search: params.search,
        technologies: params.technologies,
        dateRange: params.dateRange,
        experienceLevel: params.experienceLevel,
      });

      const total = filtered.length;
      const totalPages = Math.max(1, Math.ceil(total / pageSize));
      const safePage = Math.min(page, totalPages);
      const startIndex = (safePage - 1) * pageSize;
      const slice = filtered.slice(startIndex, startIndex + pageSize);

      return Promise.resolve({
        jobs: slice,
        total,
        page: safePage,
        pageSize,
        totalPages,
      });
    }

    // API MODE: HTTP query via Axios
    // [ASSUMPTION]: Backend accepts query parameters: page, limit, search, tech, dateRange, experience
    const queryParams: Record<string, string | number> = {
      page,
      limit: pageSize,
    };

    if (params.search?.trim()) {
      queryParams.search = params.search.trim();
    }
    if (params.technologies && params.technologies.length > 0) {
      queryParams.tech = params.technologies.join(',');
    }
    if (params.dateRange && params.dateRange !== 'all') {
      queryParams.dateRange = params.dateRange;
    }
    if (params.experienceLevel && params.experienceLevel !== 'all') {
      queryParams.experience = params.experienceLevel;
    }

    const response = await apiClient.get<RawBackendJobListResponse>(JOB_ENDPOINTS.LIST, {
      params: queryParams,
    });

    return jobAdapter.normalizeJobListResponse(response.data, page, pageSize);
  },

  /**
   * Fetches a single job by id.
   */
  async getJobById(id: string): Promise<Job | undefined> {
    if (config.isMock) {
      const match = mockJobs.find((j) => j.id === id);
      return Promise.resolve(match ? { ...match } : undefined);
    }

    const response = await apiClient.get<RawBackendJob>(JOB_ENDPOINTS.DETAIL(id));
    return response.data ? jobAdapter.normalizeJob(response.data) : undefined;
  },

  /**
   * Extracts unique technology tags across the jobs catalog.
   */
  async getUniqueTechnologies(): Promise<string[]> {
    if (config.isMock) {
      const techSet = new Set<string>();
      mockJobs.forEach((job) => {
        job.tech_stack.forEach((tech) => techSet.add(tech));
      });
      return Promise.resolve(Array.from(techSet).sort((a, b) => a.localeCompare(b)));
    }

    // In API mode, unique technologies could be fetched from a taxonomy endpoint or derived
    const response = await apiClient.get<string[] | { technologies?: string[] }>('/jobs/technologies');
    if (Array.isArray(response.data)) {
      return response.data;
    }
    if (response.data && Array.isArray(response.data.technologies)) {
      return response.data.technologies;
    }
    return [];
  },

  /**
   * Direct in-memory filtering utility retained for local client operations.
   */
  filterJobs(jobs: Job[], filters: JobFiltersState): Job[] {
    return filterMockJobs(jobs, filters);
  },
};

export default jobService;
