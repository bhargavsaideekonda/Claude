import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import GradientBackground from '@/components/GradientBackground';
import GlassCard from '@/components/GlassCard';
import ScreenHeader from '@/components/ScreenHeader';
import { colors, GradientName } from '@/theme/colors';
import { typography } from '@/theme/typography';
import { MoreStackParamList } from '@/navigation/types';

type Nav = NativeStackNavigationProp<MoreStackParamList, 'MoreHome'>;

interface Item {
  key: keyof MoreStackParamList;
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
  tint: GradientName;
  accent: string;
}

export default function MoreHomeScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<Nav>();

  const items: Item[] = [
    { key: 'Reports', icon: 'stats-chart', title: t('reports.title'), subtitle: t('reports.subtitle'), tint: 'glassPink', accent: colors.pink },
    { key: 'Announcements', icon: 'megaphone', title: t('announcements.title'), subtitle: t('announcements.subtitle'), tint: 'glassOrange', accent: colors.orange },
    { key: 'Attendance', icon: 'finger-print', title: t('attendance.title'), subtitle: t('attendance.subtitle'), tint: 'glassBlue', accent: colors.blue },
    { key: 'Profile', icon: 'person-circle', title: t('profile.title'), subtitle: t('profile.subtitle'), tint: 'glassPink', accent: colors.yellow },
  ];

  return (
    <GradientBackground variant="aurora">
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <ScreenHeader title={t('tabs.more')} subtitle={t('app.motto')} />

        <View style={styles.list}>
          {items.map((item, idx) => (
            <Animated.View
              key={item.key}
              entering={FadeInDown.delay(idx * 80).duration(450)}
            >
              <Pressable
                onPress={() => navigation.navigate(item.key)}
                style={({ pressed }) => [pressed && { opacity: 0.85 }]}
              >
                <GlassCard tint={item.tint} padding={16}>
                  <View style={styles.row}>
                    <View
                      style={[
                        styles.iconBox,
                        { backgroundColor: item.accent + '26', borderColor: item.accent + '66' },
                      ]}
                    >
                      <Ionicons name={item.icon} size={22} color={item.accent} />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.title}>{item.title}</Text>
                      <Text style={styles.subtitle}>{item.subtitle}</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
                  </View>
                </GlassCard>
              </Pressable>
            </Animated.View>
          ))}
        </View>
      </ScrollView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingBottom: 120 },
  list: { paddingHorizontal: 20, gap: 12 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  title: { ...typography.bodyStrong, color: colors.textPrimary },
  subtitle: { ...typography.caption, color: colors.textSecondary, marginTop: 2 },
});
