import { useState, type FC, type ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { MobileNavigation } from './MobileNavigation';

export interface AppLayoutProps {
  children?: ReactNode;
}

export const AppLayout: FC<AppLayoutProps> = ({ children }) => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#171717] flex">
      {/* Desktop Sidebar (fixed 240px, full viewport height) */}
      <div className="hidden md:flex md:w-60 md:shrink-0 md:sticky md:top-0 md:h-screen">
        <Sidebar />
      </div>

      {/* Mobile Navigation Drawer */}
      <MobileNavigation
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
      />

      {/* Main Section */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <Header onMenuClick={() => setIsMobileNavOpen(true)} />
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-6 sm:p-8">
          <div className="w-full max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
