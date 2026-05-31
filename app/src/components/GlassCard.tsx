import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, gradients, GradientName } from '@/theme/colors';

interface Props {
  children: React.ReactNode;
  style?: ViewStyle;
  /** Kept for API compatibility; currently unused. */
  intensity?: number;
  tint?: GradientName | null;
  bordered?: boolean;
  padding?: number;
}

/**
 * Glassmorphism card — translucent surface with a subtle gradient sheen and
 * a light border. Implemented without expo-blur so it runs cleanly on every
 * Node version and on the web.
 */
export default function GlassCard({
  children,
  style,
  tint = 'glassPink',
  bordered = true,
  padding = 18,
}: Props) {
  const tintGradient = tint ? gradients[tint] : null;

  return (
    <View style={[styles.wrapper, bordered && styles.bordered, style]}>
      <View style={[StyleSheet.absoluteFillObject, styles.glassFill]} />
      {tintGradient && (
        <LinearGradient
          colors={tintGradient as unknown as readonly [string, string, ...string[]]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFillObject}
        />
      )}
      <View style={{ padding }}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 22,
    overflow: 'hidden',
    backgroundColor: colors.glass,
  },
  bordered: {
    borderWidth: 1,
    borderColor: colors.glassBorder,
  },
  glassFill: {
    backgroundColor: 'rgba(20,27,69,0.55)',
  },
});
