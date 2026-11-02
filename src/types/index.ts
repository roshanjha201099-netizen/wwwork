import type { ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export type BadgeVariant = 'default' | 'secondary' | 'outline' | 'muted';

export interface BaseComponentProps {
  className?: string;
  children?: ReactNode;
}

export * from './job';
export * from './auth';
