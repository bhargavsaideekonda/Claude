import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useTranslation } from 'react-i18next';

import GradientBackground from '@/components/GradientBackground';
import GlassCard from '@/components/GlassCard';
import GlowButton from '@/components/GlowButton';
import ScreenHeader from '@/components/ScreenHeader';
import SoldierBadge from '@/components/SoldierBadge';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';
import { useAuthStore } from '@/store/authStore';
import { useSettingsStore } from '@/store/settingsStore';
import { Language } from '@/i18n';

export default function ProfileScreen() {
  const { t } = useTranslation();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const language = useSettingsStore((s) => s.language);
  const setLanguage = useSettingsStore((s) => s.setLanguage);

  const langOptions: { code: Language; label: string }[] = [
    { code: 'en', label: t('profile.languageEnglish') },
    { code: 'te', label: t('profile.languageTelugu') },
  ];

  return (
    <GradientBackground variant="aurora">
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <ScreenHeader title={t('profile.title')} subtitle={t('profile.subtitle')} />

        <Animated.View entering={FadeInDown.duration(500)} style={styles.heroWrap}>
          <SoldierBadge size={120} animated={false} />
          <Text style={styles.name}>{user?.name ?? 'Soldier'}</Text>
          <View style={styles.rankPill}>
            <Ionicons name="ribbon" size={14} color={colors.orange} />
            <Text style={styles.rankText}>{user?.rank ?? t('dashboard.rankSoldier')}</Text>
          </View>
          <Text style={styles.meta}>+91 {user?.phone ?? ''} · {user?.branch ?? ''}</Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(120).duration(500)} style={styles.section}>
          <Text style={styles.sectionTitle}>{t('common.language')}</Text>
          <GlassCard tint="glassBlue" padding={6}>
            {langOptions.map((opt, idx) => {
              const active = language === opt.code;
              return (
                <Pressable
                  key={opt.code}
                  onPress={() => setLanguage(opt.code)}
                  style={({ pressed }) => [
                    styles.langRow,
                    idx !== langOptions.length - 1 && styles.langDivider,
                    pressed && { opacity: 0.8 },
                  ]}
                >
                  <Ionicons
                    name={active ? 'radio-button-on' : 'radio-button-off'}
                    size={20}
                    color={active ? colors.orange : colors.textMuted}
                  />
                  <Text style={[styles.langLabel, active && { color: colors.textPrimary }]}>
                    {opt.label}
                  </Text>
                  {active && (
                    <View style={styles.activeBadge}>
                      <Text style={styles.activeBadgeText}>ON DUTY</Text>
                    </View>
                  )}
                </Pressable>
              );
            })}
          </GlassCard>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(240).duration(500)} style={styles.section}>
          <GlowButton
            label={t('common.logout')}
            variant="ctaBlue"
            onPress={logout}
            icon={<Ionicons name="log-out-outline" size={18} color={colors.white} />}
          />
          <Text style={styles.version}>{t('profile.version')} 1.0.0 · v0 mission build</Text>
        </Animated.View>
      </ScrollView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingBottom: 140 },
  heroWrap: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 12,
  },
  name: {
    ...typography.h2,
    color: colors.textPrimary,
    marginTop: 14,
  },
  rankPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,140,41,0.18)',
    borderColor: 'rgba(255,140,41,0.45)',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    marginTop: 8,
  },
  rankText: { ...typography.caption, color: colors.orange },
  meta: { ...typography.caption, color: colors.textSecondary, marginTop: 8 },

  section: { paddingHorizontal: 20, marginTop: 22, gap: 10 },
  sectionTitle: { ...typography.h3, color: colors.textPrimary, marginBottom: 4 },

  langRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 14,
    paddingHorizontal: 14,
  },
  langDivider: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.08)',
  },
  langLabel: { flex: 1, ...typography.bodyStrong, color: colors.textSecondary },
  activeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    backgroundColor: 'rgba(46,204,113,0.15)',
    borderColor: 'rgba(46,204,113,0.45)',
    borderWidth: 1,
  },
  activeBadgeText: {
    ...typography.overline,
    color: colors.success,
    fontSize: 9,
  },

  version: { ...typography.caption, color: colors.textMuted, textAlign: 'center', marginTop: 4 },
});
