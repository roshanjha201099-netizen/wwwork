import type { FC, ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { selectAuthInitialized, selectIsAuthenticated } from '../../store/selectors/authSelectors';
import { config } from '../../config/env';

export interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const location = useLocation();
  const initialized = useAppSelector(selectAuthInitialized);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  // Initial session check is in-flight: show clean neutral loading indicator
  if (!initialized) {
    return (
      <div className="min-h-screen bg-[#FFFFFF] flex flex-col items-center justify-center p-4 text-[13px] text-[#737373] space-y-2">
        <div className="w-5 h-5 border-2 border-[#171717] border-t-transparent rounded-full animate-spin" />
        <p>Verifying session...</p>
      </div>
    );
  }

  // In API mode, enforce authentication. In mock mode, allow open demo exploration.
  if (config.isApi && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
