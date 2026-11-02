import type { FC } from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';
import { useJobs } from '../hooks/useJobs';
import { JobFilters, JobList, JobPagination } from '../components/jobs';
import { Badge, Button } from '../components/common';

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

      {/* Error State */}
      {error && (
        <div className="p-4 border border-red-200 bg-red-50/50 rounded-lg text-[13px] text-red-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <AlertCircle size={16} className="shrink-0" />
            <span>{error}</span>
          </div>
          <Button size="sm" variant="outline" onClick={retry} icon={<RotateCcw size={12} />}>
            Retry
          </Button>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="py-12 text-center text-[13px] text-[#737373] space-y-2">
          <div className="inline-block w-5 h-5 border-2 border-[#171717] border-t-transparent rounded-full animate-spin" />
          <p>Loading opportunities...</p>
        </div>
      )}

      {/* Job Cards List */}
      {!isLoading && !error && (
        <>
          <JobList
            jobs={jobs}
            onClearFilters={hasActiveFilters ? clearFilters : undefined}
          />

          <JobPagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalCount={totalJobsCount}
            pageSize={pageSize}
            onPageChange={goToPage}
            onPrevPage={prevPage}
            onNextPage={nextPage}
          />
        </>
      )}
    </div>
  );
};

export default DashboardPage;
