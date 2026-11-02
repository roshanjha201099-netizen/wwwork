import type { FC } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../common';

export interface JobPaginationProps {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPrevPage: () => void;
  onNextPage: () => void;
}

export const JobPagination: FC<JobPaginationProps> = ({
  currentPage,
  totalPages,
  totalCount,
  pageSize,
  onPageChange,
  onPrevPage,
  onNextPage,
}) => {
  if (totalCount === 0) return null;

  const startRecord = (currentPage - 1) * pageSize + 1;
  const endRecord = Math.min(currentPage * pageSize, totalCount);

  // Generate page numbers
  const pageNumbers: number[] = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-[#E5E5E5] text-[13px] text-[#737373]">
      <div>
        Showing <span className="font-medium text-[#171717]">{startRecord}</span>–
        <span className="font-medium text-[#171717]">{endRecord}</span> of{' '}
        <span className="font-medium text-[#171717]">{totalCount}</span> opportunities
      </div>

      <div className="flex items-center gap-1">
        {/* Previous Button */}
        <Button
          size="sm"
          variant="secondary"
          onClick={onPrevPage}
          disabled={currentPage <= 1}
          icon={<ChevronLeft size={14} />}
          aria-label="Previous page"
        >
          Previous
        </Button>

        {/* Page Numbers */}
        <div className="flex items-center gap-1 mx-1">
          {pageNumbers.map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              className={`w-7 h-7 text-[12px] font-medium rounded transition-colors ${
                page === currentPage
                  ? 'bg-[#171717] text-[#FFFFFF]'
                  : 'text-[#737373] hover:text-[#171717] hover:bg-[#F5F5F5]'
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        {/* Next Button */}
        <Button
          size="sm"
          variant="secondary"
          onClick={onNextPage}
          disabled={currentPage >= totalPages}
          icon={<ChevronRight size={14} />}
          iconPosition="right"
          aria-label="Next page"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default JobPagination;

