import { mockJobs } from '../data/mockJobs';
import type { Job, JobFiltersState } from '../types/job';

/**
 * Service to abstract job fetching and querying.
 * Prepares the codebase for seamless migration to real backend API endpoints.
 */
export const jobService = {
  /**
   * Retrieves all jobs.
   */
  async getJobs(): Promise<Job[]> {
    return Promise.resolve([...mockJobs]);
  },

  /**
   * Retrieves a single job by id.
   */
  async getJobById(id: string): Promise<Job | undefined> {
    const job = mockJobs.find((j) => j.id === id);
    return Promise.resolve(job ? { ...job } : undefined);
  },

  /**
   * Extracts all unique technology tags across the jobs catalog.
   */
  getUniqueTechnologies(): string[] {
    const techSet = new Set<string>();
    mockJobs.forEach((job) => {
      job.tech_stack.forEach((tech) => techSet.add(tech));
    });
    return Array.from(techSet).sort((a, b) => a.localeCompare(b));
  },

  /**
   * Pure filtering utility applying search, tech stack, date range, and experience filters.
   */
  filterJobs(jobs: Job[], filters: JobFiltersState): Job[] {
    const now = new Date('2026-11-02T10:00:00Z').getTime();

    return jobs.filter((job) => {
      // 1. Search filter: Position or Company
      if (filters.search.trim()) {
        const query = filters.search.toLowerCase().trim();
        const matchesPosition = job.position.toLowerCase().includes(query);
        const matchesCompany = job.company.toLowerCase().includes(query);
        const matchesLocation = job.location ? job.location.toLowerCase().includes(query) : false;
        if (!matchesPosition && !matchesCompany && !matchesLocation) {
          return false;
        }
      }

      // 2. Tech stack filter
      if (filters.technologies.length > 0) {
        const hasSelectedTech = filters.technologies.some((tech) =>
          job.tech_stack.map((t) => t.toLowerCase()).includes(tech.toLowerCase())
        );
        if (!hasSelectedTech) {
          return false;
        }
      }

      // 3. Date range filter
      if (filters.dateRange !== 'all') {
        const jobDate = new Date(job.created_at).getTime();
        const diffMs = now - jobDate;

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
      if (filters.experienceLevel !== 'all') {
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
  },
};

export default jobService;

