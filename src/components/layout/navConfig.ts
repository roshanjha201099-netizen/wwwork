import type { ComponentType } from 'react';
import type { LucideProps } from 'lucide-react';
import {
  LayoutDashboard,
  BriefcaseBusiness,
  UserRound,
  Layers,
  LogIn,
  UserPlus,
} from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
  icon: ComponentType<LucideProps>;
}

export const primaryNavItems: NavItem[] = [
  {
    label: 'Overview',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'My Applications',
    href: '/applications',
    icon: BriefcaseBusiness,
  },
  {
    label: 'Profile',
    href: '/profile',
    icon: UserRound,
  },
];

export const secondaryNavItems: NavItem[] = [
  {
    label: 'Design Preview',
    href: '/design-preview',
    icon: Layers,
  },
  {
    label: 'Login UI',
    href: '/login',
    icon: LogIn,
  },
  {
    label: 'Signup UI',
    href: '/signup',
    icon: UserPlus,
  },
];

export const routeTitles: Record<string, string> = {
  '/dashboard': 'Overview',
  '/applications': 'My Applications',
  '/profile': 'Profile',
  '/design-preview': 'Design Preview',
  '/login': 'Sign in',
  '/signup': 'Create account',
};

export function getPageTitle(pathname: string): string {
  if (routeTitles[pathname]) {
    return routeTitles[pathname];
  }
  const matchedKey = Object.keys(routeTitles).find((key) => pathname.startsWith(key));
  if (matchedKey) {
    return routeTitles[matchedKey];
  }
  return 'Job Tracker';
}
