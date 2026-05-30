import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTranslation } from 'react-i18next';

import DashboardScreen from '@/screens/DashboardScreen';
import MembersScreen from '@/screens/MembersScreen';
import CollectionsScreen from '@/screens/CollectionsScreen';
import LoansScreen from '@/screens/LoansScreen';
import MoreStack from './MoreStack';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';
import { AppTabsParamList } from './types';

const Tab = createBottomTabNavigator<AppTabsParamList>();

const ICONS: Record<keyof AppTabsParamList, keyof typeof Ionicons.glyphMap> = {
  Dashboard: 'planet',
  Members: 'people',
  Collections: 'cash',
  Loans: 'briefcase',
  More: 'menu',
};

function TabBarBackground() {
  if (Platform.OS === 'ios') {
    return (
      <BlurView
        intensity={50}
        tint="dark"
        style={[StyleSheet.absoluteFillObject, styles.blurBg]}
      />
    );
  }
  return <View style={[StyleSheet.absoluteFillObject, styles.androidBg]} />;
}

export default function AppTabs() {
  const { t } = useTranslation();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: colors.orange,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabelStyle: {
          fontFamily: fonts.medium,
          fontSize: 11,
          marginBottom: 4,
        },
        tabBarStyle: {
          position: 'absolute',
          left: 16,
          right: 16,
          bottom: 16,
          height: 68,
          borderRadius: 24,
          borderTopWidth: 0,
          borderWidth: 1,
          borderColor: colors.glassBorder,
          backgroundColor: 'transparent',
          elevation: 12,
          shadowColor: colors.pink,
          shadowOpacity: 0.25,
          shadowRadius: 18,
          shadowOffset: { width: 0, height: 8 },
          paddingTop: 8,
        },
        tabBarBackground: () => <TabBarBackground />,
        tabBarIcon: ({ color, focused }) => (
          <View style={focused ? styles.iconFocused : styles.icon}>
            <Ionicons name={ICONS[route.name]} size={20} color={color} />
          </View>
        ),
      })}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{ tabBarLabel: t('tabs.dashboard') }}
      />
      <Tab.Screen
        name="Members"
        component={MembersScreen}
        options={{ tabBarLabel: t('tabs.members') }}
      />
      <Tab.Screen
        name="Collections"
        component={CollectionsScreen}
        options={{ tabBarLabel: t('tabs.collections') }}
      />
      <Tab.Screen
        name="Loans"
        component={LoansScreen}
        options={{ tabBarLabel: t('tabs.loans') }}
      />
      <Tab.Screen
        name="More"
        component={MoreStack}
        options={{ tabBarLabel: t('tabs.more') }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  blurBg: {
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: 'rgba(11,20,55,0.55)',
  },
  androidBg: {
    borderRadius: 24,
    backgroundColor: 'rgba(20,27,69,0.92)',
  },
  icon: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconFocused: {
    width: 32,
    height: 32,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,140,41,0.18)',
    borderWidth: 1,
    borderColor: 'rgba(255,140,41,0.45)',
  },
});
