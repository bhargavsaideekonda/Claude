import React from 'react';
import { Platform, StyleSheet, View, ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, gradients, GradientName } from '@/theme/colors';

interface Props {
  children: React.ReactNode;
  style?: ViewStyle;
  intensity?: number;
  tint?: GradientName | null;
  bordered?: boolean;
  padding?: number;
}

/**
 * Glassmorphism card — translucent blur with a subtle gradient sheen and
 * a light border. The signature surface used throughout the app.
 */
export default function GlassCard({
  children,
  style,
  intensity = 40,
  tint = 'glassPink',
  bordered = true,
  padding = 18,
}: Props) {
  const tintGradient = tint ? gradients[tint] : null;

  return (
    <View style={[styles.wrapper, bordered && styles.bordered, style]}>
      {Platform.OS === 'ios' ? (
        <BlurView
          intensity={intensity}
          tint="dark"
          style={StyleSheet.absoluteFillObject}
        />
      ) : (
        <View style={[StyleSheet.absoluteFillObject, styles.androidGlass]} />
      )}
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
  androidGlass: {
    backgroundColor: 'rgba(20,27,69,0.55)',
  },
});
