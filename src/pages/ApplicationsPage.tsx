import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { BriefcaseBusiness, ArrowRight, AlertCircle, RotateCcw } from 'lucide-react';
import { useAppliedJobs } from '../hooks/useApplications';
import { JobList } from '../components/jobs';
import { Badge, Button } from '../components/common';

export const ApplicationsPage: FC = () => {
  const { appliedJobs, removeApplication, appliedCount, isLoading, error, retry } = useAppliedJobs();

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="space-y-1">
        <div className="flex items-center gap-2.5">
          <h2 className="text-[22px] sm:text-[24px] font-semibold text-[#171717] tracking-tight">
            My Applications
          </h2>
          <Badge variant="secondary" className="font-mono text-[12px]">
            {appliedCount} {appliedCount === 1 ? 'application' : 'applications'}
          </Badge>
        </div>
        <p className="text-[13px] text-[#737373]">
          Track and manage the roles you have submitted applications for.
        </p>
      </div>

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
          <p>Loading your applications...</p>
        </div>
      )}

      {/* Applied Jobs Content */}
      {!isLoading && !error && appliedJobs.length === 0 && (
        <div className="py-16 px-4 text-center border border-dashed border-[#E5E5E5] rounded-lg bg-[#FAFAFA] flex flex-col items-center justify-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#FFFFFF] border border-[#E5E5E5] flex items-center justify-center text-[#737373]">
            <BriefcaseBusiness size={20} />
          </div>
          <div className="space-y-1">
            <h4 className="text-[15px] font-medium text-[#171717]">
              No applications recorded yet
            </h4>
            <p className="text-[13px] text-[#737373] max-w-sm mx-auto">
              Explore open positions on the dashboard and mark listings as applied to track your pipeline here.
            </p>
          </div>
          <Link to="/dashboard" className="mt-2">
            <Button size="sm" variant="primary" icon={<ArrowRight size={14} />} iconPosition="right">
              Browse Job Opportunities
            </Button>
          </Link>
        </div>
      )}

      {!isLoading && !error && appliedJobs.length > 0 && (
        <JobList
          jobs={appliedJobs}
          showRemoveButton
          onRemoveApplication={removeApplication}
        />
      )}
    </div>
  );
};

export default ApplicationsPage;
