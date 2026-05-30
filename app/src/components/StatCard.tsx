import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import GlassCard from './GlassCard';
import { GradientName, colors } from '@/theme/colors';
import { typography } from '@/theme/typography';

interface Props {
  label: string;
  value: string;
  icon: keyof typeof Ionicons.glyphMap;
  tint?: GradientName;
  accent?: string;
  delta?: string;
  style?: ViewStyle;
}

/**
 * Stat tile used on the dashboard. Glass surface + colored icon chip.
 */
export default function StatCard({
  label,
  value,
  icon,
  tint = 'glassPink',
  accent = colors.pink,
  delta,
  style,
}: Props) {
  return (
    <GlassCard tint={tint} padding={16} style={[styles.card, style]}>
      <View style={[styles.iconChip, { backgroundColor: accent + '33', borderColor: accent + '66' }]}>
        <Ionicons name={icon} size={18} color={accent} />
      </View>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label} numberOfLines={1}>{label}</Text>
      {delta && <Text style={[styles.delta, { color: accent }]}>{delta}</Text>}
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  card: { minHeight: 120, justifyContent: 'space-between' },
  iconChip: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    marginBottom: 10,
  },
  value: {
    ...typography.h2,
    color: colors.textPrimary,
  },
  label: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
  delta: {
    ...typography.caption,
    marginTop: 4,
  },
});
