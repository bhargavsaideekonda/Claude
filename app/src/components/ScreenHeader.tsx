import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';

interface Props {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
  style?: ViewStyle;
  compact?: boolean;
}

export default function ScreenHeader({ title, subtitle, right, style, compact }: Props) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[{ paddingTop: insets.top + (compact ? 8 : 16) }, styles.wrap, style]}>
      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <Text style={styles.eyebrow}>PALNADU MACS</Text>
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
        {right}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 12,
  },
  eyebrow: {
    ...typography.overline,
    color: colors.orange,
  },
  title: {
    ...typography.h1,
    color: colors.textPrimary,
    marginTop: 4,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: 4,
  },
});
