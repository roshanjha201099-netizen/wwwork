import type { FC } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from '../components/layout';
import {
  DashboardPage,
  ApplicationsPage,
  ProfilePage,
  DesignPreviewPage,
} from '../pages';

export const AppRoutes: FC = () => {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/design-preview" replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/applications" element={<ApplicationsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/design-preview" element={<DesignPreviewPage />} />
        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/design-preview" replace />} />
      </Routes>
    </AppLayout>
  );
};

export default AppRoutes;
