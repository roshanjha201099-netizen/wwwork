import type { FC, ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/cn';
import type { ButtonVariant, ButtonSize } from '../../types';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
}

export const Button: FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  isLoading = false,
  className,
  disabled,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-colors duration-150 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#171717] disabled:opacity-50 disabled:pointer-events-none select-none rounded-md';

  const variantStyles: Record<ButtonVariant, string> = {
    primary: 'bg-[#171717] text-[#FFFFFF] hover:bg-[#262626] border border-[#171717]',
    secondary: 'bg-[#FFFFFF] text-[#171717] border border-[#E5E5E5] hover:bg-[#F5F5F5]',
    outline: 'bg-transparent text-[#171717] border border-[#E5E5E5] hover:bg-[#F5F5F5]',
    ghost: 'bg-transparent text-[#171717] hover:bg-[#F5F5F5]',
  };

  const sizeStyles: Record<ButtonSize, string> = {
    sm: 'text-[13px] h-7 px-2.5 gap-1.5',
    md: 'text-[14px] h-8 px-3 gap-2',
    lg: 'text-[14px] h-9 px-4 gap-2',
  };

  return (
    <button
      className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-1.5" />
      ) : (
        icon && iconPosition === 'left' && <span className="inline-flex shrink-0">{icon}</span>
      )}
      {children}
      {!isLoading && icon && iconPosition === 'right' && (
        <span className="inline-flex shrink-0">{icon}</span>
      )}
    </button>
  );
};

export default Button;
