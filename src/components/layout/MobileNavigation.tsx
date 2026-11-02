import { useEffect, type FC } from 'react';
import { X } from 'lucide-react';
import { Sidebar } from './Sidebar';

export interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNavigation: FC<MobileNavigationProps> = ({ isOpen, onClose }) => {
  // Prevent body scrolling while drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden flex" role="dialog" aria-modal="true">
      {/* Subtle backdrop */}
      <div
        className="fixed inset-0 bg-black/25 backdrop-blur-[1px] transition-opacity duration-150"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-in drawer */}
      <div className="relative w-64 max-w-[80vw] h-full bg-[#FFFFFF] flex flex-col shadow-lg z-10 animate-in slide-in-from-left duration-150">
        {/* Close Button Header */}
        <div className="absolute top-4 right-3 z-20">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation"
            className="p-1.5 text-[#737373] hover:text-[#171717] hover:bg-[#F5F5F5] rounded-md transition-colors focus:outline-none"
          >
            <X size={18} />
          </button>
        </div>

        {/* Sidebar content */}
        <Sidebar onNavigate={onClose} className="w-full border-r-0" />
      </div>
    </div>
  );
};

export default MobileNavigation;

