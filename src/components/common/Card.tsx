import type { FC, HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary';
}

export const Card: FC<CardProps> = ({
  children,
  variant = 'default',
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        'rounded-lg border border-[#E5E5E5]',
        variant === 'default' ? 'bg-[#FFFFFF]' : 'bg-[#FAFAFA]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader: FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={cn('p-4 border-b border-[#E5E5E5] flex flex-col gap-1', className)} {...props}>
      {children}
    </div>
  );
};

export const CardTitle: FC<HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <h3
      className={cn('text-[16px] font-semibold text-[#171717] tracking-tight leading-snug', className)}
      {...props}
    >
      {children}
    </h3>
  );
};

export const CardDescription: FC<HTMLAttributes<HTMLParagraphElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <p className={cn('text-[13px] text-[#737373] leading-normal', className)} {...props}>
      {children}
    </p>
  );
};

export const CardContent: FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={cn('p-4 text-[14px] text-[#171717]', className)} {...props}>
      {children}
    </div>
  );
};

export const CardFooter: FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={cn('p-4 border-t border-[#E5E5E5] flex items-center justify-between', className)}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
