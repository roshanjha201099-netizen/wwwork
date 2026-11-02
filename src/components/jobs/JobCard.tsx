import { useState, type FC } from 'react';
import {
  MapPin,
  Calendar,
  ExternalLink,
  Check,
  Building2,
  BookmarkCheck,
  AlertCircle,
} from 'lucide-react';
import type { Job } from '../../types/job';
import { useApplications } from '../../hooks/useApplications';
import { Button, Badge, Card } from '../common';

export interface JobCardProps {
  job: Job;
  onRemoveApplication?: (jobId: string) => void;
  showRemoveButton?: boolean;
}

function formatJobDate(dateStr: string): string {
  try {
    const jobDate = new Date(dateStr).getTime();
    const referenceNow = new Date('2026-11-02T10:00:00Z').getTime();
    const diffHours = Math.floor((referenceNow - jobDate) / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 24) {
      return diffHours <= 1 ? 'Just now' : `${diffHours}h ago`;
    }
    if (diffDays === 1) {
      return '1d ago';
    }
    if (diffDays < 30) {
      return `${diffDays}d ago`;
    }
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return 'Recent';
  }
}

export const JobCard: FC<JobCardProps> = ({
  job,
  onRemoveApplication,
  showRemoveButton = false,
}) => {
  const { isApplied, applyToJob, removeApplication } = useApplications();
  const applied = isApplied(job.id);
  const [urlNotice, setUrlNotice] = useState(false);

  const handleApplyClick = () => {
    if (job.apply_url && job.apply_url.trim()) {
      window.open(job.apply_url, '_blank', 'noopener,noreferrer');
    } else {
      setUrlNotice(true);
      setTimeout(() => setUrlNotice(false), 3000);
    }
  };

  const handleToggleApplied = () => {
    if (applied) {
      removeApplication(job.id);
      if (onRemoveApplication) {
        onRemoveApplication(job.id);
      }
    } else {
      applyToJob(job.id);
    }
  };

  return (
    <Card className="p-4 sm:p-5 bg-[#FFFFFF] border border-[#E5E5E5] hover:border-[#171717]/40 transition-colors duration-150">
      <div className="flex flex-col gap-3">
        {/* Top Header Row: Position title, company & Status badges */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-[16px] font-semibold text-[#171717] tracking-tight leading-snug">
                {job.position}
              </h3>
              {applied && (
                <Badge variant="default" dot className="text-[11px] py-0 px-2">
                  Applied
                </Badge>
              )}
              {job.experience_level && (
                <Badge variant="outline" className="text-[11px] py-0 px-1.5">
                  {job.experience_level}
                </Badge>
              )}
            </div>

            {/* Company & Location Metadata */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-[#737373]">
              <span className="flex items-center gap-1 font-medium text-[#171717]">
                <Building2 size={14} className="text-[#737373]" />
                {job.company}
              </span>
              {job.location && (
                <span className="flex items-center gap-1">
                  <MapPin size={13} className="text-[#A3A3A3]" />
                  {job.location}
                </span>
              )}
              <span className="flex items-center gap-1 text-[#A3A3A3]">
                <Calendar size={13} />
                {formatJobDate(job.created_at)}
              </span>
            </div>
          </div>
        </div>

        {/* Description: concise 2-3 lines */}
        <p className="text-[13px] sm:text-[14px] text-[#171717] leading-relaxed line-clamp-2">
          {job.description}
        </p>

        {/* Tech Stack Badges */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          {job.tech_stack.map((tech) => (
            <Badge key={tech} variant="secondary" className="text-[11px] font-normal">
              {tech}
            </Badge>
          ))}
        </div>

        {/* Unavailable URL notice */}
        {urlNotice && (
          <div className="p-2 border border-[#E5E5E5] rounded bg-[#FAFAFA] text-[12px] text-[#737373] flex items-center gap-1.5">
            <AlertCircle size={14} className="text-[#171717] shrink-0" />
            <span>Direct application URL is currently unavailable for this listing.</span>
          </div>
        )}

        {/* Bottom Actions Row */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#E5E5E5]">
          <div className="flex items-center gap-2">
            {/* Apply Button */}
            <Button
              size="sm"
              variant="primary"
              onClick={handleApplyClick}
              icon={<ExternalLink size={14} />}
              iconPosition="right"
            >
              Apply
            </Button>

            {/* Mark as Applied Button */}
            <Button
              size="sm"
              variant={applied ? 'secondary' : 'outline'}
              onClick={handleToggleApplied}
              icon={applied ? <Check size={14} /> : <BookmarkCheck size={14} />}
            >
              {applied ? 'Applied' : 'Mark as Applied'}
            </Button>
          </div>

          {/* Remove from applications option when displayed on My Applications */}
          {showRemoveButton && (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onRemoveApplication && onRemoveApplication(job.id)}
              className="text-[#737373] hover:text-red-600 hover:bg-red-50 text-[12px]"
            >
              Remove
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default JobCard;
