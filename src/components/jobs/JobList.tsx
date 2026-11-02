import type { FC } from 'react';
import { SearchX } from 'lucide-react';
import type { Job } from '../../types/job';
import { JobCard } from './JobCard';
import { Button } from '../common';

export interface JobListProps {
  jobs: Job[];
  onRemoveApplication?: (jobId: string) => void;
  showRemoveButton?: boolean;
  onClearFilters?: () => void;
}

export const JobList: FC<JobListProps> = ({
  jobs,
  onRemoveApplication,
  showRemoveButton = false,
  onClearFilters,
}) => {
  if (jobs.length === 0) {
    return (
      <div className="py-16 px-4 text-center border border-dashed border-[#E5E5E5] rounded-lg bg-[#FAFAFA] flex flex-col items-center justify-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[#FFFFFF] border border-[#E5E5E5] flex items-center justify-center text-[#737373]">
          <SearchX size={20} />
        </div>
        <div className="space-y-1">
          <h4 className="text-[15px] font-medium text-[#171717]">
            No matching opportunities found
          </h4>
          <p className="text-[13px] text-[#737373] max-w-sm mx-auto">
            Try adjusting your search terms, removing technology filters, or resetting the date filter.
          </p>
        </div>
        {onClearFilters && (
          <Button size="sm" variant="secondary" onClick={onClearFilters} className="mt-1">
            Reset all filters
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          onRemoveApplication={onRemoveApplication}
          showRemoveButton={showRemoveButton}
        />
      ))}
    </div>
  );
};

export default JobList;
