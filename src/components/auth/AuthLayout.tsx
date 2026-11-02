import type { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';

export interface AuthLayoutProps {
  children: ReactNode;
}

export const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#171717] flex flex-col justify-center items-center px-4 py-8 sm:py-12">
      <div className="w-full max-w-[400px] flex flex-col items-center">
        {/* Minimal Header with JT Logo */}
        <div className="mb-6 flex flex-col items-center gap-2">
          <Link
            to="/design-preview"
            className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-1 focus-visible:ring-[#171717] rounded-md p-1"
          >
            <div className="w-8 h-8 rounded-md bg-[#171717] text-[#FFFFFF] flex items-center justify-center font-bold text-[13px] font-mono shadow-none transition-transform group-hover:scale-105 duration-150">
              JT
            </div>
            <span className="font-semibold text-[16px] text-[#171717] tracking-tight">
              Job Tracker
            </span>
          </Link>
          <span className="text-[12px] text-[#737373]">
            Internal Operations Portal
          </span>
        </div>

        {/* Form Container */}
        <div className="w-full">
          {children}
        </div>

        {/* Minimal Footer */}
        <div className="mt-8 text-center text-[12px] text-[#A3A3A3]">
          <span>Protected internal environment &bull; Engineering Tools</span>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

