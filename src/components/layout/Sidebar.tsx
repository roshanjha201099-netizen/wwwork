import type { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { primaryNavItems, secondaryNavItems } from './navConfig';

export interface SidebarProps {
  onNavigate?: () => void;
  className?: string;
}

export const Sidebar: FC<SidebarProps> = ({ onNavigate, className = '' }) => {
  return (
    <aside
      className={`w-60 h-full flex flex-col bg-[#FFFFFF] border-r border-[#E5E5E5] select-none ${className}`}
    >
      {/* Logo Section - 64px to align with Header */}
      <div className="h-16 px-5 border-b border-[#E5E5E5] flex items-center gap-3 shrink-0">
        <div className="w-6 h-6 rounded bg-[#171717] flex items-center justify-center text-[#FFFFFF] shrink-0">
          <span className="text-[12px] font-bold font-mono">JT</span>
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-[14px] text-[#171717] tracking-tight leading-tight">
            Job Tracker
          </span>
          <span className="text-[11px] text-[#737373] leading-tight">
            Internal Platform
          </span>
        </div>
      </div>

      {/* Navigation Section */}
      <div className="flex-1 py-4 px-3 overflow-y-auto space-y-6">
        {/* Main Navigation */}
        <div className="space-y-1">
          <p className="px-2 pb-1.5 text-[11px] font-medium uppercase tracking-wider text-[#A3A3A3]">
            Workspace
          </p>
          <nav className="space-y-1">
            {primaryNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.href}
                  to={item.href}
                  onClick={onNavigate}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-2.5 py-2 rounded-md text-[14px] transition-colors duration-150 ${
                      isActive
                        ? 'bg-[#F5F5F5] text-[#171717] font-medium'
                        : 'text-[#737373] hover:text-[#171717] hover:bg-[#F5F5F5]'
                    }`
                  }
                >
                  <Icon size={18} className="shrink-0" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Design System Preview Navigation */}
        <div className="space-y-1 pt-2 border-t border-[#E5E5E5]">
          <p className="px-2 pb-1.5 text-[11px] font-medium uppercase tracking-wider text-[#A3A3A3]">
            Developer
          </p>
          <nav className="space-y-1">
            {secondaryNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.href}
                  to={item.href}
                  onClick={onNavigate}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-2.5 py-2 rounded-md text-[14px] transition-colors duration-150 ${
                      isActive
                        ? 'bg-[#F5F5F5] text-[#171717] font-medium'
                        : 'text-[#737373] hover:text-[#171717] hover:bg-[#F5F5F5]'
                    }`
                  }
                >
                  <Icon size={18} className="shrink-0" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Bottom User Section */}
      <div className="p-3 border-t border-[#E5E5E5] shrink-0">
        <div className="flex items-center gap-3 px-2 py-2 rounded-md bg-[#FAFAFA] border border-[#E5E5E5]">
          <div className="w-8 h-8 rounded-md bg-[#171717] text-[#FFFFFF] flex items-center justify-center text-[12px] font-medium shrink-0">
            JD
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[13px] font-medium text-[#171717] truncate leading-tight">
              Jane Doe
            </span>
            <span className="text-[11px] text-[#737373] truncate leading-tight">
              jane.doe@company.internal
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

