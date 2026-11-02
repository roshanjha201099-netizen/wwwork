import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, helperText, error, leftIcon, rightIcon, className, id, disabled, ...props }, ref) => {
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
          {leftIcon && (
            <span className="absolute left-2.5 text-[#737373] pointer-events-none flex items-center justify-center">
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            className={cn(
              'w-full h-8 bg-[#FFFFFF] text-[#171717] text-[14px] placeholder:text-[#A3A3A3]',
              'border border-[#E5E5E5] rounded-md px-3 transition-colors duration-150',
              'focus:outline-none focus:border-[#171717] focus:ring-1 focus:ring-[#171717]',
              'disabled:bg-[#F5F5F5] disabled:text-[#A3A3A3] disabled:cursor-not-allowed',
              leftIcon ? 'pl-8' : '',
              rightIcon ? 'pr-8' : '',
              error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : '',
              className
            )}
            {...props}
          />
          {rightIcon && (
            <span className="absolute right-2.5 text-[#737373] pointer-events-none flex items-center justify-center">
              {rightIcon}
            </span>
          )}
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

Input.displayName = 'Input';

export default Input;
