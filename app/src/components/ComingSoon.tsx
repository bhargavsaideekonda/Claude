import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import GlassCard from './GlassCard';
import { GradientName, colors } from '@/theme/colors';
import { typography } from '@/theme/typography';

interface Props {
  icon?: keyof typeof Ionicons.glyphMap;
  tint?: GradientName;
  title?: string;
  description?: string;
}

/**
 * Placeholder card used by all not-yet-built modules. Keeps the fantasy theme
 * consistent while the real screens are under construction.
 */
export default function ComingSoon({
  icon = 'rocket',
  tint = 'glassOrange',
  title,
  description,
}: Props) {
  const { t } = useTranslation();
  return (
    <View style={styles.wrap}>
      <GlassCard tint={tint} padding={28} style={styles.card}>
        <View style={styles.iconWrap}>
          <Ionicons name={icon} size={40} color={colors.orange} />
        </View>
        <Text style={styles.title}>{title ?? t('common.comingSoon')}</Text>
        <Text style={styles.subtitle}>
          {description ?? t('common.comingSoonHint')}
        </Text>
      </GlassCard>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, paddingHorizontal: 20, justifyContent: 'center' },
  card: { alignItems: 'center' },
  iconWrap: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,140,41,0.18)',
    borderWidth: 1,
    borderColor: 'rgba(255,140,41,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    ...typography.h2,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 8,
  },
});
