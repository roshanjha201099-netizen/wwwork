import { forwardRef, type InputHTMLAttributes } from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void;
  shortcutHint?: string;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ value, onChange, onClear, shortcutHint, className, disabled, ...props }, ref) => {
    const hasValue = value !== undefined && value !== '';

    return (
      <div className="relative flex items-center w-full">
        <Search
          size={16}
          className="absolute left-2.5 text-[#737373] pointer-events-none"
        />
        <input
          ref={ref}
          type="text"
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={cn(
            'w-full h-8 bg-[#FFFFFF] text-[#171717] text-[14px] placeholder:text-[#A3A3A3]',
            'border border-[#E5E5E5] rounded-md pl-8 pr-8 transition-colors duration-150',
            'focus:outline-none focus:border-[#171717] focus:ring-1 focus:ring-[#171717]',
            'disabled:bg-[#F5F5F5] disabled:text-[#A3A3A3] disabled:cursor-not-allowed',
            className
          )}
          {...props}
        />
        {hasValue && onClear ? (
          <button
            type="button"
            onClick={onClear}
            disabled={disabled}
            className="absolute right-2 text-[#737373] hover:text-[#171717] p-0.5 rounded transition-colors focus:outline-none"
            aria-label="Clear search"
          >
            <X size={14} />
          </button>
        ) : shortcutHint ? (
          <kbd className="absolute right-2 text-[11px] font-mono text-[#737373] bg-[#F5F5F5] border border-[#E5E5E5] px-1 py-0.5 rounded pointer-events-none select-none">
            {shortcutHint}
          </kbd>
        ) : null}
      </div>
    );
  }
);

SearchInput.displayName = 'SearchInput';

export default SearchInput;
