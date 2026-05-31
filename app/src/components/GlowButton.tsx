import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, gradients, GradientName } from '@/theme/colors';
import { typography } from '@/theme/typography';

interface Props {
  label: string;
  onPress?: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: GradientName;
  icon?: React.ReactNode;
  style?: ViewStyle;
  full?: boolean;
}

/**
 * Primary CTA — gradient fill with a soft outer glow.
 */
export default function GlowButton({
  label,
  onPress,
  loading,
  disabled,
  variant = 'cta',
  icon,
  style,
  full = true,
}: Props) {
  const handlePress = () => {
    if (disabled || loading) return;
    onPress?.();
  };

  return (
    <View style={[styles.glowWrap, full && styles.full, style]}>
      <View style={styles.glow} pointerEvents="none" />
      <Pressable
        onPress={handlePress}
        disabled={disabled || loading}
        style={({ pressed }) => [
          styles.pressable,
          full && styles.full,
          pressed && styles.pressed,
          disabled && styles.disabled,
        ]}
      >
        <LinearGradient
          colors={gradients[variant] as unknown as readonly [string, string, ...string[]]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.gradient, full && styles.full]}
        >
          {loading ? (
            <ActivityIndicator color={colors.white} />
          ) : (
            <View style={styles.row}>
              {icon}
              <Text style={styles.label}>{label}</Text>
            </View>
          )}
        </LinearGradient>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  glowWrap: { alignSelf: 'stretch' },
  full: { alignSelf: 'stretch' },
  glow: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.pink,
    opacity: 0.35,
    borderRadius: 22,
    transform: [{ scale: 1.04 }],
    shadowColor: colors.pink,
    shadowOpacity: 0.6,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 8 },
    elevation: 10,
  },
  pressable: { borderRadius: 22, overflow: 'hidden' },
  pressed: { transform: [{ scale: 0.98 }] },
  disabled: { opacity: 0.55 },
  gradient: {
    paddingVertical: 16,
    paddingHorizontal: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  label: {
    ...typography.button,
    color: colors.white,
  },
});
