import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';

import SplashScreen from '@/screens/auth/SplashScreen';
import LoginScreen from '@/screens/auth/LoginScreen';
import PinScreen from '@/screens/auth/PinScreen';
import AppShell from '@/screens/AppShell';

import DashboardScreen from '@/screens/DashboardScreen';
import MembersScreen from '@/screens/MembersScreen';
import CollectionsScreen from '@/screens/CollectionsScreen';
import LoansScreen from '@/screens/LoansScreen';
import MoreScreen from '@/screens/MoreScreen';
import ReportsScreen from '@/screens/ReportsScreen';
import AnnouncementsScreen from '@/screens/AnnouncementsScreen';
import AttendanceScreen from '@/screens/AttendanceScreen';
import ProfileScreen from '@/screens/ProfileScreen';

function RequireAuth({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  if (!isAuthenticated) return <Navigate to="/" replace />;
  return <>{children}</>;
}

export default function App() {
  return (
    <div className="app-shell">
      <Routes>
        {/* Auth */}
        <Route path="/" element={<SplashScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/pin" element={<PinScreen />} />

        {/* Authenticated app with bottom tab shell */}
        <Route
          element={
            <RequireAuth>
              <AppShell />
            </RequireAuth>
          }
        >
          <Route path="/home" element={<DashboardScreen />} />
          <Route path="/members" element={<MembersScreen />} />
          <Route path="/collections" element={<CollectionsScreen />} />
          <Route path="/loans" element={<LoansScreen />} />
          <Route path="/more" element={<MoreScreen />} />
          <Route path="/more/reports" element={<ReportsScreen />} />
          <Route path="/more/announcements" element={<AnnouncementsScreen />} />
          <Route path="/more/attendance" element={<AttendanceScreen />} />
          <Route path="/more/profile" element={<ProfileScreen />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
