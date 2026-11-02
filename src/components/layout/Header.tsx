import type { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { getPageTitle } from './navConfig';

export interface HeaderProps {
  onMenuClick?: () => void;
}

export const Header: FC<HeaderProps> = ({ onMenuClick }) => {
  const location = useLocation();
  const title = getPageTitle(location.pathname);

  return (
    <header className="h-16 border-b border-[#E5E5E5] bg-[#FFFFFF] px-4 sm:px-6 flex items-center justify-between sticky top-0 z-20 shrink-0">
      <div className="flex items-center gap-3">
        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open navigation menu"
          className="md:hidden p-1.5 -ml-1 text-[#737373] hover:text-[#171717] hover:bg-[#F5F5F5] rounded-md transition-colors focus:outline-none"
        >
          <Menu size={20} />
        </button>

        {/* Dynamic page title */}
        <h1 className="text-[18px] sm:text-[20px] font-semibold text-[#171717] tracking-tight">
          {title}
        </h1>
      </div>

      {/* Right side avatar / initials */}
      <div className="flex items-center gap-2">
        <div
          title="Jane Doe (jane.doe@company.internal)"
          className="w-8 h-8 rounded-md bg-[#171717] text-[#FFFFFF] flex items-center justify-center text-[12px] font-medium select-none cursor-default"
        >
          JD
        </div>
      </div>
    </header>
  );
};

export default Header;
