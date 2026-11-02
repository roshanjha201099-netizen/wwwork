import { forwardRef, useState, type InputHTMLAttributes } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ label, helperText, error, className, id, disabled, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-[13px] font-medium text-[#171717] select-none"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          <input
            ref={ref}
            id={inputId}
            type={showPassword ? 'text' : 'password'}
            disabled={disabled}
            className={cn(
              'w-full h-8 bg-[#FFFFFF] text-[#171717] text-[14px] placeholder:text-[#A3A3A3]',
              'border border-[#E5E5E5] rounded-md pl-3 pr-8 transition-colors duration-150',
              'focus:outline-none focus:border-[#171717] focus:ring-1 focus:ring-[#171717]',
              'disabled:bg-[#F5F5F5] disabled:text-[#A3A3A3] disabled:cursor-not-allowed',
              error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : '',
              className
            )}
            {...props}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            disabled={disabled}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            className="absolute right-2 text-[#737373] hover:text-[#171717] p-1 rounded transition-colors focus:outline-none disabled:opacity-50"
          >
            {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        </div>
        {error ? (
          <p className="text-[12px] text-red-600">{error}</p>
        ) : helperText ? (
          <p className="text-[12px] text-[#737373]">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;
