import type { FC } from 'react';
import { X, RotateCcw } from 'lucide-react';
import type { JobFiltersState, DateFilterOption, ExperienceLevel } from '../../types/job';
import { SearchInput, Button } from '../common';

export interface JobFiltersProps {
  filters: JobFiltersState;
  availableTechnologies: string[];
  hasActiveFilters: boolean;
  onSearchChange: (search: string) => void;
  onToggleTechnology: (tech: string) => void;
  onDateRangeChange: (range: DateFilterOption) => void;
  onExperienceChange: (exp: ExperienceLevel | 'all') => void;
  onClearFilters: () => void;
  totalResults: number;
}

const dateOptions: { label: string; value: DateFilterOption }[] = [
  { label: 'All Dates', value: 'all' },
  { label: 'Last 24 hours', value: '24h' },
  { label: 'Last 7 days', value: '7d' },
  { label: 'Last 30 days', value: '30d' },
];

const experienceOptions: { label: string; value: ExperienceLevel | 'all' }[] = [
  { label: 'All Levels', value: 'all' },
  { label: 'Internship', value: 'Internship' },
  { label: 'Entry-level', value: 'Entry-level' },
  { label: 'Junior', value: 'Junior' },
];

// Highlight top 10 most common tech tags for quick filtering
const priorityTechs = [
  'React',
  'TypeScript',
  'Node.js',
  'Python',
  'Go',
  'Java',
  'Tailwind CSS',
  'Docker',
  'PostgreSQL',
  'Kubernetes',
];

export const JobFilters: FC<JobFiltersProps> = ({
  filters,
  hasActiveFilters,
  onSearchChange,
  onToggleTechnology,
  onDateRangeChange,
  onExperienceChange,
  onClearFilters,
}) => {
  return (
    <div className="space-y-3 p-4 border border-[#E5E5E5] rounded-lg bg-[#FFFFFF]">
      {/* Primary Row: Search + Select Dropdowns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Search */}
        <div className="lg:col-span-2">
          <SearchInput
            placeholder="Search by position, company, or location..."
            value={filters.search}
            onChange={(e) => onSearchChange(e.target.value)}
            onClear={() => onSearchChange('')}
          />
        </div>

        {/* Date Filter */}
        <div>
          <select
            value={filters.dateRange}
            onChange={(e) => onDateRangeChange(e.target.value as DateFilterOption)}
            aria-label="Filter by date posted"
            className="w-full h-8 bg-[#FFFFFF] text-[#171717] text-[13px] border border-[#E5E5E5] rounded-md px-2.5 focus:outline-none focus:border-[#171717] focus:ring-1 focus:ring-[#171717] transition-colors"
          >
            {dateOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Experience Level Filter */}
        <div>
          <select
            value={filters.experienceLevel}
            onChange={(e) => onExperienceChange(e.target.value as ExperienceLevel | 'all')}
            aria-label="Filter by experience level"
            className="w-full h-8 bg-[#FFFFFF] text-[#171717] text-[13px] border border-[#E5E5E5] rounded-md px-2.5 focus:outline-none focus:border-[#171717] focus:ring-1 focus:ring-[#171717] transition-colors"
          >
            {experienceOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Technology Filter Chips */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-[#E5E5E5]">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[12px] font-medium text-[#737373] mr-1">Tech:</span>
          {priorityTechs.map((tech) => {
            const isSelected = filters.technologies.includes(tech);
            return (
              <button
                key={tech}
                type="button"
                onClick={() => onToggleTechnology(tech)}
                className={`text-[12px] px-2 py-0.5 rounded border transition-colors select-none ${
                  isSelected
                    ? 'bg-[#171717] text-[#FFFFFF] border-[#171717] font-medium'
                    : 'bg-[#FAFAFA] text-[#737373] border-[#E5E5E5] hover:bg-[#F5F5F5] hover:text-[#171717]'
                }`}
              >
                {tech}
                {isSelected && <X size={11} className="inline ml-1 -mt-0.5" />}
              </button>
            );
          })}
        </div>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <Button
            size="sm"
            variant="ghost"
            onClick={onClearFilters}
            icon={<RotateCcw size={12} />}
            className="text-[12px] text-[#737373] hover:text-[#171717] shrink-0 self-start sm:self-auto"
          >
            Clear filters
          </Button>
        )}
      </div>
    </div>
  );
};

export default JobFilters;

