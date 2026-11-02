import type { FC } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from '../components/layout';
import {
  DashboardPage,
  ApplicationsPage,
  ProfilePage,
  DesignPreviewPage,
  LoginPage,
  SignupPage,
} from '../pages';

export const AppRoutes: FC = () => {
  return (
    <Routes>
      {/* Default route */}
      <Route path="/" element={<Navigate to="/design-preview" replace />} />

      {/* Authentication routes (no sidebar or dashboard header) */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* Internal application routes (with AppLayout shell) */}
      <Route
        path="/dashboard"
        element={
          <AppLayout>
            <DashboardPage />
          </AppLayout>
        }
      />
      <Route
        path="/applications"
        element={
          <AppLayout>
            <ApplicationsPage />
          </AppLayout>
        }
      />
      <Route
        path="/profile"
        element={
          <AppLayout>
            <ProfilePage />
          </AppLayout>
        }
      />
      <Route
        path="/design-preview"
        element={
          <AppLayout>
            <DesignPreviewPage />
          </AppLayout>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/design-preview" replace />} />
    </Routes>
  );
};

export default AppRoutes;
