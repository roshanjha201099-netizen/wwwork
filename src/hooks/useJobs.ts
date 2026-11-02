import { useState, useEffect, useCallback, useTransition } from 'react';
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
  const [jobs, setJobs] = useState<Job[]>([]);
  const [totalJobsCount, setTotalJobsCount] = useState<number>(0);
  const [catalogTotalCount, setCatalogTotalCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [availableTechnologies, setAvailableTechnologies] = useState<string[]>([]);

  const [filters, setFilters] = useState<JobFiltersState>(initialFilters);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [, startTransition] = useTransition();

  // Load available technologies on mount via service
  useEffect(() => {
    let isMounted = true;
    jobService
      .getUniqueTechnologies()
      .then((techs) => {
        if (isMounted) setAvailableTechnologies(techs);
      })
      .catch(() => {
        // Non-critical; fallback to empty list
      });
    return () => {
      isMounted = false;
    };
  }, []);

  // Fetch jobs whenever filters or pagination changes
  useEffect(() => {
    let isMounted = true;

    jobService
      .getJobs({
        page: currentPage,
        pageSize: initialPageSize,
        search: filters.search,
        technologies: filters.technologies,
        dateRange: filters.dateRange,
        experienceLevel: filters.experienceLevel,
      })
      .then((response) => {
        if (isMounted) {
          startTransition(() => {
            setJobs(response.jobs);
            setTotalJobsCount(response.total);
            setTotalPages(response.totalPages);

            const hasFilters =
              Boolean(filters.search.trim()) ||
              filters.technologies.length > 0 ||
              filters.dateRange !== 'all' ||
              filters.experienceLevel !== 'all';

            if (!hasFilters) {
              setCatalogTotalCount(response.total);
            }
          });
          setIsLoading(false);
          setError(null);
        }
      })
      .catch((err: unknown) => {
        if (isMounted) {
          const message = err instanceof Error ? err.message : 'Failed to fetch job opportunities.';
          setError(message);
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [currentPage, initialPageSize, filters]);

  const retry = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await jobService.getJobs({
        page: currentPage,
        pageSize: initialPageSize,
        search: filters.search,
        technologies: filters.technologies,
        dateRange: filters.dateRange,
        experienceLevel: filters.experienceLevel,
      });
      setJobs(response.jobs);
      setTotalJobsCount(response.total);
      setTotalPages(response.totalPages);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to fetch job opportunities.');
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, initialPageSize, filters]);

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

  const hasActiveFilters =
    Boolean(filters.search.trim()) ||
    filters.technologies.length > 0 ||
    filters.dateRange !== 'all' ||
    filters.experienceLevel !== 'all';

  return {
    jobs,
    totalJobsCount,
    catalogTotalCount: catalogTotalCount || totalJobsCount,
    currentPage,
    totalPages,
    pageSize: initialPageSize,
    filters,
    availableTechnologies,
    hasActiveFilters,
    isLoading,
    error,
    retry,
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
