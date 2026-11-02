import type { FC, HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/cn';
import type { BadgeVariant } from '../../types';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  icon?: ReactNode;
  dot?: boolean;
}

export const Badge: FC<BadgeProps> = ({
  children,
  variant = 'secondary',
  icon,
  dot = false,
  className,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center gap-1.5 px-2 py-0.5 text-[12px] font-medium rounded border select-none transition-colors';

  const variantStyles: Record<BadgeVariant, string> = {
    default: 'bg-[#171717] text-[#FFFFFF] border-[#171717]',
    secondary: 'bg-[#F5F5F5] text-[#171717] border-[#E5E5E5]',
    outline: 'bg-transparent text-[#737373] border-[#E5E5E5]',
    muted: 'bg-[#FAFAFA] text-[#737373] border-[#E5E5E5]',
  };

  return (
    <span className={cn(baseStyles, variantStyles[variant], className)} {...props}>
      {dot && (
        <span
          className={cn(
            'w-1.5 h-1.5 rounded-full',
            variant === 'default' ? 'bg-[#FFFFFF]' : 'bg-[#737373]'
          )}
        />
      )}
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </span>
  );
};

export default Badge;
