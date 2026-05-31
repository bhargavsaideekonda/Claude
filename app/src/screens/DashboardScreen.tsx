import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

import GradientBackground from '@/components/GradientBackground';
import GlassCard from '@/components/GlassCard';
import StatCard from '@/components/StatCard';
import { colors, GradientName } from '@/theme/colors';
import { typography } from '@/theme/typography';
import { useAuthStore } from '@/store/authStore';

function getGreetingKey() {
  const h = new Date().getHours();
  if (h < 12) return 'dashboard.greetingMorning';
  if (h < 17) return 'dashboard.greetingAfternoon';
  return 'dashboard.greetingEvening';
}

interface QuickAction {
  key: string;
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  tint: GradientName;
  accent: string;
  target?: 'Members' | 'Collections' | 'Loans' | 'More';
}

export default function DashboardScreen() {
  const { t } = useTranslation();
  const user = useAuthStore((s) => s.user);
  const navigation = useNavigation<any>();

  const actions: QuickAction[] = [
    { key: 'enlist', icon: 'person-add', label: t('members.addMember'), tint: 'glassPink', accent: colors.pink, target: 'Members' },
    { key: 'collect', icon: 'cash', label: t('collections.newCollection'), tint: 'glassOrange', accent: colors.orange, target: 'Collections' },
    { key: 'loan', icon: 'briefcase', label: t('loans.newLoan'), tint: 'glassBlue', accent: colors.blue, target: 'Loans' },
    { key: 'report', icon: 'stats-chart', label: t('reports.title'), tint: 'glassPink', accent: colors.yellow, target: 'More' },
  ];

  return (
    <GradientBackground variant="aurora">
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Greeting */}
        <Animated.View entering={FadeInDown.duration(500)}>
          <Text style={styles.eyebrow}>{t('app.tagline').toUpperCase()}</Text>
          <Text style={styles.greeting}>
            {t(getGreetingKey())},{' '}
            <Text style={styles.name}>{user?.name?.split(' ')[0] ?? 'Soldier'}</Text>
          </Text>
          <View style={styles.rankRow}>
            <View style={styles.rankDot} />
            <Text style={styles.rank}>
              {user?.rank ?? t('dashboard.rankSoldier')} · {user?.branch ?? 'Palnadu'}
            </Text>
          </View>
        </Animated.View>

        {/* Stats grid */}
        <Animated.View entering={FadeInDown.delay(100).duration(500)} style={styles.statGrid}>
          <StatCard
            label={t('dashboard.stats.members')}
            value="1,284"
            icon="people"
            tint="glassPink"
            accent={colors.pink}
            delta="+12 this week"
            style={styles.stat}
          />
          <StatCard
            label={t('dashboard.stats.collectionToday')}
            value="₹48,650"
            icon="cash"
            tint="glassOrange"
            accent={colors.orange}
            delta="62% of target"
            style={styles.stat}
          />
          <StatCard
            label={t('dashboard.stats.pendingLoans')}
            value="7"
            icon="time"
            tint="glassBlue"
            accent={colors.blue}
            delta="2 awaiting approval"
            style={styles.stat}
          />
          <StatCard
            label={t('dashboard.stats.attendance')}
            value="On duty"
            icon="shield-checkmark"
            tint="glassPink"
            accent={colors.success}
            delta="In since 09:12"
            style={styles.stat}
          />
        </Animated.View>

        {/* Quick actions */}
        <Animated.View entering={FadeInDown.delay(200).duration(500)}>
          <Text style={styles.sectionTitle}>{t('dashboard.quickActions')}</Text>
          <View style={styles.actionGrid}>
            {actions.map((a) => (
              <Pressable
                key={a.key}
                onPress={() => a.target && navigation.navigate(a.target)}
                style={({ pressed }) => [styles.actionWrap, pressed && { opacity: 0.85 }]}
              >
                <GlassCard tint={a.tint} padding={16} style={styles.actionCard}>
                  <View
                    style={[
                      styles.actionIcon,
                      { backgroundColor: a.accent + '26', borderColor: a.accent + '66' },
                    ]}
                  >
                    <Ionicons name={a.icon} size={22} color={a.accent} />
                  </View>
                  <Text style={styles.actionLabel} numberOfLines={2}>
                    {a.label}
                  </Text>
                </GlassCard>
              </Pressable>
            ))}
          </View>
        </Animated.View>

        {/* Recent activity */}
        <Animated.View entering={FadeInDown.delay(300).duration(500)}>
          <Text style={styles.sectionTitle}>{t('dashboard.recentActivity')}</Text>
          <GlassCard tint="glassBlue" padding={4}>
            {[
              { icon: 'cash' as const, color: colors.orange, title: '₹2,500 collected', sub: 'Lakshmi Devi · 09:42' },
              { icon: 'person-add' as const, color: colors.pink, title: 'Member enlisted', sub: 'Ramesh Naidu · 10:15' },
              { icon: 'briefcase' as const, color: colors.blue, title: 'Loan approved', sub: '₹50,000 · Suresh Kumar · 11:03' },
            ].map((item, idx, arr) => (
              <View
                key={item.title}
                style={[
                  styles.activityRow,
                  idx !== arr.length - 1 && styles.activityDivider,
                ]}
              >
                <View
                  style={[
                    styles.activityIcon,
                    { backgroundColor: item.color + '26', borderColor: item.color + '55' },
                  ]}
                >
                  <Ionicons name={item.icon} size={16} color={item.color} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.activityTitle}>{item.title}</Text>
                  <Text style={styles.activitySub}>{item.sub}</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
              </View>
            ))}
          </GlassCard>
        </Animated.View>
      </ScrollView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: 20,
    paddingTop: 70,
    paddingBottom: 120,
    gap: 22,
  },
  eyebrow: { ...typography.overline, color: colors.orange },
  greeting: { ...typography.h1, color: colors.textPrimary, marginTop: 6 },
  name: { color: colors.orange },
  rankRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 6 },
  rankDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.success,
    shadowColor: colors.success,
    shadowOpacity: 0.9,
    shadowRadius: 6,
  },
  rank: { ...typography.bodyStrong, color: colors.textSecondary },

  statGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  stat: { width: '47.5%' },

  sectionTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: 12,
  },
  actionGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  actionWrap: { width: '47.5%' },
  actionCard: { minHeight: 120, justifyContent: 'space-between' },
  actionIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    marginBottom: 12,
  },
  actionLabel: {
    ...typography.bodyStrong,
    color: colors.textPrimary,
  },

  activityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  activityDivider: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.08)',
  },
  activityIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  activityTitle: { ...typography.bodyStrong, color: colors.textPrimary },
  activitySub: { ...typography.caption, color: colors.textSecondary, marginTop: 2 },
});
