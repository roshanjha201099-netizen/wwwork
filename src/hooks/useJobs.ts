import { useState, useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  selectAllJobs,
  selectTotalJobs,
  selectCatalogTotalCount,
  selectCurrentPage,
  selectPageSize,
  selectTotalPages,
  selectJobFilters,
  selectJobsLoading,
  selectJobsError,
  selectHasActiveFilters,
} from '../store/selectors/jobsSelectors';
import {
  fetchJobs,
  setFilters,
  clearFilters as clearFiltersAction,
  setCurrentPage as setCurrentPageAction,
} from '../store/slices/jobsSlice';
import { jobService } from '../services/jobService';
import type { DateFilterOption, ExperienceLevel } from '../types/job';

export function useJobs(initialPageSize = 10) {
  const dispatch = useAppDispatch();

  const jobs = useAppSelector(selectAllJobs);
  const totalJobsCount = useAppSelector(selectTotalJobs);
  const catalogTotalCount = useAppSelector(selectCatalogTotalCount);
  const currentPage = useAppSelector(selectCurrentPage);
  const pageSize = useAppSelector(selectPageSize) || initialPageSize;
  const totalPages = useAppSelector(selectTotalPages);
  const filters = useAppSelector(selectJobFilters);
  const isLoading = useAppSelector(selectJobsLoading);
  const error = useAppSelector(selectJobsError);
  const hasActiveFilters = useAppSelector(selectHasActiveFilters);

  const [availableTechnologies, setAvailableTechnologies] = useState<string[]>([]);

  // Load available technologies on mount via service
  useEffect(() => {
    let isMounted = true;
    jobService
      .getUniqueTechnologies()
      .then((techs) => {
        if (isMounted) setAvailableTechnologies(techs);
      })
      .catch(() => {
        // Fallback to empty list
      });
    return () => {
      isMounted = false;
    };
  }, []);

  // Fetch jobs on mount or whenever filters/pagination change
  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch, currentPage, filters]);

  const setSearch = useCallback(
    (search: string) => {
      dispatch(setFilters({ search }));
    },
    [dispatch]
  );

  const toggleTechnology = useCallback(
    (tech: string) => {
      const exists = filters.technologies.includes(tech);
      const technologies = exists
        ? filters.technologies.filter((t) => t !== tech)
        : [...filters.technologies, tech];
      dispatch(setFilters({ technologies }));
    },
    [dispatch, filters.technologies]
  );

  const setDateRange = useCallback(
    (dateRange: DateFilterOption) => {
      dispatch(setFilters({ dateRange }));
    },
    [dispatch]
  );

  const setExperienceLevel = useCallback(
    (experienceLevel: ExperienceLevel | 'all') => {
      dispatch(setFilters({ experienceLevel }));
    },
    [dispatch]
  );

  const clearFilters = useCallback(() => {
    dispatch(clearFiltersAction());
  }, [dispatch]);

  const goToPage = useCallback(
    (page: number) => {
      dispatch(setCurrentPageAction(page));
    },
    [dispatch]
  );

  const nextPage = useCallback(() => {
    if (currentPage < totalPages) {
      dispatch(setCurrentPageAction(currentPage + 1));
    }
  }, [dispatch, currentPage, totalPages]);

  const prevPage = useCallback(() => {
    if (currentPage > 1) {
      dispatch(setCurrentPageAction(currentPage - 1));
    }
  }, [dispatch, currentPage]);

  const retry = useCallback(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  return {
    jobs,
    totalJobsCount,
    catalogTotalCount: catalogTotalCount || totalJobsCount,
    currentPage,
    totalPages,
    pageSize,
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
