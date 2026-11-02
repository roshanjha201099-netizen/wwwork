import type { FC } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from '../components/layout';
import { ProtectedRoute } from '../components/auth';
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

      {/* Authentication routes (independent, no sidebar/header) */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* Protected application routes (wrapped in AppLayout & ProtectedRoute) */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <AppLayout>
              <DashboardPage />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/applications"
        element={
          <ProtectedRoute>
            <AppLayout>
              <ApplicationsPage />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <AppLayout>
              <ProfilePage />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      {/* Public preview route */}
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
