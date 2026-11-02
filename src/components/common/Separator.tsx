import type { FC, HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

export interface SeparatorProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
}

export const Separator: FC<SeparatorProps> = ({
  orientation = 'horizontal',
  className,
  ...props
}) => {
  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={cn(
        'bg-[#E5E5E5] shrink-0',
        orientation === 'horizontal' ? 'h-[1px] w-full' : 'w-[1px] h-full',
        className
      )}
      {...props}
    />
  );
};

export default Separator;
