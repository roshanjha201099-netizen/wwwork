import type { FC } from 'react';
import { useJobs } from '../hooks/useJobs';
import { JobFilters, JobList, JobPagination } from '../components/jobs';
import { Badge } from '../components/common';

export const DashboardPage: FC = () => {
  const {
    jobs,
    totalJobsCount,
    catalogTotalCount,
    currentPage,
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
  } = useJobs(10);

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="space-y-1">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <h2 className="text-[22px] sm:text-[24px] font-semibold text-[#171717] tracking-tight">
              Job Opportunities
            </h2>
            <Badge variant="secondary" className="font-mono text-[12px]">
              {totalJobsCount} {totalJobsCount === 1 ? 'role' : 'roles'}
            </Badge>
          </div>
          {catalogTotalCount !== totalJobsCount && (
            <span className="text-[12px] text-[#737373]">
              Filtered from {catalogTotalCount} total listings
            </span>
          )}
        </div>
        <p className="text-[13px] text-[#737373]">
          Discover and track opportunities that match your skills.
        </p>
      </div>

      {/* Search and Filters */}
      <JobFilters
        filters={filters}
        availableTechnologies={availableTechnologies}
        hasActiveFilters={hasActiveFilters}
        totalResults={totalJobsCount}
        onSearchChange={setSearch}
        onToggleTechnology={toggleTechnology}
        onDateRangeChange={setDateRange}
        onExperienceChange={setExperienceLevel}
        onClearFilters={clearFilters}
      />

      {/* Job Cards List */}
      <JobList
        jobs={jobs}
        onClearFilters={hasActiveFilters ? clearFilters : undefined}
      />

      {/* Pagination */}
      <JobPagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalCount={totalJobsCount}
        pageSize={pageSize}
        onPageChange={goToPage}
        onPrevPage={prevPage}
        onNextPage={nextPage}
      />
    </div>
  );
};

export default DashboardPage;
