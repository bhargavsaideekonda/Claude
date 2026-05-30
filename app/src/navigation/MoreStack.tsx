import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MoreHomeScreen from '@/screens/MoreHomeScreen';
import ReportsScreen from '@/screens/ReportsScreen';
import AnnouncementsScreen from '@/screens/AnnouncementsScreen';
import AttendanceScreen from '@/screens/AttendanceScreen';
import ProfileScreen from '@/screens/ProfileScreen';
import { MoreStackParamList } from './types';

const Stack = createNativeStackNavigator<MoreStackParamList>();

export default function MoreStack() {
  return (
    <Stack.Navigator
      initialRouteName="MoreHome"
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: 'transparent' },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="MoreHome" component={MoreHomeScreen} />
      <Stack.Screen name="Reports" component={ReportsScreen} />
      <Stack.Screen name="Announcements" component={AnnouncementsScreen} />
      <Stack.Screen name="Attendance" component={AttendanceScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
}
