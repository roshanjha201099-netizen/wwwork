import { useMemo, type FC } from 'react';
import { Link } from 'react-router-dom';
import { BriefcaseBusiness, ArrowRight } from 'lucide-react';
import { useApplications } from '../hooks/useApplications';
import { mockJobs } from '../data/mockJobs';
import type { Job } from '../types/job';
import { JobList } from '../components/jobs';
import { Badge, Button } from '../components/common';

export const ApplicationsPage: FC = () => {
  const { appliedJobIds, removeApplication, appliedCount } = useApplications();

  // Resolve applied jobs from mock catalog
  const appliedJobs = useMemo(() => {
    return mockJobs.filter((job: Job) => appliedJobIds.includes(job.id));
  }, [appliedJobIds]);

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

      {/* Applied Jobs Content */}
      {appliedJobs.length === 0 ? (
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
      ) : (
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
