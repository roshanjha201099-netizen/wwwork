import { useState, useMemo, useCallback } from 'react';
import { mockJobs } from '../data/mockJobs';
import { jobService } from '../services/jobService';
import type { Job, JobFiltersState, DateFilterOption, ExperienceLevel } from '../types/job';

const DEFAULT_PAGE_SIZE = 10;

const initialFilters: JobFiltersState = {
  search: '',
  technologies: [],
  dateRange: 'all',
  experienceLevel: 'all',
};

export function useJobs(initialPageSize = DEFAULT_PAGE_SIZE) {
  const [allJobs] = useState<Job[]>(mockJobs);
  const [filters, setFilters] = useState<JobFiltersState>(initialFilters);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = initialPageSize;

  // Filter jobs based on current filter state
  const filteredJobs = useMemo(() => {
    return jobService.filterJobs(allJobs, filters);
  }, [allJobs, filters]);

  // Total pages
  const totalPages = Math.max(1, Math.ceil(filteredJobs.length / pageSize));

  // Ensure current page does not exceed total pages when filter shrinks results
  const safeCurrentPage = Math.min(currentPage, totalPages);

  // Paginated slice
  const paginatedJobs = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * pageSize;
    return filteredJobs.slice(startIndex, startIndex + pageSize);
  }, [filteredJobs, safeCurrentPage, pageSize]);

  // Set search query and reset pagination to page 1
  const setSearch = useCallback((search: string) => {
    setFilters((prev) => ({ ...prev, search }));
    setCurrentPage(1);
  }, []);

  // Toggle technology filter selection and reset pagination to page 1
  const toggleTechnology = useCallback((tech: string) => {
    setFilters((prev) => {
      const exists = prev.technologies.includes(tech);
      const technologies = exists
        ? prev.technologies.filter((t) => t !== tech)
        : [...prev.technologies, tech];
      return { ...prev, technologies };
    });
    setCurrentPage(1);
  }, []);

  // Set date range and reset pagination to page 1
  const setDateRange = useCallback((dateRange: DateFilterOption) => {
    setFilters((prev) => ({ ...prev, dateRange }));
    setCurrentPage(1);
  }, []);

  // Set experience level and reset pagination to page 1
  const setExperienceLevel = useCallback((experienceLevel: ExperienceLevel | 'all') => {
    setFilters((prev) => ({ ...prev, experienceLevel }));
    setCurrentPage(1);
  }, []);

  // Clear all filters and reset pagination to page 1
  const clearFilters = useCallback(() => {
    setFilters(initialFilters);
    setCurrentPage(1);
  }, []);

  // Page navigation
  const goToPage = useCallback((page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  }, [totalPages]);

  const nextPage = useCallback(() => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  }, [totalPages]);

  const prevPage = useCallback(() => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  }, []);

  // All unique available tech stack options
  const availableTechnologies = useMemo(() => {
    return jobService.getUniqueTechnologies();
  }, []);

  const hasActiveFilters =
    Boolean(filters.search.trim()) ||
    filters.technologies.length > 0 ||
    filters.dateRange !== 'all' ||
    filters.experienceLevel !== 'all';

  return {
    jobs: paginatedJobs,
    allFilteredJobs: filteredJobs,
    totalJobsCount: filteredJobs.length,
    catalogTotalCount: allJobs.length,
    currentPage: safeCurrentPage,
    totalPages,
    pageSize,
    filters,
    availableTechnologies,
    hasActiveFilters,
    setSearch,
    toggleTechnology,
    setDateRange,
    setExperienceLevel,
    clearFilters,
    goToPage,
    nextPage,
    prevPage,
  };
}

export default useJobs;

