import React from 'react';
import { useAuthStore } from '@/store/authStore';
import AuthStack from './AuthStack';
import AppTabs from './AppTabs';

export default function RootNavigator() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  return isAuthenticated ? <AppTabs /> : <AuthStack />;
}
